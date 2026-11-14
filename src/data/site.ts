export const profile = {
  name: "Yash Makwana",
  githubHandle: "Ya5h10",
  githubUrl: "https://github.com/Ya5h10",
  email: "connect@yashmakwana.com",
  website: "https://yashmakwana.com",
  phone: "+91 9930955649",
  phoneHref: "tel:+919930955649",
  location: "Mumbai, India",
  timezone: "IST (UTC+5:30)",
  availability: "Open to remote roles worldwide",
  role: "Agentic AI Developer",
  headline:
    "I design and ship agentic systems — RAG pipelines, autonomous hiring workflows, and AI products that act, not just answer.",
  focus:
    "Remote-ready builder of agent loops, tool-using AI services, and full-stack delivery around them.",
  positioning: [
    "Agent loops over chat demos: tools, queues, webhooks, and human-in-the-loop handoffs.",
    "Hiring/recruitment systems are a recurring domain — from resume RAG to AI voice outreach.",
    "Comfortable owning the stack around the model: Docker, Postgres, workers, and product UI.",
  ],
};

export const experience = [
  {
    title: "Founding AI Engineer",
    company: "Stratizic Consulting",
    period: "Jul 2025 – Present",
    location: "Mumbai, India",
    summary:
      "Own agentic hiring infrastructure: high-throughput RAG over resumes, hybrid retrieval, and latency-sensitive delivery paths.",
    points: [
      "Architected a high-concurrency RAG-based Resume Analyzer handling 500+ documents/minute using Node.js and Redis queues.",
      "Reduced system latency by 40% via Cloudflare Workers & S3 presigned URLs.",
      "Implemented hybrid search with Pinecone, improving retrieval accuracy by 25%.",
    ],
  },
  {
    title: "Technical Staff Intern (Chief of Staff Office)",
    company: "PropelEdgeX",
    period: "Aug 2023 – May 2024",
    location: "Mumbai, India",
    summary:
      "Built internal tooling and data pipelines that shortened turnaround for modeling and strategy work.",
    points: [
      "Built internal ERP tools using React and Node.js, reducing project turnaround time by 30%.",
      "Optimized PostgreSQL queries, improving page load speeds by 40%.",
      "Led a cross-functional team of 3 to deploy data pipelines for modeling & strategy.",
    ],
  },
  {
    title: "Web Development Intern",
    company: "NavaMind (PropelEdgeX Subsidiary)",
    period: "Dec 2023 – May 2024",
    location: "Mumbai, India",
    summary:
      "Shipped the company site with performance as a first-class requirement.",
    points: [
      "Developed the official company website using React and Tailwind CSS.",
      "Optimized assets & lazy loading to achieve a 95+ score on Google Lighthouse.",
    ],
  },
];

export const skillGroups = [
  {
    label: "Agentic & AI",
    story:
      "Tool-using loops: scrape → queue → model → act (rank, call, email, or write back).",
    items: [
      "RAG & hybrid search",
      "Gemini / LLM tooling",
      "Vapi voice agents",
      "Autonomous outreach",
      "PyTorch / GANs",
      "Pinecone",
      "BullMQ workers",
      "OpenAI analysis hooks",
    ],
  },
  {
    label: "Full stack",
    story:
      "TypeScript end-to-end when possible — Next/React surfaces on Node APIs and Postgres.",
    items: [
      "TypeScript",
      "Next.js / React",
      "Node.js / Express",
      "PostgreSQL",
      "Supabase",
      "Drizzle ORM",
      "TanStack Query",
      "Tailwind CSS",
    ],
  },
  {
    label: "Ship & ops",
    story:
      "Compose the agent into something deployable: Docker, nginx, workers, and edge delivery.",
    items: [
      "Docker / Compose",
      "Nginx reverse proxy",
      "Cloudflare Workers",
      "AWS S3",
      "GCP",
      "Kubernetes",
      "Redis queues",
      "n8n automation",
    ],
  },
];

export const websites = [
  {
    name: "Delve Experiences",
    url: "https://delveexperiences.co/",
    type: "Business Website",
    blurb:
      "Experience-focused travel and storytelling website with a clean premium feel.",
  },
  {
    name: "Highest Praise Church",
    url: "https://www.highestpraisechurch.org/",
    type: "Community / Church Website",
    blurb:
      "Faith community website designed for clear communication and accessibility.",
  },
  {
    name: "AI Image Upscaler",
    url: "https://upscaler.yashmakwana.com",
    type: "AI Product Landing",
    blurb:
      "Product-focused frontend for an AI upscaling workflow with conversion-first UX.",
  },
];

/** Interactive quest nodes — each maps to real proof already on the site / GitHub */
export const questNodes = [
  {
    id: "ingest",
    step: "01",
    title: "Ingest",
    subtitle: "Pull candidates & pages",
    xp: 20,
    color: "sky",
    projectId: "ask-questions-about-websites",
    prompt: "An agent needs raw signal. How do you gather it?",
    choiceLabel: "Scrape + queue the page",
    reveal:
      "Playwright workers (BullMQ) extract simplified HTML, then Gemini answers layout questions — a tool loop, not a chatbot.",
  },
  {
    id: "rank",
    step: "02",
    title: "Rank",
    subtitle: "Score fit with RAG / LLMs",
    xp: 25,
    color: "indigo",
    projectId: "hr-with-docker",
    prompt: "Too many resumes. What should the agent do next?",
    choiceLabel: "Match resumes to the JD",
    reveal:
      "Scoutly + Stratizic-style pipelines: parse resumes, compute match scores, and surface ranked candidates for humans.",
  },
  {
    id: "call",
    step: "03",
    title: "Call",
    subtitle: "Voice agent outreach",
    xp: 30,
    color: "violet",
    projectId: "hr-with-docker",
    prompt: "A strong match appears. Act without waiting on a dialer UI?",
    choiceLabel: "Launch a Vapi recruiter call",
    reveal:
      "Scoutly’s AI calling path uses Vapi assistants, dynamic job/candidate variables, webhooks for transcripts, and OpenAI-assisted call analysis.",
  },
  {
    id: "track",
    step: "04",
    title: "Track",
    subtitle: "Measure opens & engagement",
    xp: 20,
    color: "cyan",
    projectId: "email-marketing",
    prompt: "Outreach went out. How do you know it worked?",
    choiceLabel: "Instrument opens & clicks",
    reveal:
      "Beacon’s tracker serves streaming open pixels, click redirects, and unsubscribe — with a Postgres send queue and operator dashboard.",
  },
  {
    id: "ship",
    step: "05",
    title: "Ship",
    subtitle: "Careers pages & GPU products",
    xp: 25,
    color: "blue",
    projectId: "website-editor-for-hr",
    prompt: "Candidates need a public surface. What do you ship?",
    choiceLabel: "Publish careers + live AI product",
    reveal:
      "Orbit builds branded careers pages on Supabase; the upscaler product lands Real-ESRGAN inference on RunPod with a live URL.",
  },
] as const;
