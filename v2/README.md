# Elevare Health - Full Platform (v2)

This folder contains the complete **Elevare Health** telehealth platform - a production-ready React application for hormone and peptide therapy services.

## What's In This Folder

### Core Application
- **React + Vite + TypeScript** web application
- **Tailwind CSS + shadcn/ui** component library
- **Supabase** backend integration
- **Netlify** deployment configuration

### Key Features

| Feature | Description |
|---------|-------------|
| **Treatment Pages** | 8 treatment categories with product catalogs |
| **Intake System** | 4-step patient intake form |
| **AI Chat Widget** | Nova - AI-powered treatment advisor |
| **Health Tools** | BMI, TDEE, calorie calculators |
| **Dashboard** | Patient portal (authenticated) |
| **Admin** | Media manager, brand kit |

### Pages

```
/                     → Homepage
/treatments/*         → Treatment category pages
/intake               → Patient intake form
/dashboard            → Patient dashboard
/tools                → Health calculators
/pricing              → Pricing comparison
/contact              → Contact page
/about                → About page
/faq                  → FAQ
```

### Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **AI**: OpenAI GPT-4 (chat widget)
- **Deployment**: Netlify
- **Email**: Resend

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Live Site

**Production**: https://elevarhealth.co

## Key Directories

```
src/
├── components/       # React components
│   ├── ui/          # shadcn/ui primitives
│   ├── intake/      # Intake form steps
│   └── tools/       # Health calculators
├── pages/           # Route pages
├── hooks/           # Custom React hooks
├── contexts/        # React contexts (Auth)
├── integrations/    # Supabase, Healthie
└── lib/             # Utilities

public/
├── images/          # Product and lifestyle images
└── *.svg            # Logo assets

supabase/
├── functions/       # Edge functions
└── migrations/      # Database schema
```

## Relationship to Spiny Lobster

This codebase demonstrates the **Cofounder AI Platform** capabilities - the same 50-agent orchestration system that powers Spiny Lobster Creative's marketing services.

---

*Part of the Oliwood Ecosystem*
