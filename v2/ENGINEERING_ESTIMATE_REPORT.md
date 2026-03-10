# ELEVARE HEALTH — Engineering Estimate & Task Breakdown

**Date:** February 21, 2026
**Prepared by:** 3 Senior Engineers (Backend/Infra, Frontend/DevOps, Security/Compliance)
**Purpose:** Complete task inventory and time estimate for fixing/completing the platform

---

## EXECUTIVE SUMMARY

| Engineer | Domain | Tasks | Hours | Calendar Time (solo) |
|----------|--------|:-----:|:-----:|:-------------------:|
| **#1 Backend/Infra** | Stripe, LabCorp, DocuSign, Email, Healthie, Webhooks, Observability | 39 | **~172 hrs** | ~4.3 weeks |
| **#2 Frontend/DevOps** | Analytics, SEO, CI/CD, Testing, Performance, Accessibility | 37 | **~164 hrs** | ~4.1 weeks |
| **#3 Security/Compliance** | HIPAA, BAAs, Audit Logging, Sessions, Encryption, TX Compliance | 54 | **~416 hrs** | ~10.4 weeks |
| | | | | |
| **GRAND TOTAL** | | **130 tasks** | **~752 hours** | |

### With 3 Engineers in Parallel
- **P0 work (launch-blocking):** ~5–6 weeks
- **P0 + P1 (production-ready):** ~8–10 weeks
- **Everything (P0–P3):** ~14–16 weeks

### Cost Estimate (at $150/hr senior rate)
- P0 only: ~$50K
- P0 + P1: ~$78K
- Full scope: ~$113K
- Legal/compliance counsel: additional ~$10K–$15K

---

## ENGINEER #1: BACKEND & INFRASTRUCTURE

**Total: 39 tasks | ~172 hours (~4.3 weeks)**

### Area Breakdown

| Area | Tasks | Hours | Priority |
|------|:-----:|:-----:|----------|
| Stripe Payments | 8 | 38–46 | P0 (revenue) |
| LabCorp Integration | 6 | 30–38 | P0 (clinical) |
| DocuSign Integration | 5 | 20–26 | P0 (legal) |
| CustomerIO Email Pipeline | 6 | 22–28 | P1 |
| Healthie Fixes | 3 | 8–12 | P0 |
| Webhook Infrastructure | 4 | 14–18 | P0 |
| Observability & Reliability | 4 | 12–16 | P1 |
| DevOps & Environment | 3 | 6–10 | P2 |

### Key Tasks (P0)

| ID | Task | Hours | Why It's Blocking |
|----|------|:-----:|-------------------|
| BE-001 | Stripe SDK setup + shared client | 3 | Revenue pipeline starts here |
| BE-002 | Stripe Checkout Session edge function | 6 | Patients can't pay without this |
| BE-003 | Stripe Webhook handler (5 event types) | 10 | Subscription lifecycle management |
| BE-009 | LabCorp API client (OAuth2, orders, results) | 10 | Labs required before TRT prescribing |
| BE-010 | Lab order placement edge function | 6 | Clinical workflow blocked |
| BE-015 | DocuSign API client (JWT auth, envelopes) | 8 | Consent forms required before treatment |
| BE-016 | DocuSign envelope creation edge function | 5 | Signing flow blocked |
| BE-017 | DocuSign webhook handler | 6 | Document completion tracking |
| BE-025 | Fix Healthie webhook verification (placeholder returns `true`) | 3 | Security vulnerability |
| BE-028 | Shared webhook verification utilities (HMAC-SHA256) | 4 | All webhooks depend on this |
| BE-029 | Webhook event logging table | 4 | Debugging + replay capability |

### Sprint Plan

**Sprint 1 (Weeks 1–2):** Stripe (BE-001→007) + Webhook infra (BE-028→030) = ~50 hrs
**Sprint 2 (Weeks 2–3):** DocuSign (BE-015→018) + Healthie fixes (BE-025→027) + LabCorp start (BE-009→010) = ~48 hrs
**Sprint 3 (Weeks 3–4):** LabCorp complete (BE-011→014) + Email pipeline (BE-019→024) = ~40 hrs
**Sprint 4 (Weeks 4–5):** Observability (BE-032→035) + Testing + CI/CD (BE-037→038) = ~34 hrs

