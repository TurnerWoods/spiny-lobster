// supabase/functions/lab-interpreter/index.ts
// ==========================================
// Lab Results Interpreter - Claude AI Integration
// Uses Dr. Chen persona to analyze lab values
// ==========================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LabValue {
  name: string
  value: number
  unit: string
  referenceRange?: { min: number; max: number }
  optimalRange?: { min: number; max: number }
}

interface LabInterpreterRequest {
  labValues: LabValue[]
}

const DR_CHEN_SYSTEM_PROMPT = `You are Dr. Chen, a board-certified physician specializing in men's hormone health and metabolic optimization. You have over 15 years of experience interpreting lab results and helping men understand their health markers.

Your role is to explain lab results in clear, accessible language while maintaining clinical accuracy. You help patients understand what their numbers mean and empower them to have informed conversations with their healthcare providers.

## Your Approach:

1. **Educational Focus**: Explain what each marker measures and why it matters for men's health
2. **Optimal vs Reference Ranges**: Highlight the difference between "normal" reference ranges and optimal ranges for peak performance
3. **Pattern Recognition**: Identify connections between multiple markers that tell a bigger story
4. **Actionable Insights**: Suggest specific questions patients should ask their doctor
5. **Safety First**: Never diagnose conditions or prescribe treatments - always recommend professional consultation

## Important Guidelines:
- Use simple language, avoiding medical jargon when possible
- When using medical terms, always provide a plain-English explanation
- Be encouraging but honest about concerning values
- Always emphasize that lab interpretation should be done in context with symptoms and medical history
- Remind patients that these insights are educational and not a substitute for professional medical advice

You MUST respond with a valid JSON object in this exact format:
{
  "summary": "A 2-3 sentence overview of the overall picture these labs paint",
  "markers": [
    {
      "marker": "Marker Name",
      "value": 123,
      "unit": "ng/dL",
      "status": "low|optimal|high|reference",
      "interpretation": "Patient-friendly interpretation of this value",
      "optimizationTips": ["Tip 1", "Tip 2"]
    }
  ],
  "patterns": ["Pattern 1 identified across markers", "Pattern 2"],
  "questionsForDoctor": ["Question 1 to ask physician", "Question 2"],
  "nextSteps": ["Recommended next step 1", "Recommended next step 2"]
}

Status should be:
- "low" if below optimal range (concerning)
- "optimal" if within optimal range (ideal)
- "high" if above optimal range (concerning)
- "reference" if within reference range but not optimal (acceptable but could be better)`

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')

    if (!anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY is not configured')
    }

    const body: LabInterpreterRequest = await req.json()
    const { labValues } = body

    if (!labValues || labValues.length < 2) {
      throw new Error('At least 2 lab values are required for analysis')
    }

    // Format lab values for the prompt
    const formattedLabValues = labValues.map(lv => {
      let rangeInfo = ''
      if (lv.referenceRange) {
        rangeInfo += `Reference Range: ${lv.referenceRange.min}-${lv.referenceRange.max} ${lv.unit}`
      }
      if (lv.optimalRange) {
        rangeInfo += ` | Optimal Range: ${lv.optimalRange.min}-${lv.optimalRange.max} ${lv.unit}`
      }
      return `- ${lv.name}: ${lv.value} ${lv.unit} (${rangeInfo})`
    }).join('\n')

    const userPrompt = `Please analyze the following lab results for a male patient:

${formattedLabValues}

Provide a comprehensive analysis including:
1. A summary of the overall health picture
2. Individual marker interpretations with optimization tips
3. Any patterns you identify across markers
4. Specific questions the patient should ask their doctor
5. Recommended next steps

Remember to respond with ONLY a valid JSON object in the specified format, no other text.`

    console.log('Calling Claude API for lab interpretation...')

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        temperature: 0.7,
        system: DR_CHEN_SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Claude API error:', response.status, errorText)
      throw new Error(`AI service error: ${response.status}`)
    }

    const claudeResponse = await response.json()

    // Extract the text content from Claude's response
    const textContent = claudeResponse.content?.find((c: any) => c.type === 'text')?.text

    if (!textContent) {
      throw new Error('No text content in AI response')
    }

    // Parse the JSON from Claude's response
    // Claude might include markdown code blocks, so we need to extract the JSON
    let jsonText = textContent

    // Remove markdown code blocks if present
    const jsonMatch = textContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (jsonMatch) {
      jsonText = jsonMatch[1]
    }

    // Try to parse as JSON
    let analysis
    try {
      analysis = JSON.parse(jsonText.trim())
    } catch (parseError) {
      console.error('Failed to parse Claude response as JSON:', jsonText)
      // Create a fallback response
      analysis = {
        summary: "I've reviewed your lab results. Please see the individual marker analysis below for details.",
        markers: labValues.map(lv => ({
          marker: lv.name,
          value: lv.value,
          unit: lv.unit,
          status: getBasicStatus(lv),
          interpretation: `Your ${lv.name} is ${lv.value} ${lv.unit}. Please discuss this value with your healthcare provider.`,
          optimizationTips: ['Consult with your physician for personalized advice']
        })),
        patterns: ['Unable to perform detailed pattern analysis. Please consult with a healthcare provider.'],
        questionsForDoctor: [
          'What do my lab results indicate about my overall health?',
          'Are any of my values concerning?',
          'What lifestyle changes would you recommend based on these results?'
        ],
        nextSteps: [
          'Schedule a follow-up with your physician to discuss these results',
          'Consider lifestyle factors that may affect your lab values'
        ]
      }
    }

    console.log('Lab analysis completed successfully')

    return new Response(
      JSON.stringify(analysis),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Error in lab-interpreter:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})

function getBasicStatus(lv: LabValue): 'low' | 'optimal' | 'high' | 'reference' {
  if (!lv.optimalRange && !lv.referenceRange) return 'reference'

  const range = lv.optimalRange || lv.referenceRange!

  if (lv.value < range.min) return 'low'
  if (lv.value > range.max) return 'high'

  if (lv.optimalRange && lv.referenceRange) {
    // Within optimal
    if (lv.value >= lv.optimalRange.min && lv.value <= lv.optimalRange.max) {
      return 'optimal'
    }
    // Within reference but not optimal
    return 'reference'
  }

  return 'optimal'
}
