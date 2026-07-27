export const profile = {
  name: "Fahad Chandio",
  title: "AI Solutions Engineer",
  subtitle: "Automation, Voice AI & AI-Driven Systems",
  location: "Dubai, UAE",
  tagline: "I build the automation your operations team keeps saying they'll get to eventually.",
  positioning:
    "I help companies identify operational problems and deploy AI-powered systems that automate workflows and improve business outcomes.",
  bio: "Six years running enterprise and SMB account relationships across North America, EMEA, and the GCC. Two years designing and shipping the automation and AI systems those accounts actually needed. Not a software engineer by training - the value is deploying real systems into real operational gaps.",
  email: "fhdchnd@gmail.com",
  linkedin: "https://linkedin.com/in/fchandio",
  github: "https://github.com/fhdchnd",
  resumeUniversal: "Fahad_Chandio_Resume_AI_Solutions_Engineer.pdf",
  resumeUAE: "Fahad_Chandio_Resume_UAE.pdf",
};

export const stats = [
  { value: "7x", label: "Average ROAS" },
  { value: "35%", label: "Retention lift driven" },
  { value: "$100K+", label: "Expansion revenue" },
  { value: "60+", label: "Enterprise & gov accounts" },
];

export const caseStudies = [
  {
    id: "sip-platform",
    tag: "Distributed Systems / Telephony",
    title: "SIP-Based Outbound Calling Platform",
    context:
      "A high-volume outbound calling operation needed a power-dialer that could run for free, from anywhere, without a machine staying on - and needed to survive real carrier-level failure modes, not just a happy-path demo.",
    problem:
      "Commercial dialer tools were unreliable or cost-prohibitive at this scale. The system needed automatic voicemail detection, timezone-aware queueing across thousands of leads, and real-time call transcription - while staying free to operate indefinitely.",
    constraints: [
      "Zero ongoing hosting cost - ruled out every option requiring a billing account or paid tier",
      "Had to keep working reachable from any device, without a always-on machine",
      "Real-time webhook delivery required for voicemail auto-skip - ruled out a pure static-site approach",
    ],
    architecture: [
      { label: "Client", detail: "React + XState call-state machine, Mac/iPhone/desktop" },
      { label: "Edge", detail: "Cloudflare Pages + Worker (API proxy, header translation)" },
      { label: "Backend", detail: "Google Apps Script Web App (business logic, Vitest-tested)" },
      { label: "Carrier", detail: "SIP/PSTN telephony API - calls, webhooks, transcription" },
    ],
    decisions: [
      "Chose Apps Script + Cloudflare over three paid alternatives (a serverless platform requiring a billing account, and a 'free tier' host that demanded a card on file) purely to hit the zero-cost constraint without sacrificing real-time webhooks.",
      "Built a 356-entry area-code-to-timezone map so leads inside their local calling window get soft-prioritized in the queue - never dropped, just deprioritized when out of window, so the queue can never go idle.",
      "When browser transfer legs started silently failing in production, root-caused it directly against the carrier's own call-detail-record API instead of guessing - found a single disabled config flag on the credential connection rejecting every transfer leg in under a second.",
    ],
    outcome:
      "Live system, real calls verified end-to-end. A full 11-point WebRTC/telephony security and audio-quality audit found 8 points already compliant and closed the remaining 2 (explicit echo-cancellation/noise-suppression constraints, documented TURN-relay fallback).",
    lesson:
      "The best debugging tool is the system's own source of truth - the carrier's call logs solved in minutes what browser console errors couldn't explain at all.",
  },
  {
    id: "voice-ai",
    tag: "Conversational AI / Prompt Engineering",
    title: "Conversational Voice AI Deployment",
    context:
      "A client-facing calling workflow needed a voice agent that could hold a natural phone conversation with a non-technical caller, without ever misquoting price or overstepping its scope.",
    problem:
      "Off-the-shelf voice-AI defaults sound robotic and will happily improvise on pricing or scope if not explicitly constrained - a real liability in a live customer-facing product.",
    constraints: [
      "Every response had to stay within explicit pricing/scope guardrails - no improvisation allowed",
      "Had to sound human enough to hold attention on a real phone call, not read as an obvious bot",
      "Needed abuse protection against unlimited free usage driving up API cost",
    ],
    architecture: [
      { label: "Voice layer", detail: "Vapi conversational voice AI agent" },
      { label: "Guardrails", detail: "Prompt-level pricing/scope constraints, no-quote fallback" },
      { label: "Abuse gate", detail: "Cloudflare Worker + KV rate limiter (per-visitor & daily caps)" },
    ],
    decisions: [
      "Tuned pacing and filler-word behavior deliberately, rather than accepting default TTS cadence, after early tests read as too obviously synthetic.",
      "Added a hard rate-limit gate in front of the call-start endpoint rather than trusting client-side throttling, since the real risk was API cost runaway, not just spam.",
    ],
    outcome:
      "Deployed into a live customer-facing calling workflow with guardrails holding under real caller interactions.",
    lesson:
      "Guardrails belong in the prompt and the infrastructure, not just in the UI - a rate limit anyone can bypass client-side isn't a rate limit.",
  },
  {
    id: "llm-orchestration",
    tag: "LLM Systems / Safety-by-Design",
    title: "LLM Orchestration Layer",
    context:
      "An interactive AI-generation product needed to stay online on a zero-cost LLM budget, across a fleet of free-tier models with wildly different behavior and reliability.",
    problem:
      "Free-tier models frequently broke format - emitting planning notes or stage directions instead of clean prose - and a naive fallback chain was burning the tiny per-minute budget once per model attempted, not once per real user request.",
    constraints: [
      "Hard per-minute and per-day request budget across all models combined",
      "Output had to stay in-character prose, never visible reasoning artifacts",
      "Needed a content-safety boundary before any model call, not just output filtering after",
    ],
    architecture: [
      { label: "Runtime", detail: "Supabase Edge Function (Deno)" },
      { label: "Routing", detail: "6-model fallback chain, intensity-tiered" },
      { label: "Quality gate", detail: "Two independent detectors reject off-format model output" },
      { label: "Safety gate", detail: "Pre-call content guard on user-authored character data" },
    ],
    decisions: [
      "Found and fixed a budget-accounting bug where a single user turn falling through 3-4 fallback models before succeeding was silently spending 3-4x the intended budget per request.",
      "Shipped the content-safety guard as explicitly pattern-matching, not a trained classifier - documented its real ceiling and the upgrade path, rather than overstating what it actually catches.",
    ],
    outcome:
      "Stabilized a product that was intermittently failing under free-tier limits; safety guard shipped ahead of any wider release.",
    lesson:
      "Honest documentation of a safeguard's real limits is worth more than a confident claim that oversells it - the ceiling is the spec for what to build next.",
  },
  {
    id: "signal-pipelines",
    tag: "Data Engineering / GTM Systems",
    title: "Signal-Based Data Pipeline Architecture",
    context:
      "Cold outbound built on static purchased lists converts poorly. A better signal: public data that indicates a business actually has the problem right now.",
    problem:
      "Needed a repeatable architecture to turn scattered public data sources - regulatory enforcement records, federal procurement awards, business-listing data - into enriched, scored, ready-to-contact pipeline, without a manual research step per source.",
    architecture: [
      { label: "Source", detail: "Public data (regulatory, procurement, business-listing APIs)" },
      { label: "Compute", detail: "Python cron workers (Railway)" },
      { label: "Enrichment", detail: "Contact/company enrichment APIs, domain resolution" },
      { label: "Output", detail: "Scored, prioritized pipeline into CRM/outbound tooling" },
    ],
    decisions: [
      "Standardized the same scrape-enrich-score-route architecture across five independent data sources rather than building bespoke pipelines each time, cutting new-source turnaround to days.",
      "Validated enrichment hit-rate on a small sample before committing paid API credits to a full run, after an early attempt hit a plan-tier wall with zero return.",
    ],
    outcome:
      "Five pipelines built on one shared architecture, feeding prioritized outbound pipeline instead of static purchased lists.",
    lesson:
      "A repeatable pipeline shape is worth more than any single pipeline - the fifth source took a fraction of the first one's build time.",
  },
  {
    id: "revops",
    tag: "Enterprise RevOps",
    title: "GTM & RevOps Automation at Enterprise Scale",
    context:
      "Managing enterprise and government media accounts (NEOM, Etisalat, The Economist, Politico, TIME) surfaced the same operational drag repeatedly: manual CRM hygiene and lead routing eating account-management time that should go to the client relationship.",
    architecture: [
      { label: "CRM", detail: "Oracle NetSuite + Salesforce (Classic & Lightning)" },
      { label: "Automation", detail: "Make and n8n workflows for hygiene & routing" },
      { label: "Reporting", detail: "Power BI sales-intelligence dashboards" },
    ],
    decisions: [
      "Automated CRM hygiene and cross-team lead routing directly rather than escalating to an internal engineering backlog, closing the gap in weeks instead of a quarter-plus wait.",
      "Built Power BI dashboards on top of NetSuite data specifically to inform pricing and account-prioritization decisions, not just static reporting.",
    ],
    outcome:
      "Reduced manual coordination load across sales, delivery, and account management on a 60+ account enterprise book; contributed to 7x average ROAS, a 35% retention lift, and $100K+ in expansion revenue on the accounts it touched most directly.",
    lesson:
      "The highest-leverage automation is usually the boring one nobody wants to own - CRM hygiene, not the flashy AI feature.",
  },
  {
    id: "containerization",
    tag: "Containerization / CI-CD",
    title: "Containerization & CI/CD Retrofit",
    context:
      "Docker and GitLab CI sat unused - installed, never applied. Rather than a hello-world toy example, retrofitted both onto five real existing pipeline projects, deliberately isolated from anything live or revenue-critical.",
    problem:
      "Each project had different real constraints: three already had test suites to wire into CI, one depended on a large local LLM runtime that doesn't belong baked into an image, and one was a loose script with no repository at all.",
    constraints: [
      "Never touch or risk live/production systems - all retrofit work stayed on isolated branches, zero commits to main or any live infrastructure",
      "No fabricated verification - state exactly what was confirmed against what wasn't",
      "Wire CI test stages to each project's real existing test suite rather than inventing coverage",
    ],
    architecture: [
      { label: "CI", detail: "GitLab CI: lint/test/build stages, test stage wired to each project's real suite where one exists" },
      { label: "Containers", detail: "Single-stage Dockerfiles - no compiled artifacts to justify a multi-stage build" },
      { label: "Isolation", detail: "One new branch per project, nothing touching main or live infrastructure" },
    ],
    decisions: [
      "Verified each existing test suite actually passes (38/38, 55/55, 51/51 across three pipelines) before wiring it into CI, instead of asserting a pipeline was green when no GitLab runner was available to confirm it",
      "Left one pipeline's LLM dependency external rather than forcing it into the container - a local RAG demo's model weights don't belong baked into an image, so the Dockerfile documents the external host requirement instead",
      "Shipped the RAG demo publicly after genericizing it, since a Docker/CI story needs a real reachable repo, not just local commits",
    ],
    outcome:
      "Five projects retrofitted with real Dockerfiles and GitLab CI configs; three verified against real passing test suites; one pushed public as a working example (github.com/fhdchnd/local-rag-demo). Image builds are written correctly but confirmed pending one manual one-time Docker Desktop setup step - stated as pending, not claimed as done.",
    lesson:
      "For a tool just picked up, 'here's exactly what's verified and what's still pending' reads as more credible than a blanket claim - and it's the honest answer anyway.",
  },
];