### Critical Blockers
- **Stripe HIPAA BAA:** 1–4 weeks lead time. Must initiate immediately.
- **LabCorp API access:** 4–8 weeks credentialing. Consider PWNHealth/Vital as intermediary.
- **DocuSign HIPAA BAA:** 1–2 weeks.

### External Requirements
```
Secrets to provision:
- STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PUBLISHABLE_KEY
- LABCORP_CLIENT_ID, LABCORP_CLIENT_SECRET, LABCORP_API_URL
- DOCUSIGN_INTEGRATION_KEY, DOCUSIGN_USER_ID, DOCUSIGN_ACCOUNT_ID
- DOCUSIGN_RSA_PRIVATE_KEY, DOCUSIGN_CONNECT_SECRET
- CUSTOMERIO_SITE_ID, CUSTOMERIO_API_KEY, CUSTOMERIO_TRANSACTIONAL_API_KEY
- HEALTHIE_WEBHOOK_SECRET, HEALTHIE_API_KEY_PROD
- SENTRY_DSN or AXIOM_API_KEY
```

### New Edge Functions to Create
1. `stripe-checkout` — Checkout session creation
2. `stripe-webhook` — Stripe event handling
3. `stripe-portal` — Customer portal sessions
4. `subscription-status` — Subscription state queries
5. `lab-order` — Lab order placement
6. `lab-order-status` — Order status queries
7. `lab-order-poll` — Status polling (cron)
8. `labcorp-webhook` — Results delivery
9. `docusign-send` — Envelope creation
10. `docusign-webhook` — Signing events
11. `document-status` — Document status queries
12. `send-email` — Transactional email sending
13. `customerio-webhook` — Email tracking events
14. `healthie-webhook` — Healthie event handling
15. `webhook-health` — Webhook endpoint monitoring
16. `health` — System health check

### New Database Migrations
1. `stripe_schema_additions.sql` — Checkout session ID, cancel_at_period_end, payment_history table
2. `labcorp_schema_additions.sql` — Requisition number, fasting, location, status_history
3. `docusign_schema_additions.sql` — Template ID, signer email, void/decline fields
4. `email_schema_additions.sql` — CustomerIO message ID, bounce reason
5. `webhook_events.sql` — Event logging table with 90-day retention

---

## ENGINEER #2: FRONTEND & DEVOPS

**Total: 37 tasks | ~164 hours (~4.1 weeks)**

### Area Breakdown

| Area | Tasks | Hours | Priority |
|------|:-----:|:-----:|----------|
| Analytics & Tracking | 4 | 18 | P0 |
| SEO | 5 | 19 | P0/P1 |
| DevOps / CI/CD | 6 | 14.5 | P0/P1 |
| Error Tracking | 3 | 8.5 | P0 |
| Performance | 5 | 16.5 | P1/P2 |
| Testing | 6 | 46 | P0/P1/P2 |
| Accessibility | 4 | 19 | P1/P2 |
| A/B Testing | 2 | 8 | P2/P3 |
| Documentation (Storybook) | 2 | 14 | P3 |

### P0 Tasks (Ship Blockers) — 49.5 hrs

| ID | Task | Hours |
|----|------|:-----:|
| FE-001 | PostHog analytics infrastructure | 4 |
| FE-002 | Page view tracking (React Router) | 2 |
| FE-003 | Conversion funnel events (13 components) | 8 |
| FE-005 | SEOHead component (react-helmet-async) | 3 |
| FE-006 | Per-page SEO (25 pages) | 6 |
| FE-010 | GitHub Actions CI pipeline | 4 |
| FE-013 | Netlify security headers + cache control | 3 |
| FE-016 | Sentry error tracking + source maps | 4 |
| FE-017 | ErrorBoundary + Sentry integration | 1.5 |
| FE-024 | Test infrastructure + utilities | 4 |
| FE-025 | Critical path component tests (6 test files) | 10 |

### P1 Tasks — 64 hrs

