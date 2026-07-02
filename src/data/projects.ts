export interface Project {
  id: string;
  name: string;
  repo: string;
  language: string;
  stack: string[];
  tagline: string;
  description: string;
  highlights: string[];
  accent: string;
  index: string;
}

export const projects: Project[] = [
  {
    id: "ask-questions-about-websites",
    name: "AI Web Scraper",
    repo: "https://github.com/Ya5h10/Ask-questions-about-websites",
    language: "TypeScript",
    stack: ["Next.js", "Express", "BullMQ", "Playwright", "Gemini", "PostgreSQL"],
    tagline: "Ask questions about any website's layout and structure",
    accent: "from-violet-500 to-purple-600",
    index: "01",
    description:
      "A full-stack monorepo that scrapes websites with Playwright and uses Google Gemini to analyze UI design, hierarchy, and structure. Users can ask natural-language questions about any page — powered by a Turborepo setup with a Next.js frontend, Express + BullMQ job queue on the backend, and Drizzle ORM over PostgreSQL.",
    highlights: [
      "Turborepo monorepo with separate web, server, and db packages",
      "Async scraping pipeline via BullMQ workers",
      "Gemini AI for layout and design analysis",
      "Handles bot protection and rate limiting gracefully",
    ],
  },
  {
    id: "hr-with-docker",
    name: "HR Automation Platform",
    repo: "https://github.com/Ya5h10/hr-with-docker",
    language: "TypeScript",
    stack: ["TypeScript", "Docker", "PostgreSQL", "Gemini"],
    tagline: "End-to-end hiring automation that runs 10× faster",
    accent: "from-blue-500 to-cyan-500",
    index: "02",
    description:
      "An HR automation application containerized with Docker that streamlines recruitment workflows — from candidate ingestion to AI-powered resume ranking. Built to handle high-throughput hiring pipelines with scalable backend services.",
    highlights: [
      "Dockerized microservices architecture",
      "AI-powered resume vs. job-description matching",
      "Designed for production deployment at scale",
      "Reduces manual HR process time significantly",
    ],
  },
  {
    id: "website-editor-for-hr",
    name: "Orbit Careers Builder",
    repo: "https://github.com/Ya5h10/website-editor-for-hr",
    language: "TypeScript",
    stack: ["Next.js", "Supabase", "Tailwind", "Zod", "react-hook-form"],
    tagline: "Mini-SaaS for branded careers pages",
    accent: "from-indigo-500 to-blue-600",
    index: "03",
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
    id: "gan",
    name: "Facial Frontalization GAN",
    repo: "https://github.com/Ya5h10/GAN",
    language: "Python",
    stack: ["PyTorch", "Pix2Pix", "CycleGAN", "CUDA"],
    tagline: "Generate frontal face views from profile images",
    accent: "from-amber-500 to-orange-500",
    index: "04",
    description:
      "A deep learning project implementing Pix2Pix and CycleGAN architectures to synthesize frontal face images from side-profile photos. Optimized preprocessing pipelines with CUDA multiprocessing for faster training on GPU hardware.",
    highlights: [
      "Pix2Pix and CycleGAN model implementations",
      "CUDA-optimized data preprocessing pipeline",
      "Useful for face recognition preprocessing",
      "Trained and evaluated on profile-to-frontal datasets",
    ],
  },
  {
    id: "email-track",
    name: "Email Track",
    repo: "https://github.com/Ya5h10/Email-track",
    language: "JavaScript",
    stack: ["Node.js", "Email APIs", "Analytics"],
    tagline: "Free email campaign open & reply tracking",
    accent: "from-emerald-500 to-teal-500",
    index: "05",
    description:
      "A lightweight tool that gives you visibility into email campaigns — track who opens your emails, who replies, and engagement metrics without paying for expensive SaaS analytics platforms.",
    highlights: [
      "Open and reply tracking for outbound campaigns",
      "No paid third-party analytics required",
      "Simple integration for outreach workflows",
      "Useful for recruitment and sales pipelines",
    ],
  },
  {
    id: "whatsapp-bot",
    name: "WhatsApp Business Bot",
    repo: "https://github.com/Ya5h10/Whatsapp-bot",
    language: "n8n",
    stack: ["n8n", "WhatsApp Business API", "Workflow Automation"],
    tagline: "Automated WhatsApp chatbot via n8n workflows",
    accent: "from-green-500 to-lime-500",
    index: "06",
    description:
      "An n8n workflow deployment that integrates with WhatsApp Business API to handle automated customer and candidate conversations. Enables scalable messaging without building a custom bot infrastructure from scratch.",
    highlights: [
      "n8n visual workflow automation",
      "WhatsApp Business API integration",
      "Deployable without custom server code",
      "Handles inbound and outbound message flows",
    ],
  },
];