export const experience = [
  {
    role: "Media Solutions Manager",
    company: "The Vantage",
    place: "Dubai, UAE",
    dates: "Nov 2023 - Nov 2025",
    note: "Where the automation instinct started: manual CRM/reporting work across enterprise and government accounts that kept getting eliminated instead of tolerated.",
    highlights: [
      "Programmatic & multi-channel media across EMEA for The Economist, Politico, TIME - enterprise/government accounts including NEOM and Etisalat",
      "Power BI + Oracle NetSuite sales-intelligence dashboards",
      "CRM hygiene & lead-routing automation (Make, n8n, ClickUp)",
    ],
  },
  {
    role: "Account Manager (US Accounts, Remote)",
    company: "The Social Nerds",
    place: "Remote",
    dates: "May 2022 - Aug 2023",
    note: "Proof the commercial instinct scales: 60+ accounts, real revenue numbers, Salesforce on the side.",
    highlights: [
      "60+ account North American book (fintech, sporting goods, wealth management, tech), incl. Salesforce Classic & Lightning on select accounts",
      "7x average ROAS on Meta/TikTok; $100K+ upsell/expansion revenue; 35% retention lift",
    ],
  },
  {
    role: "Senior Account Executive",
    company: "Crystallite Pakistan",
    place: "Remote",
    dates: "Mar 2021 - May 2022",
    note: "First time managing a team and owning a function end to end.",
    highlights: ["50+ recurring accounts, 40% retention lift", "Led SEO/social/digital across 15 brands, managed a team of 5"],
  },
  {
    role: "Account Executive",
    company: "Adept Tech Solutions",
    place: "Remote",
    dates: "Aug 2020 - Apr 2021",
    note: "",
    highlights: ["Restructured onboarding, retention, and upsell workflows"],
  },
  {
    role: "Tech Author",
    company: "Wccftech & Appuals",
    place: "Remote",
    dates: "Feb 2019 - Jul 2020",
    note: "",
    highlights: ["Research-driven technical guides; SEO/affiliate content workflows"],
  },
  {
    role: "Customer Success Manager",
    company: "SquareTrade (Allstate)",
    place: "Remote",
    dates: "Nov 2017 - Jan 2019",
    note: "Where the systems-thinking habit started: Salesforce-based triage at scale.",
    highlights: ["Salesforce-based triage for a US insurance program", "Trained new-hire cohorts on workflows and SLAs"],
  },
];

export const skills = [
  {
    group: "AI & Automation",
    items: ["Voice AI (Vapi)", "LLM orchestration", "Prompt engineering", "Anthropic Claude & OpenRouter APIs", "RAG / LangChain / ChromaDB", "Make", "n8n", "Python"],
  },
  {
    group: "Systems & Infrastructure",
    items: ["Cloudflare (Pages/Workers/KV)", "Google Apps Script", "Railway", "Supabase (Postgres/Edge Functions)", "Docker", "GitLab CI/CD", "Git/GitHub"],
  },
  {
    group: "CRM & RevOps",
    items: ["Salesforce (Classic & Lightning)", "HubSpot (Academy-trained)", "Oracle NetSuite", "Power BI"],
  },
  {
    group: "GTM & Growth",
    items: ["Signal-based outbound", "Clay", "Apollo", "Instantly", "ICP modeling & lead scoring", "Meta & TikTok Ads", "SEO/AEO"],
  },
];