| ID | Task | Hours |
|----|------|:-----:|
| FE-004 | PostHog dashboards + funnels config | 4 |
| FE-007 | Schema.org structured data (JSON-LD) | 5 |
| FE-008 | Sitemap.xml generation (build-time) | 3 |
| FE-009 | robots.txt + OG image | 2 |
| FE-011 | Netlify deploy previews | 2 |
| FE-012 | Pre-commit hooks (Husky + lint-staged) | 2 |
| FE-014 | Environment variable validation (Zod) | 1.5 |
| FE-018 | Console.log cleanup (58+ instances, 20 files) | 3 |
| FE-019 | Image optimization pipeline (WebP, responsive) | 6 |
| FE-021 | Core Web Vitals monitoring + Lighthouse CI | 4 |
| FE-022 | Font loading optimization | 1.5 |
| FE-026 | Intake form tests (5 step components) | 6 |
| FE-027 | AI tool component tests (5 tools) | 8 |
| FE-030 | Automated a11y audit (axe-core) | 4 |
| FE-031 | ARIA labels + semantic HTML remediation | 8 |
| FE-032 | Keyboard navigation + focus management | 4 |

### Parallelization Strategy
```
Stream A (Analytics + Errors):  FE-001 → FE-002 → FE-003 → FE-004 | FE-016 → FE-017
Stream B (SEO):                 FE-005 → FE-006 → FE-007 | FE-008, FE-009 (independent)
Stream C (DevOps):              FE-010 → FE-011 → FE-015 | FE-012, FE-013 (independent)
Stream D (Testing):             FE-024 → FE-025 → FE-026 → FE-027 → FE-028 → FE-029
Stream E (Performance):         FE-019, FE-020, FE-022, FE-023 (all independent)
Stream F (Accessibility):       FE-030 → FE-031 → FE-032 → FE-033
```

### New Packages Required
```
Production: posthog-js, react-helmet-async, web-vitals
Dev: @sentry/react, @sentry/vite-plugin, @vitest/coverage-v8,
     @playwright/test, @axe-core/react, eslint-plugin-jsx-a11y,
     husky, lint-staged, prettier, rollup-plugin-visualizer,
     vite-plugin-image-optimizer, @lhci/cli
```

### New Files to Create
- `src/contexts/AnalyticsContext.tsx` — PostHog provider
- `src/components/SEOHead.tsx` — Dynamic meta tags
- `src/components/RouteTracker.tsx` — Page view tracking
- `src/lib/analytics.ts` — Event constants + helpers
- `src/lib/structured-data.ts` — JSON-LD generators
- `src/lib/env.ts` — Environment validation
- `src/lib/sentry.ts` — Sentry config
- `src/lib/web-vitals.ts` — CWV monitoring
- `.github/workflows/ci.yml` — CI pipeline
- `scripts/generate-sitemap.ts` — Build-time sitemap
- `lighthouserc.js` — Lighthouse CI config
- 20+ test files across `__tests__/` directories
- 5+ E2E test files in `e2e/` directory

---

## ENGINEER #3: SECURITY & COMPLIANCE

**Total: 54 tasks | ~416 hours (~10.4 weeks)**

### Area Breakdown

| Area | Tasks | Hours | Priority |
|------|:-----:|:-----:|----------|
| BAA & Vendor Compliance | 6 | 38–48 | P0 |
| Audit Logging | 6 | 46–52 | P0 |
| Security Headers & Transport | 4 | 14–18 | P0 |
| Session Management | 4 | 20–24 | P0 |
| Auth & Edge Function Security | 6 | 30–36 | P0/P1 |
| Input Validation & Data Integrity | 4 | 24–28 | P1 |
| Data Retention & Lifecycle | 4 | 22–26 | P1 |
| PHI De-identification for AI | 3 | 18–22 | P0 |
| RLS Policy Hardening | 3 | 14–16 | P1 |
| Breach Notification & IR | 3 | 20–24 | P1 |
| Consent Management | 3 | 16–20 | P1 |
| Application-Level Encryption | 2 | 16–20 | P2 |
| Security Scanning & CI/CD | 4 | 18–22 | P2 |
| Texas Telehealth Compliance | 2 | 12 | P0 |

### CRITICAL RISK ITEMS (Do Immediately)

