# Elevare Health - SOW Implementation Plan

**Created:** January 29, 2026
**Branch:** `claude/plan-ui-ux-improvements-iG12x`
**Reference:** Statement of Work v1.0

---

## Current Implementation Status

### ✅ COMPLETE

| Feature | Status | Notes |
|---------|--------|-------|
| Tools Landing Page | ✅ Done | `/tools` route working |
| Hormone Health Assessment | ✅ Done | AI-powered, email capture, Healthie sync |
| Treatment Match Quiz | ✅ Done | AI-powered, email capture, Healthie sync |
| 6 Basic Calculators | ✅ Done | TDEE, BMI, BMR, Protein, Calorie, Carb |
| All Routes | ✅ Done | Configured in App.tsx |
| Email Capture → Supabase | ✅ Done | Via Edge Function |
| Healthie Patient Sync | ✅ Done | GraphQL client complete |
| Database Schema | ✅ Done | All tables created in migration |
| Navigation Link | ✅ Done | Tools in header |

### ❌ NOT YET IMPLEMENTED

| Feature | Priority | Phase | Effort |
|---------|----------|-------|--------|
| Lab Results Interpreter UI | P0 | 2 | 4-6 hrs |
| AI Meal Planner UI | P1 | 4 | 4-6 hrs |
| AI Workout Generator UI | P1 | 4 | 4-6 hrs |
| System Prompts Documentation | P0 | 1 | 2-3 hrs |
| Supabase Types Regeneration | P0 | 1 | 30 min |
| Healthie Appointment Widget | P1 | 2 | 3-4 hrs |
| DocuSign Integration | P2 | 2 | 4-6 hrs |
| Stripe Payment Integration | P2 | 2 | 6-8 hrs |
| Labcorp API Integration | P2 | 3 | 8-10 hrs |
| Progress Tracking Dashboard | P3 | 4 | 6-8 hrs |

---

## Phase 2: Clinical Workflow (NEXT PRIORITY)

### Task 2.1: Lab Results Interpreter UI (P0)

**Route:** `/tools/lab-interpreter`

**Features:**
- Input form for common lab values (Total T, Free T, SHBG, E2, PSA, CBC, CMP)
- Option to upload lab PDF (parse values)
- Claude AI analysis with "Dr. Chen" persona
- Marker-by-marker breakdown with reference ranges
- Pattern identification (inflammation, hormone imbalance, etc.)
- Questions to ask your physician
- Email capture before showing full results

**UI Components:**
```
LabInterpreter/
├── LabValueForm.tsx       # Input form for manual entry
├── LabUploader.tsx        # PDF upload with parsing
├── LabResultsDisplay.tsx  # AI-generated analysis display
├── MarkerCard.tsx         # Individual marker breakdown
└── index.tsx              # Main page component
```

**System Prompt (Dr. Chen Persona):**
```
You are Dr. Chen, a board-certified physician specializing in men's
hormone health. You explain lab results in clear, accessible language
while maintaining clinical accuracy. You:

- Explain what each marker measures and why it matters
- Identify patterns across multiple markers
- Highlight values outside optimal ranges (not just reference ranges)
- Suggest follow-up questions for the patient's physician
- Never diagnose or prescribe - always recommend consultation

Format responses with:
1. Summary: 2-3 sentence overview
2. Marker Analysis: Each value explained
3. Patterns Identified: Cross-marker insights
4. Action Items: Questions for their doctor
```

---

### Task 2.2: Healthie Appointment Scheduling Widget (P1)

**Integration Points:**
- Embed Healthie's scheduling widget on booking pages
- Pre-fill patient info from tool completion
- Sync appointment to patient record

**Files to Create:**
```
src/components/scheduling/
├── AppointmentWidget.tsx      # Healthie embed wrapper
├── AppointmentConfirm.tsx     # Confirmation display
└── useAppointmentSync.ts      # Hook for syncing
```

---

### Task 2.3: DocuSign E-Signature Integration (P2)

**Documents:**
1. Telehealth Consent Form
2. HIPAA Authorization
3. Treatment Agreement
4. Controlled Substance Agreement (if applicable)

**Flow:**
1. Patient books appointment → Triggers DocuSign envelope
2. Email sent with signing link
3. Webhook receives completion status
4. Document stored in Healthie + Supabase

**Files to Create:**
```
src/integrations/docusign/
├── DocuSignClient.ts          # API wrapper
├── templates/                 # Document templates
└── envelopeManager.ts         # Envelope creation/tracking

supabase/functions/
└── docusign-webhook/index.ts  # Webhook handler
```

---

### Task 2.4: Stripe Payment Integration (P2)

**Pricing Model:** "Same Price at Every Dose"

**Features:**
- One-time consultation fees
- Monthly subscription plans
- HSA/FSA card acceptance
- Affirm BNPL integration

**Files to Create:**
```
src/integrations/stripe/
├── StripeClient.ts            # API wrapper
├── PricingTable.tsx           # Pricing display
├── CheckoutSession.ts         # Session creation
└── SubscriptionManager.ts     # Subscription logic

supabase/functions/
└── stripe-webhook/index.ts    # Webhook handler
```

---

## Phase 3: Lab Integration (Weeks 5-6)

### Task 3.1: Labcorp API Integration

**Features:**
- ZIP code availability lookup
- At-home phlebotomy scheduling
- Order status tracking
- Results auto-import to Healthie

