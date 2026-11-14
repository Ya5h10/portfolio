export interface Project {
  id: string;
  name: string;
  repo: string;
  liveUrl?: string;
  language: string;
  stack: string[];
  tagline: string;
  description: string;
  highlights: string[];
  process: string[];
  outcome: string;
  accent: string;
  index: string;
  questRole: string;
}

export const projects: Project[] = [
  {
    id: "hr-with-docker",
    name: "Scoutly — Autonomous Hiring Platform",
    repo: "https://github.com/Ya5h10/hr-with-docker",
    language: "TypeScript",
    stack: [
      "TypeScript",
      "Docker",
      "PostgreSQL",
      "Nginx",
      "Vapi",
      "OpenAI",
      "Gemini 1.5",
      "WebSockets",
    ],
    tagline: "Dockerized recruiting ERP with AI ranking and voice outreach",
    accent: "from-sky-500 to-blue-600",
    index: "01",
    outcome: "Agentic loop: ingest → rank → AI call → analyze → next action",
    questRole: "Rank + Call stages",
    description:
      "Scoutly (hr-with-docker) is an end-to-end hiring platform: candidate and job workflows on a TypeScript backend/frontend, packaged so nginx serves the UI and proxies /api + Socket.IO to the app, with Postgres alongside. The agentic surface includes resume parsing/match scoring, multi-step AI call management via Vapi (dynamic assistant scripts, webhooks, transcript analysis), and recruiter-facing AI panels for insights and sourcing. Earlier portfolio notes also cover Gemini-powered resume-vs-JD ranking (~90% relevance) and autonomous personalized outreach for high-throughput pipelines.",
    highlights: [
      "Production-shaped Docker deploy: single app image + Postgres, nginx on :80, EC2-ready compose",
      "Vapi “Scoutly Recruiter” voice agent with job/candidate template variables and webhook updates",
      "AI call path: initiate → transcript webhook → OpenAI-assisted scoring/sentiment in the UI",
      "Broad AI feature surface in-repo: resume parse, match scores, semantic search UI, call analysis components",
      "Socket.IO proxied through nginx for live hiring workflow updates",
    ],
    process: [
      "Model the hiring domain (jobs, candidates, calls) before wiring models.",
      "Put voice outreach behind webhooks so the agent can act asynchronously.",
      "Ship as one domain (nginx + API) to kill CORS friction in production.",
    ],
  },
  {
    id: "ask-questions-about-websites",
    name: "AI Web Scraper",
    repo: "https://github.com/Ya5h10/Ask-questions-about-websites",
    language: "TypeScript",
    stack: [
      "Next.js",
      "Express",
      "BullMQ",
      "Redis",
      "Playwright",
      "Gemini 2.5 Flash",
      "PostgreSQL",
      "Drizzle",
      "Turborepo",
    ],
    tagline: "Ask questions about any website's layout and structure",
    accent: "from-violet-500 to-indigo-600",
    index: "02",
    outcome: "Tool-using AI over live page structure — scrape, queue, answer",
    questRole: "Ingest stage",
    description:
      "A Turborepo monorepo where users submit a URL + question. The API writes a pending task, BullMQ workers launch Playwright (StealthPlugin), extract simplified HTML (scripts/styles stripped, class names kept for layout analysis), truncate for the model, and call Google Gemini with a UI-engineering prompt. The Next.js app polls until the answer lands. Explicitly designed around bot protection, rate limits, and failure states — not a fragile demo scrape.",
    highlights: [
      "Monorepo packages: apps/web (Next + TanStack Query), apps/server (Express + worker), packages/db (Drizzle)",
      "Async scraper-queue with task statuses: pending → processing → completed/failed",
      "Gemini 2.5 Flash for layout hierarchy and design-intent Q&A",
      "Docker Compose for Postgres, Redis, API, worker, and frontend",
      "Handles empty HTML / bot walls with logged failure paths instead of silent success",
    ],
    process: [
      "Treat scraping as a job, not a request — queues absorb latency (10–30s+ pages).",
      "Feed the model structure (classes, hierarchy), not raw noise.",
      "Surface failure modes (Cloudflare, CAPTCHA) so operators trust the agent.",
    ],
  },
  {
    id: "email-marketing",
    name: "Beacon Email Marketing",
    repo: "https://github.com/Ya5h10/email_marketing",
    language: "TypeScript",
    stack: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "SMTP",
      "DKIM",
      "pnpm workspaces",
    ],
    tagline: "Self-hosted campaigns with open, click, and view-duration tracking",
    accent: "from-cyan-500 to-sky-600",
    index: "03",
    outcome: "Production-shaped email ops without paid analytics SaaS",
    questRole: "Track stage",
    description:
      "Beacon is a Node/TypeScript monorepo for multi-campaign email marketing: per-recipient open pixels with streaming estimated view duration, click redirects, one-click unsubscribe, a Postgres send queue (FOR UPDATE SKIP LOCKED), an SMTP worker with optional DKIM, and an operator dashboard for reach, opens, and clicks. Packages split hot-path tracker from API, worker, web, db, and shared types.",
    highlights: [
      "Hot-path tracker for opens, clicks, and unsubscribe",
      "Queue consumer renders and sends via SMTP with marketing headers",
      "Docker Compose for API, tracker, worker, web, Postgres, and Mailpit",
      "Deliverability docs covering SPF/DKIM/DMARC and bounce handling",
      "Clear metrics: unique opens, total opens, estimated view time",
    ],
    process: [
      "Separate the click/open hot path from campaign CRUD.",
      "Use SKIP LOCKED so multiple workers can drain sends safely.",
      "Document deliverability — agents that email without SPF/DKIM are dead on arrival.",
    ],
  },
  {
    id: "website-editor-for-hr",
    name: "Orbit Careers Builder",
    repo: "https://github.com/Ya5h10/website-editor-for-hr",
    language: "TypeScript",
    stack: ["Next.js", "Supabase", "Tailwind", "Zod", "react-hook-form"],
    tagline: "Mini-SaaS for branded careers pages",
    accent: "from-indigo-500 to-blue-500",
    index: "04",
    outcome: "Recruiters ship live hiring pages; jobseekers browse companies",
    questRole: "Ship stage (careers surface)",
    description:
      "Orbit lets recruiters log in with company slug + access code, design public hiring pages with reusable content blocks (hero, feature_split, values_grid, features), and manage open roles. Jobseekers browse a company directory and view live careers pages — backed by Supabase Postgres and Storage for logos and hero media.",
    highlights: [
      "Next.js App Router with TypeScript throughout",
      "Block editor with react-hook-form + Zod schema normalization",
      "Supabase auth session, page_configs, jobs table, and file storage",
      "Public company directory + filtered jobs on each careers page",
      "Preview + save draft flow for recruiters before going live",
    ],
    process: [
      "Polymorphic page blocks keep the editor extensible without schema chaos.",
      "Separate public render from authenticated edit routes.",
      "Validate block shapes on save so public pages never see half-empty grids.",
    ],
  },
  {
    id: "upscaler",
    name: "Serverless AI Image Upscaler",
    repo: "https://github.com/Ya5h10/upscaler",
    liveUrl: "https://upscaler.yashmakwana.com",
    language: "JavaScript",
    stack: ["Python", "Docker", "RunPod", "React", "Real-ESRGAN"],
    tagline: "GPU serverless image enhancement with a product frontend",
    accent: "from-blue-500 to-violet-500",
    index: "05",
    outcome: "Live product URL + cold starts under ~2 seconds",
    questRole: "Ship stage (AI product)",
    description:
      "Production-oriented image upscaler using Real-ESRGAN on RunPod Serverless GPUs, with a React product landing for the workflow. Async task queue handles concurrent users without dropping connections — the kind of agent-adjacent inference product that still needs a real URL for recruiters to click.",
    highlights: [
      "Real-ESRGAN inference on serverless GPUs",
      "Cold-start under 2 seconds with containerized inference",
      "Async task queue for concurrent users",
      "Live landing at upscaler.yashmakwana.com",
    ],
    process: [
      "Containerize the model once; let serverless GPUs scale the rest.",
      "Queue work so browser sessions survive inference latency.",
      "Ship a conversion-first landing — proof is a URL, not a notebook.",
    ],
  },
  {
    id: "gan",
    name: "Facial Frontalization GAN",
    repo: "https://github.com/Ya5h10/GAN",
    language: "Python",
    stack: ["PyTorch", "Pix2Pix", "CycleGAN", "CUDA"],
    tagline: "Generate frontal face views from profile images",
    accent: "from-slate-500 to-blue-600",
    index: "06",
    outcome: "Deep learning research applied to face recognition prep",
    questRole: "Model craft (offline training loop)",
    description:
      "A deep learning project implementing Pix2Pix and CycleGAN architectures to synthesize frontal face images from side-profile photos. Optimized preprocessing pipelines with CUDA multiprocessing for faster training on GPU hardware — useful preprocessing for recognition systems that expect frontal views.",
    highlights: [
      "Pix2Pix and CycleGAN model implementations",
      "CUDA-optimized data preprocessing pipeline (~10% preprocessing speedup noted in prior writeups)",
      "Useful for face recognition preprocessing",
      "Trained and evaluated on profile-to-frontal datasets",
    ],
    process: [
      "Start from established GAN recipes (Pix2Pix / CycleGAN), then optimize the data path.",
      "Treat preprocessing as part of the training loop, not a one-off script.",
      "Keep research repos readable so recruiters can open the notebook/code.",
    ],
  },
];