| ID | Risk | Why It's Critical |
|----|------|-------------------|
| SEC-003 | **PHI sent to AI gateway without BAA** | Every AI API call is potentially a reportable breach. Patient symptoms, age, health concerns sent to `ai.gateway.lovable.dev` with no BAA. |
| SEC-007–009 | **Zero audit logging** | Cannot demonstrate who accessed PHI. Undefendable in any breach investigation. |
| SEC-017 | **No session timeout** | Provider walks away, PHI accessible indefinitely. Common HIPAA citation. |
| SEC-022 | **Webhook verification returns `true`** | Anyone who finds the webhook URL can inject arbitrary data into patient records. |
| SEC-035 | **No PHI stripping before AI** | Names, DOB, emails, phone numbers potentially sent to AI providers. |
| SEC-053 | **TX controlled substance prescribing** | TRT is Schedule III. Must have synchronous A/V visit + TX license verification. |
| SEC-041 | **No incident response plan** | HIPAA requires 60-day breach notification. Without a plan, response is non-compliant. |

### P0 Security Tasks — ~142 hours

| ID | Task | Hours |
|----|------|:-----:|
| SEC-001 | BAA with Supabase | 6 |
| SEC-002 | BAA with Netlify | 8 |
| SEC-003 | BAA with AI Gateway (Lovable/Gemini) | 10 |
| SEC-004 | BAA with Healthie | 4 |
| SEC-005 | BAA with Anthropic (Claude) | 5 |
| SEC-007 | Audit log schema (immutable, append-only) | 6 |
| SEC-008 | Database audit triggers (9 PHI tables) | 12 |
| SEC-009 | Edge function audit logging | 10 |
| SEC-013 | Security headers (HSTS, X-Frame, etc.) | 2 |
| SEC-015 | Restrict CORS (replace `*` with domain) | 3 |
| SEC-017 | Session inactivity timeout (15 min) | 8 |
| SEC-019 | Clear PHI from localStorage on logout | 4 |
| SEC-022 | Fix webhook signature verification | 4 |
| SEC-024 | Remove hardcoded staging credentials | 1 |
| SEC-025 | Service role key isolation audit | 6 |
| SEC-026 | Verify .env key is anon (not service_role) | 2 |
| SEC-035 | PHI stripping before AI transmission | 12 |
| SEC-041 | Incident response plan | 10 |
| SEC-051 | Secret detection + .gitignore .env | 3 |
| SEC-053 | TX telehealth prescribing compliance | 8 |

### Risk Matrix

| Risk | Likelihood | Impact | Level |
|------|-----------|--------|-------|
| PHI sent to AI without BAA | Certain | Critical ($1.9M+) | **EXTREME** |
| No audit trail for PHI | Certain | Critical | **EXTREME** |
| Webhook spoofing | Likely | High (data corruption) | **HIGH** |
| Session hijacking/no timeout | Likely | High (PHI exposure) | **HIGH** |
| XSS via missing CSP | Possible | Critical (PHI theft) | **HIGH** |
| TX prescribing violation | Possible | Critical (license revocation) | **HIGH** |
| AI API cost abuse (no rate limit) | Likely | Medium ($$$) | **MEDIUM** |
| Service role key extraction | Unlikely | Critical (full DB) | **MEDIUM** |

### Requires Legal Counsel (not engineering hours)
1. BAA negotiation & review (SEC-001 through SEC-005)
2. Data retention policy (SEC-031) — TX medical record laws
3. Incident response plan review (SEC-041)
4. Privacy policy content (SEC-046)
5. Consent language (SEC-045)
6. TX telehealth compliance opinion (SEC-053)
7. AI liability assessment (SEC-036, SEC-037)
8. Formal HIPAA risk assessment document

### Legal Budget
- Healthcare compliance attorney: 20–30 hours @ $300–500/hr = **$6K–$15K**
- Annual penetration test: **$5K–$15K**

---

## COMBINED SPRINT PLAN (3 Engineers in Parallel)

### Weeks 1–2: Foundation + Security Baseline

| Engineer | Focus | Hours |
|----------|-------|:-----:|
| **#1 Backend** | Stripe SDK + checkout + webhooks + infra | 50 |
| **#2 Frontend** | CI pipeline + Netlify headers + PostHog + Sentry + SEO | 30 |
| **#3 Security** | BAAs initiated + audit log schema/triggers + security headers + CORS + session timeout | 55 |

### Weeks 3–4: Clinical Operations + Testing

