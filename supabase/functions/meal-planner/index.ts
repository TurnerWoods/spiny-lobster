// supabase/functions/meal-planner/index.ts
// ==========================================
// AI Meal Planner - Claude Integration
// Uses Chef Marcus persona for nutrition planning
// ==========================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface UserProfile {
  treatment: string
  activityLevel: string
  goal: string
  dietaryRestrictions: string[]
  mealsPerDay: number
}

interface MealPlannerRequest {
  profile: UserProfile
}

const CHEF_MARCUS_SYSTEM_PROMPT = `You are Chef Marcus, a certified sports nutritionist and culinary expert who specializes in creating meal plans for men on hormone optimization and weight management protocols. You combine nutritional science with practical, delicious recipes that busy Texas professionals can actually follow.

## Your Expertise:

1. **Treatment-Specific Nutrition**:
   - TRT patients: Higher protein (1g/lb lean mass), strategic carb timing around workouts, moderate healthy fats
   - GLP-1 patients: Lower calorie density, high satiety foods, protein-first approach, smaller portions
   - Peptide patients: Recovery-focused nutrition, timing around doses, anti-inflammatory foods
   - General health: Balanced macros, whole foods focus, sustainable eating patterns

2. **Texas Focus**:
   - Know popular Texas restaurant chains (Whataburger, Torchy's, Rudy's BBQ, Pappadeaux, etc.)
   - Familiar with H-E-B grocery store layouts and products
   - Understand Texas food culture while steering toward healthier options

3. **Practical Approach**:
   - Recipes under 30 minutes prep time
   - Meal prep strategies for busy professionals
   - Budget-conscious options
   - Family-friendly alternatives

## Activity Level Multipliers:
- Sedentary: TDEE = BMR × 1.2
- Lightly Active: TDEE = BMR × 1.375
- Moderately Active: TDEE = BMR × 1.55
- Very Active: TDEE = BMR × 1.725

## Goal Adjustments:
- Fat Loss: TDEE - 500 calories (20-25% deficit)
- Muscle Gain: TDEE + 300-500 calories
- Maintenance: TDEE
- Recomposition: Slight deficit (-200 calories), high protein

## Treatment-Specific Guidelines:

### TRT (Testosterone) Patients:
- Emphasis on lean proteins and healthy fats
- Strategic carbs around training (pre/post workout)
- Foods that support hormone production (zinc, vitamin D, magnesium)
- Avoid excessive alcohol and processed foods
- Protein: 1g per lb body weight (estimate 180lbs = 180g)
- Calories: Usually maintenance to slight surplus

### GLP-1 (Semaglutide/Tirzepatide) Patients:
- Protein first at every meal (prevents muscle loss)
- Smaller, more frequent meals
- High-fiber, water-rich vegetables
- Avoid greasy/fried foods (can cause GI distress)
- Stay hydrated (at least 80oz water daily)
- Protein: 1g per lb body weight minimum
- Calories: Naturally reduced due to appetite suppression

### Peptide Patients:
- Anti-inflammatory foods (omega-3s, leafy greens)
- Collagen-supporting nutrients (vitamin C, glycine)
- Timing meals around peptide administration
- Recovery-focused post-workout nutrition
- Moderate protein, balanced macros

You MUST respond with a valid JSON object in this exact format:
{
  "overview": "A personalized 2-3 sentence overview of the plan based on their treatment and goals",
  "dailyTargets": {
    "calories": 2200,
    "protein": 180,
    "carbs": 200,
    "fat": 75
  },
  "weeklyPlan": [
    {
      "day": "Monday",
      "breakfast": {
        "name": "Meal name",
        "description": "Brief description",
        "macros": { "calories": 450, "protein": 35, "carbs": 40, "fat": 15 }
      },
      "lunch": { "name": "", "description": "", "macros": {} },
      "dinner": { "name": "", "description": "", "macros": {} },
      "snacks": ["Snack 1", "Snack 2"]
    }
  ],
  "recipes": [
    {
      "name": "Recipe Name",
      "servings": 4,
      "prepTime": "15 min",
      "cookTime": "20 min",
      "ingredients": ["ingredient 1", "ingredient 2"],
      "instructions": ["Step 1", "Step 2"],
      "macrosPerServing": { "calories": 450, "protein": 35, "carbs": 40, "fat": 15 }
    }
  ],
  "restaurantGuide": [
    {
      "restaurant": "Whataburger",
      "order": "Grilled Chicken Sandwich, no bun, side salad",
      "modifications": "Ask for extra lettuce wrap",
      "macros": "~350 cal, 35g protein"
    }
  ],
  "shoppingList": [
    {
      "category": "Produce",
      "items": ["Spinach (2 bags)", "Avocados (4)"]
    },
    {
      "category": "Meat/Seafood",
      "items": ["Chicken breast (3 lbs)", "Salmon fillets (1 lb)"]
    }
  ],
  "tips": [
    "Tip for success based on their treatment",
    "Meal prep strategy"
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

    const body: MealPlannerRequest = await req.json()
    const { profile } = body

    if (!profile.treatment || !profile.activityLevel || !profile.goal) {
      throw new Error('Missing required profile information')
    }

    const treatmentLabels: Record<string, string> = {
      trt: 'Testosterone Replacement Therapy (TRT)',
      glp1: 'GLP-1 Medication (Semaglutide/Tirzepatide)',
      peptides: 'Peptide Therapy',
      general: 'General Health Optimization'
    }

    const activityLabels: Record<string, string> = {
      sedentary: 'Sedentary (desk job, little exercise)',
      light: 'Lightly Active (1-3 workouts/week)',
      moderate: 'Moderately Active (3-5 workouts/week)',
      very_active: 'Very Active (6-7 workouts/week)'
    }

    const goalLabels: Record<string, string> = {
      fat_loss: 'Fat Loss',
      muscle_gain: 'Muscle Gain',
      maintenance: 'Weight Maintenance',
      recomposition: 'Body Recomposition'
    }

    const userPrompt = `Create a personalized 7-day meal plan for a male patient with the following profile:

**Treatment:** ${treatmentLabels[profile.treatment] || profile.treatment}
**Activity Level:** ${activityLabels[profile.activityLevel] || profile.activityLevel}
**Goal:** ${goalLabels[profile.goal] || profile.goal}
**Dietary Restrictions:** ${profile.dietaryRestrictions.length > 0 ? profile.dietaryRestrictions.join(', ') : 'None'}

Please create a comprehensive meal plan that:
1. Is optimized for their specific treatment protocol
2. Supports their fitness goal
3. Respects any dietary restrictions
4. Includes practical, delicious recipes (under 30 min prep)
5. Provides Texas restaurant alternatives for eating out
6. Includes an H-E-B shopping list organized by section

Respond with ONLY a valid JSON object in the specified format, no other text.`

    console.log('Calling Claude API for meal plan generation...')

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
        system: CHEF_MARCUS_SYSTEM_PROMPT,
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

    let mealPlan
    try {
      mealPlan = JSON.parse(jsonText.trim())
    } catch (parseError) {
      console.error('Failed to parse Claude response as JSON:', jsonText)
      // Return a fallback response
      mealPlan = createFallbackMealPlan(profile)
    }

    console.log('Meal plan generated successfully')

    return new Response(
      JSON.stringify(mealPlan),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Error in meal-planner:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})

function createFallbackMealPlan(profile: UserProfile) {
  const baseCals = profile.goal === 'fat_loss' ? 1800 : profile.goal === 'muscle_gain' ? 2500 : 2200

  return {
    overview: `This is a balanced meal plan designed for your ${profile.treatment} protocol and ${profile.goal} goal. Please consult with your healthcare provider for personalized recommendations.`,
    dailyTargets: {
      calories: baseCals,
      protein: 180,
      carbs: Math.round(baseCals * 0.35 / 4),
      fat: Math.round(baseCals * 0.30 / 9)
    },
    weeklyPlan: [
      {
        day: "Monday",
        breakfast: { name: "Greek Yogurt Bowl", description: "Greek yogurt with berries and nuts", macros: { calories: 400, protein: 30, carbs: 35, fat: 15 } },
        lunch: { name: "Grilled Chicken Salad", description: "Mixed greens with grilled chicken", macros: { calories: 450, protein: 40, carbs: 20, fat: 22 } },
        dinner: { name: "Salmon with Vegetables", description: "Baked salmon with roasted broccoli", macros: { calories: 550, protein: 45, carbs: 25, fat: 28 } },
        snacks: ["Protein shake", "Handful of almonds"]
      }
    ],
    recipes: [],
    restaurantGuide: [
      { restaurant: "Chipotle", order: "Burrito Bowl with double chicken, fajita veggies, no rice", modifications: "Ask for light cheese", macros: "~550 cal, 55g protein" }
    ],
    shoppingList: [
      { category: "Produce", items: ["Spinach", "Broccoli", "Berries"] },
      { category: "Protein", items: ["Chicken breast", "Salmon", "Greek yogurt"] }
    ],
    tips: [
      "Meal prep proteins on Sunday for the week",
      "Stay hydrated with at least 64oz of water daily"
    ]
  }
}
