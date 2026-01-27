// supabase/functions/healthie-sync/index.ts
// ==========================================
// Syncs tool submissions to Healthie as patients
// Triggered when email is captured from any tool
// ==========================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PatientSyncRequest {
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  tool_type: 'hormone_assessment' | 'treatment_match' | 'lab_interpreter' | 'calculator'
  tool_results: Record<string, any>
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get secrets from Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const healthieApiKey = Deno.env.get('HEALTHIE_API_KEY')!
    const healthieApiUrl = Deno.env.get('HEALTHIE_API_URL') || 'https://staging-api.gethealthie.com/graphql'

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const body: PatientSyncRequest = await req.json()
    const { email, first_name, last_name, phone, tool_type, tool_results } = body

    console.log(`Processing patient sync for: ${email}`)

    // Step 1: Check if patient already exists in Supabase
    const { data: existingPatient, error: lookupError } = await supabase
      .from('patients')
      .select('*')
      .eq('email', email)
      .single()

    let patientId: string
    let healthiePatientId: string | null = null

    if (existingPatient) {
      // Patient exists - update their record
      patientId = existingPatient.id
      healthiePatientId = existingPatient.healthie_patient_id
      console.log(`Found existing patient: ${patientId}`)
    } else {
      // Create new patient in Supabase
      const { data: newPatient, error: createError } = await supabase
        .from('patients')
        .insert({
          email,
          first_name: first_name || email.split('@')[0],
          last_name: last_name || '',
          phone,
          source: tool_type,
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      if (createError) {
        throw new Error(`Failed to create patient: ${createError.message}`)
      }

      patientId = newPatient.id
      console.log(`Created new patient: ${patientId}`)
    }

    // Step 2: Sync to Healthie if not already synced
    if (!healthiePatientId) {
      try {
        const healthieResponse = await fetch(healthieApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${healthieApiKey}`,
            'AuthorizationSource': 'API'
          },
          body: JSON.stringify({
            query: `
              mutation createClient($input: createClientInput!) {
                createClient(input: $input) {
                  user {
                    id
                    email
                  }
                  messages {
                    field
                    message
                  }
                }
              }
            `,
            variables: {
              input: {
                first_name: first_name || email.split('@')[0],
                last_name: last_name || 'Unknown',
                email,
                phone_number: phone,
                timezone: 'America/Chicago'
              }
            }
          })
        })

        const healthieData = await healthieResponse.json()

        if (healthieData.data?.createClient?.user?.id) {
          healthiePatientId = healthieData.data.createClient.user.id
          
          // Update Supabase with Healthie ID
          await supabase
            .from('patients')
            .update({ healthie_patient_id: healthiePatientId })
            .eq('id', patientId)

          console.log(`Synced to Healthie: ${healthiePatientId}`)
        } else if (healthieData.errors || healthieData.data?.createClient?.messages?.length > 0) {
          // Patient might already exist in Healthie - try to find them
          const lookupResponse = await fetch(healthieApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${healthieApiKey}`,
              'AuthorizationSource': 'API'
            },
            body: JSON.stringify({
              query: `
                query getUsers($email: String) {
                  users(email: $email, offset: 0) {
                    id
                    email
                  }
                }
              `,
              variables: { email }
            })
          })

          const lookupData = await lookupResponse.json()
          if (lookupData.data?.users?.[0]?.id) {
            healthiePatientId = lookupData.data.users[0].id
            
            await supabase
              .from('patients')
              .update({ healthie_patient_id: healthiePatientId })
              .eq('id', patientId)

            console.log(`Found existing Healthie patient: ${healthiePatientId}`)
          }
        }
      } catch (healthieError) {
        console.error('Healthie sync error:', healthieError)
        // Continue - we'll try again later
      }
    }

    // Step 3: Store tool results
    const { error: resultsError } = await supabase
      .from('tool_results')
      .insert({
        patient_id: patientId,
        tool_type,
        results: tool_results,
        synced_to_healthie: !!healthiePatientId,
        created_at: new Date().toISOString()
      })

    if (resultsError) {
      console.error('Failed to store tool results:', resultsError)
    }

    // Step 4: If we have Healthie ID, add a chart note with tool results
    if (healthiePatientId) {
      try {
        const noteContent = formatToolResultsForNote(tool_type, tool_results)
        
        await fetch(healthieApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${healthieApiKey}`,
            'AuthorizationSource': 'API'
          },
          body: JSON.stringify({
            query: `
              mutation createNote($input: createNoteInput!) {
                createNote(input: $input) {
                  note { id }
                }
              }
            `,
            variables: {
              input: {
                user_id: healthiePatientId,
                content: noteContent,
                note_type: 'general'
              }
            }
          })
        })

        console.log('Added chart note to Healthie')

        // Mark as synced
        await supabase
          .from('tool_results')
          .update({ synced_to_healthie: true })
          .eq('patient_id', patientId)
          .eq('tool_type', tool_type)
          .order('created_at', { ascending: false })
          .limit(1)

      } catch (noteError) {
        console.error('Failed to add chart note:', noteError)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        patient_id: patientId,
        healthie_patient_id: healthiePatientId,
        synced: !!healthiePatientId
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in healthie-sync:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

function formatToolResultsForNote(toolType: string, results: Record<string, any>): string {
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })
  
  let note = `=== ELEVARE HEALTH TOOL SUBMISSION ===\n`
  note += `Tool: ${toolType.replace(/_/g, ' ').toUpperCase()}\n`
  note += `Date: ${timestamp}\n`
  note += `\n--- Results ---\n`

  switch (toolType) {
    case 'hormone_assessment':
      note += `Risk Level: ${results.riskLevel?.toUpperCase() || 'N/A'}\n`
      note += `Overall Score: ${results.percentage || 'N/A'}%\n`
      note += `\nCategory Scores:\n`
      if (results.categoryScores) {
        Object.entries(results.categoryScores).forEach(([cat, score]) => {
          note += `  - ${cat}: ${score}\n`
        })
      }
      note += `\nRecommendation: ${results.recommendation || 'N/A'}\n`
      break

    case 'treatment_match':
      note += `Primary Goal: ${results.primary_goal || 'N/A'}\n`
      note += `Age Range: ${results.age_range || 'N/A'}\n`
      note += `Activity Level: ${results.activity_level || 'N/A'}\n`
      note += `Budget: ${results.budget || 'N/A'}\n`
      note += `\nRecommended Treatments:\n`
      if (results.recommendations) {
        results.recommendations.forEach((rec: any, i: number) => {
          note += `  ${i + 1}. ${rec.name} (${rec.matchScore}% match)\n`
        })
      }
      break

    default:
      note += JSON.stringify(results, null, 2)
  }

  note += `\n=== END SUBMISSION ===`
  return note
}