| Engineer | Focus | Hours |
|----------|-------|:-----:|
| **#1 Backend** | DocuSign + Healthie fixes + LabCorp API client | 48 |
| **#2 Frontend** | Analytics events + per-page SEO + test infrastructure + critical tests | 38 |
| **#3 Security** | PHI stripping for AI + webhook verification + edge function auth + TX compliance | 48 |

### Weeks 5–6: Email Pipeline + Quality

| Engineer | Focus | Hours |
|----------|-------|:-----:|
| **#1 Backend** | LabCorp complete + CustomerIO email pipeline | 40 |
| **#2 Frontend** | Intake/tool tests + image optimization + CWV + a11y audit | 38 |
| **#3 Security** | Input validation + data retention + RLS hardening + incident response | 48 |

### Weeks 7–8: Hardening + Polish

| Engineer | Focus | Hours |
|----------|-------|:-----:|
| **#1 Backend** | Observability + Stripe testing + CI/CD + docs | 34 |
| **#2 Frontend** | A11y remediation + console cleanup + deploy previews + pre-commit | 30 |
| **#3 Security** | Consent management + breach notification infra + privacy policy | 36 |

### Weeks 9–12: P2/P3 Completion

| Engineer | Focus | Hours |
|----------|-------|:-----:|
| **#1 Backend** | Environment management + documentation | 10 |
| **#2 Frontend** | E2E tests + Storybook + A/B testing + bundle monitoring | 36 |
| **#3 Security** | Application encryption + security scanning + anomaly detection | 54 |

---

## IMMEDIATE ACTIONS (Before Engineering Starts)

### Week 0 Checklist

| # | Action | Owner | Timeline |
|---|--------|-------|----------|
| 1 | **Initiate Stripe HIPAA BAA** | Business | Start today (1–4 week lead time) |
| 2 | **Apply for LabCorp API access** (or evaluate PWNHealth) | Business | Start today (4–8 week lead time) |
| 3 | **Initiate DocuSign developer account + BAA** | Business | Start today (1–2 weeks) |
| 4 | **Confirm Supabase BAA** (may require Pro plan upgrade) | Eng #3 | Day 1 |
| 5 | **Confirm Healthie BAA + get webhook secret** | Business | Day 1 |
| 6 | **Investigate AI gateway BAA** (lovable.dev) | Eng #3 | Day 1 |
| 7 | **Engage healthcare compliance attorney** | Business | This week |
| 8 | **Create CustomerIO account** | Business | Day 1 |
| 9 | **Create PostHog + Sentry accounts** | Eng #2 | Day 1 |
| 10 | **Authenticate Supabase + CustomerIO MCP servers** | Any Eng | Day 1 (15 min each) |

---

## KEY FINDINGS

### The Platform Is 70% Built, 30% Wired

The cofounder built:
- Complete frontend (147 files, 25 pages, 60+ components)
- Complete database schema (13 tables with RLS)
- 5 working edge functions with AI integration
- Full Healthie EMR client (496 lines)
- Lead scoring, realtime messaging, media storage

What's missing is the **connective tissue**:
- Payment processing (schema exists, zero code)
- Lab ordering (schema exists, zero code)
- Document signing (schema exists, zero code)
- Email automation (schema exists, zero code)
- Webhook handlers (zero exist)
- Analytics (zero)
- Testing (1 example file)
- HIPAA compliance layer (critical gaps)
- Security hardening (missing headers, timeouts, audit logs)

### The Security Debt Is the Biggest Risk

Not the backend integrations. The platform is currently transmitting PHI to AI providers without BAAs, has no audit logging, no session management, and a webhook that accepts anything. For a telehealth platform prescribing controlled substances in Texas, this is the highest-priority remediation.

### Revenue Is Blocked by 3 Integrations

Patients cannot:
1. **Pay** (no Stripe integration)
2. **Sign consent forms** (no DocuSign integration)
3. **Get labs drawn** (no LabCorp integration)

All three have database schemas ready. The backend engineer can build all three in ~90 hours (~2.5 weeks).

---

*Report compiled February 21, 2026*
*Engineer #1: Backend/Infrastructure — 39 tasks, ~172 hours*
*Engineer #2: Frontend/DevOps — 37 tasks, ~164 hours*
*Engineer #3: Security/Compliance — 54 tasks, ~416 hours*
