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
  outcome: string;
  accent: string;
  index: string;
}

export const projects: Project[] = [
  {
    id: "hr-with-docker",
    name: "Autonomous AI Recruitment ERP",
    repo: "https://github.com/Ya5h10/hr-with-docker",
    language: "TypeScript",
    stack: ["Python", "Docker", "PostgreSQL", "Gemini 1.5", "TypeScript"],
    tagline: "End-to-end hiring automation that runs ~10× faster",
    accent: "from-sky-500 to-blue-600",
    index: "01",
    outcome: "Agentic pipeline from candidate ingest → ranking → outreach",
    description:
      "An HR automation platform containerized with Docker that streamlines recruitment — from LinkedIn/candidate aggregation to Gemini-powered resume ranking and autonomous personalized outreach. Built for high-throughput hiring pipelines with scalable backend services.",
    highlights: [
      "Scrapes and aggregates candidates into a unified hiring flow",
      "Gemini 1.5 Flash ranks resumes vs job descriptions (~90% relevance)",
      "Autonomous outreach agent for personalized InMail",
      "Dockerized architecture designed for production deployment",
    ],
  },
  {
    id: "ask-questions-about-websites",
    name: "AI Web Scraper",
    repo: "https://github.com/Ya5h10/Ask-questions-about-websites",
    language: "TypeScript",
    stack: ["Next.js", "Express", "BullMQ", "Playwright", "Gemini", "PostgreSQL"],
    tagline: "Ask questions about any website's layout and structure",
    accent: "from-violet-500 to-indigo-600",
    index: "02",
    outcome: "Tool-using AI over live page structure, not just chat",
    description:
      "A full-stack monorepo that scrapes websites with Playwright and uses Google Gemini to analyze UI design, hierarchy, and structure. Users ask natural-language questions about any page — powered by Turborepo with a Next.js frontend, Express + BullMQ job queue, and Drizzle ORM over PostgreSQL.",
    highlights: [
      "Turborepo monorepo with separate web, server, and db packages",
      "Async scraping pipeline via BullMQ workers",
      "Gemini AI for layout and design analysis",
      "Handles bot protection and rate limiting gracefully",
    ],
  },
  {
    id: "email-marketing",
    name: "Beacon Email Marketing",
    repo: "https://github.com/Ya5h10/email_marketing",
    language: "TypeScript",
    stack: ["Node.js", "TypeScript", "PostgreSQL", "Docker", "SMTP", "DKIM"],
    tagline: "Self-hosted campaigns with open, click, and view-duration tracking",
    accent: "from-cyan-500 to-sky-600",
    index: "03",
    outcome: "Production-shaped email ops without paid analytics SaaS",
    description:
      "Beacon is a Node/TypeScript monorepo for multi-campaign email marketing: per-recipient open pixels with streaming estimated view duration, click redirects, one-click unsubscribe, a Postgres send queue (FOR UPDATE SKIP LOCKED), SMTP worker with optional DKIM, and an operator dashboard for reach, opens, and clicks.",
    highlights: [
      "Hot-path tracker for opens, clicks, and unsubscribe",
      "Queue consumer renders and sends via SMTP with marketing headers",
      "Docker Compose for local API, tracker, worker, web, and Mailpit",
      "Deliverability docs covering SPF/DKIM/DMARC and bounce handling",
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
    description:
      "Orbit lets recruiters log in, design public hiring pages with reusable content blocks, and manage open roles. Jobseekers browse a company directory and view live careers pages — all backed by Supabase Postgres and Storage.",
    highlights: [
      "Next.js App Router with TypeScript throughout",
      "Drag-and-drop content block editor for recruiters",
      "Supabase auth, database, and file storage",
      "Public company directory for jobseekers",
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
    description:
      "Production-oriented image upscaler using Real-ESRGAN on RunPod Serverless GPUs, with a React product landing for the workflow. Async task queue handles concurrent users without dropping connections.",
    highlights: [
      "Real-ESRGAN inference on serverless GPUs",
      "Cold-start under 2 seconds with containerized inference",
      "Async task queue for concurrent users",
      "Live landing at upscaler.yashmakwana.com",
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
    description:
      "A deep learning project implementing Pix2Pix and CycleGAN architectures to synthesize frontal face images from side-profile photos. Optimized preprocessing pipelines with CUDA multiprocessing for faster training on GPU hardware.",
    highlights: [
      "Pix2Pix and CycleGAN model implementations",
      "CUDA-optimized data preprocessing pipeline",
      "Useful for face recognition preprocessing",
      "Trained and evaluated on profile-to-frontal datasets",
    ],
  },
];
