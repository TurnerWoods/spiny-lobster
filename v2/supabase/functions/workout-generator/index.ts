// supabase/functions/workout-generator/index.ts
// ==========================================
// AI Workout Generator - Claude Integration
// Uses Coach Rivera persona for exercise programming
// ==========================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface UserProfile {
  treatment: string
  experience: string
  equipment: string
  daysPerWeek: number
  goal: string
  limitations: string[]
}

interface WorkoutGeneratorRequest {
  profile: UserProfile
}

const COACH_RIVERA_SYSTEM_PROMPT = `You are Coach Rivera, a certified strength and conditioning specialist (CSCS) with 12 years of experience training men on hormone optimization protocols. You design evidence-based programs that maximize the benefits of medical treatments while minimizing injury risk.

## Your Philosophy:

1. **Treatment-Synergy**: Programs designed to complement and enhance treatment protocols
2. **Progressive Overload**: Systematic strength progression
3. **Recovery-Focused**: Understanding that growth happens during rest
4. **Sustainable**: Programs that fit busy professional lifestyles
5. **Age-Appropriate**: Modifications for men 35-55 who may have existing limitations

## Treatment-Specific Programming:

### TRT (Testosterone) Patients:
**Goal**: Maximize hypertrophy and strength gains from enhanced recovery
- Higher volume tolerance (4-5 training days)
- Compound lifts emphasized (squat, bench, deadlift, rows)
- Progressive overload aggressive but smart
- Adequate joint warm-up (TRT can cause joint stiffness initially)
- Focus on time under tension and mind-muscle connection

### GLP-1 Patients:
**Goal**: Preserve muscle mass during caloric deficit
- Resistance training 3-4x/week (non-negotiable for muscle preservation)
- Lower volume, higher intensity
- Full body or upper/lower split preferred
- LISS cardio (walking, incline treadmill) separate from weights
- Avoid excessive HIIT (can increase muscle loss during deficit)

### Peptide Patients:
**Goal**: Optimize recovery, support healing, maintain training
- Moderate volume
- Focus on movement quality over load
- Strategic training timing around peptide administration
- Emphasis on recovery protocols
- BPC-157/TB-500: Can train through minor injuries with proper form

### General Health:
**Goal**: Build sustainable fitness habits
- Balanced approach to strength, cardio, mobility
- 3-4 days per week ideal for adherence
- Full body or upper/lower split
- Include conditioning work

## Exercise Selection by Equipment:

### Full Gym:
- All barbell movements (squat, bench, deadlift, OHP)
- Cable work for isolation
- Machine work for safety and targeted hypertrophy

### Home Gym (Full):
- Barbell compounds
- Dumbbell accessories
- Pull-up variations

### Home Gym (Basic):
- Dumbbell-focused programming
- Pull-up variations
- Push-up progressions
- Single-leg work

### Bodyweight Only:
- Calisthenics progressions
- Isometric holds
- Plyometrics for advanced
- Mobility-focused

## RPE (Rate of Perceived Exertion) Scale:
- RPE 6-7: Could do 3-4 more reps (warm-up sets)
- RPE 8: Could do 2 more reps (working sets)
- RPE 9: Could do 1 more rep (hard sets)
- RPE 10: Maximum effort (rarely programmed)

You MUST respond with a valid JSON object in this exact format:
{
  "overview": "A personalized 2-3 sentence overview of the program",
  "programType": "Push/Pull/Legs Split",
  "weeklyStructure": "Description of how the week is organized",
  "workouts": [
    {
      "day": "Day 1 - Push",
      "focus": "Chest, Shoulders, Triceps",
      "warmup": ["5 min cardio", "Arm circles 20 each", "Band pull-aparts 15"],
      "exercises": [
        {
          "name": "Barbell Bench Press",
          "sets": 4,
          "reps": "6-8",
          "restSeconds": 180,
          "rpe": "8",
          "notes": "Control the descent, drive through feet",
          "youtubeSearch": "barbell bench press proper form"
        }
      ],
      "cooldown": ["Chest stretch 60s each", "Shoulder stretch 60s each"],
      "duration": "55-65 minutes"
    }
  ],
  "progressionScheme": [
    "Week 1-2: Focus on form, RPE 7-8",
    "Week 3-4: Add weight when hitting top of rep range"
  ],
  "recoveryProtocols": [
    "Sleep 7-9 hours per night",
    "Active recovery on rest days (walking, stretching)"
  ],
  "treatmentNotes": [
    "Treatment-specific note relevant to their protocol"
  ]
}`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')

    if (!anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY is not configured')
    }

    const body: WorkoutGeneratorRequest = await req.json()
    const { profile } = body

    if (!profile.treatment || !profile.experience || !profile.equipment || !profile.goal) {
      throw new Error('Missing required profile information')
    }

    const treatmentLabels: Record<string, string> = {
      trt: 'Testosterone Replacement Therapy (TRT)',
      glp1: 'GLP-1 Medication (Semaglutide/Tirzepatide)',
      peptides: 'Peptide Therapy (BPC-157, TB-500, etc.)',
      general: 'General Health (no current treatment)'
    }

    const experienceLabels: Record<string, string> = {
      beginner: 'Beginner (0-1 year training)',
      intermediate: 'Intermediate (1-3 years training)',
      advanced: 'Advanced (3+ years training)'
    }

    const equipmentLabels: Record<string, string> = {
      full_gym: 'Full Commercial Gym',
      home_full: 'Home Gym with Rack, Barbell, Dumbbells',
      home_basic: 'Basic Home Gym (Dumbbells, Bench, Pull-up Bar)',
      bodyweight: 'Bodyweight Only'
    }

    const goalLabels: Record<string, string> = {
      strength: 'Build Strength (increase 1RM)',
      hypertrophy: 'Build Muscle (maximize hypertrophy)',
      fat_loss: 'Fat Loss (preserve muscle)',
      athletic: 'Athletic Performance'
    }

    const userPrompt = `Create a personalized ${profile.daysPerWeek}-day workout program for a male patient with the following profile:

**Treatment:** ${treatmentLabels[profile.treatment] || profile.treatment}
**Experience Level:** ${experienceLabels[profile.experience] || profile.experience}
**Available Equipment:** ${equipmentLabels[profile.equipment] || profile.equipment}
**Training Days/Week:** ${profile.daysPerWeek}
**Primary Goal:** ${goalLabels[profile.goal] || profile.goal}
**Limitations/Injuries:** ${profile.limitations.length > 0 ? profile.limitations.join(', ') : 'None'}

Please create a comprehensive program that:
1. Is optimized for their specific treatment protocol
2. Matches their experience level with appropriate exercise selection
3. Uses only equipment they have access to
4. Supports their primary fitness goal
5. Works around any limitations with appropriate exercise substitutions
6. Includes ${profile.daysPerWeek} full workout days with warmup, exercises, and cooldown

For each exercise, include:
- Name, sets, reps (or rep range), rest period
- RPE target
- Form cues or notes
- YouTube search term for demonstration video

Respond with ONLY a valid JSON object in the specified format, no other text.`

    console.log('Calling Claude API for workout program generation...')

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8192,
        temperature: 0.7,
        system: COACH_RIVERA_SYSTEM_PROMPT,
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
    const textContent = claudeResponse.content?.find((c: any) => c.type === 'text')?.text

    if (!textContent) {
      throw new Error('No text content in AI response')
    }

    // Parse JSON from Claude's response
    let jsonText = textContent
    const jsonMatch = textContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (jsonMatch) {
      jsonText = jsonMatch[1]
    }

    let program
    try {
      program = JSON.parse(jsonText.trim())
    } catch (parseError) {
      console.error('Failed to parse Claude response as JSON:', jsonText)
      program = createFallbackProgram(profile)
    }

    console.log('Workout program generated successfully')

    return new Response(
      JSON.stringify(program),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Error in workout-generator:', error)
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

function createFallbackProgram(profile: UserProfile) {
  return {
    overview: `This is a ${profile.daysPerWeek}-day ${profile.goal} program designed for ${profile.treatment} patients. Please consult with your healthcare provider before starting.`,
    programType: profile.daysPerWeek >= 4 ? 'Upper/Lower Split' : 'Full Body',
    weeklyStructure: `Train ${profile.daysPerWeek} days per week with rest days between sessions`,
    workouts: [
      {
        day: 'Day 1 - Full Body',
        focus: 'Compound Movements',
        warmup: ['5 minutes light cardio', 'Dynamic stretching'],
        exercises: [
          {
            name: 'Goblet Squat',
            sets: 3,
            reps: '10-12',
            restSeconds: 90,
            rpe: '7-8',
            notes: 'Keep chest up, knees tracking over toes',
            youtubeSearch: 'goblet squat form'
          },
          {
            name: 'Push-ups',
            sets: 3,
            reps: '8-12',
            restSeconds: 60,
            rpe: '7-8',
            notes: 'Full range of motion',
            youtubeSearch: 'proper push up form'
          },
          {
            name: 'Dumbbell Rows',
            sets: 3,
            reps: '10-12 each',
            restSeconds: 60,
            rpe: '7-8',
            notes: 'Squeeze shoulder blade at top',
            youtubeSearch: 'dumbbell row form'
          }
        ],
        cooldown: ['Static stretching 5-10 minutes'],
        duration: '45-50 minutes'
      }
    ],
    progressionScheme: [
      'Add weight when you can complete all sets at the top of the rep range',
      'Aim to increase total volume week over week'
    ],
    recoveryProtocols: [
      'Get 7-9 hours of sleep per night',
      'Stay hydrated - aim for 100oz water daily',
      'Active recovery on rest days (walking, light stretching)'
    ],
    treatmentNotes: [
      'Always consult with your physician before starting a new exercise program',
      'Monitor how you feel and adjust intensity as needed'
    ]
  }
}