**Files to Create:**
```
src/integrations/labcorp/
├── LabcorpClient.ts           # API wrapper
├── AvailabilityWidget.tsx     # ZIP code scheduler
├── OrderTracker.tsx           # Order status UI
└── ResultsImporter.ts         # Results → Healthie sync

supabase/functions/
└── labcorp-results/index.ts   # Results webhook
```

---

## Phase 4: Planning Tools (Weeks 7-8)

### Task 4.1: AI Meal Planner UI

**Route:** `/tools/meal-planner`

**Features:**
- Treatment-specific macro calculations
- Weekly meal plan generation
- Texas restaurant recommendations (treatment-compatible)
- H-E-B shopping list generation
- Recipe database with prep instructions

**System Prompt (Chef Marcus Persona):**
```
You are Chef Marcus, a nutrition specialist who works with men's
health patients. You create practical, delicious meal plans that
support treatment protocols. You understand:

- TRT patients need: Higher protein (1g/lb), moderate fats, strategic carbs
- GLP-1 patients need: Lower calorie density, high satiety foods
- Peptide patients need: Recovery-focused nutrition, timing around doses

Always provide:
1. Weekly overview with daily macros
2. Simple recipes (< 30 min prep)
3. Restaurant alternatives (Texas chains)
4. Shopping list organized by store section
```

---

### Task 4.2: AI Workout Generator UI

**Route:** `/tools/workout-generator`

**Features:**
- Treatment-optimized programming
- TRT: Strength/hypertrophy focus
- GLP-1: Muscle preservation + cardio
- Peptides: Recovery optimization
- Home vs gym options
- Progressive overload tracking

**System Prompt (Coach Rivera Persona):**
```
You are Coach Rivera, a strength and conditioning specialist who
designs programs for men on hormone optimization protocols. You create
evidence-based programs that maximize treatment benefits:

- TRT patients: Compound lifts, progressive overload, hypertrophy focus
- GLP-1 patients: Resistance training to preserve muscle, LISS cardio
- Peptide patients: Recovery-focused, strategic training timing

Always provide:
1. 4-week program overview
2. Exercise demonstrations (YouTube links)
3. Progression scheme
4. Recovery recommendations
```

---

## Implementation Order

### Week 1: Foundation Completion
1. ⬜ Create `prompts/ai-system-prompts.md` with all personas
2. ⬜ Regenerate Supabase types
3. ⬜ Build Lab Results Interpreter UI (LabInterpreter.tsx)
4. ⬜ Add `/tools/lab-interpreter` route

### Week 2: Clinical Workflow
5. ⬜ Healthie appointment scheduling widget
6. ⬜ Pre-fill patient data from tool completions
7. ⬜ Begin DocuSign integration (templates)

### Week 3: Payments & Documents
8. ⬜ Stripe payment integration
9. ⬜ DocuSign e-signature flow
10. ⬜ Automated document sending on booking

### Week 4: Lab Services
11. ⬜ Labcorp availability widget
12. ⬜ Lab order management
13. ⬜ Results import webhook

### Week 5: Planning Tools
14. ⬜ AI Meal Planner UI
15. ⬜ AI Workout Generator UI
16. ⬜ Add routes and navigation

### Week 6: Polish & Testing
17. ⬜ Progress tracking dashboard
18. ⬜ Email nurture sequences
19. ⬜ End-to-end testing
20. ⬜ Performance optimization

---

## File Structure After Implementation

```
src/
├── components/
│   └── tools/
│       ├── HormoneAssessment.tsx      ✅ EXISTS
│       ├── TreatmentMatchQuiz.tsx     ✅ EXISTS
│       ├── Calculators.tsx            ✅ EXISTS
│       ├── LabInterpreter.tsx         ⏳ TO BUILD
│       ├── MealPlanner.tsx            ⏳ TO BUILD
│       ├── WorkoutGenerator.tsx       ⏳ TO BUILD
│       └── index.ts                   ✅ EXISTS
│
├── integrations/
│   ├── healthie/
│   │   ├── HealthieClient.ts          ✅ EXISTS
│   │   ├── patientSync.ts             ⏳ OPTIONAL
│   │   └── appointmentManager.ts      ⏳ TO BUILD
│   ├── stripe/
│   │   ├── StripeClient.ts            ⏳ TO BUILD
│   │   └── SubscriptionManager.ts     ⏳ TO BUILD
│   ├── docusign/
│   │   ├── DocuSignClient.ts          ⏳ TO BUILD
│   │   └── envelopeManager.ts         ⏳ TO BUILD
│   └── labcorp/
│       ├── LabcorpClient.ts           ⏳ TO BUILD
│       └── AvailabilityWidget.tsx     ⏳ TO BUILD
│
├── pages/
│   └── tools/
│       ├── lab-interpreter.tsx        ⏳ TO BUILD
│       ├── meal-planner.tsx           ⏳ TO BUILD
│       └── workout-generator.tsx      ⏳ TO BUILD
│
└── prompts/
    └── ai-system-prompts.md           ⏳ TO BUILD

supabase/functions/
├── healthie-sync/index.ts             ✅ EXISTS
├── stripe-webhook/index.ts            ⏳ TO BUILD
├── docusign-webhook/index.ts          ⏳ TO BUILD
└── labcorp-results/index.ts           ⏳ TO BUILD
```

---

## Immediate Next Steps

**Ready to implement now:**

1. **Create System Prompts File** - Define AI personas for all tools
2. **Build Lab Results Interpreter** - Highest priority missing tool
3. **Regenerate Supabase Types** - Fix type mismatches

Would you like me to start implementing these items?
