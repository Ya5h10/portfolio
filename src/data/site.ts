export const profile = {
  name: "Yash Makwana",
  githubHandle: "Ya5h10",
  githubUrl: "https://github.com/Ya5h10",
  linkedInLabel: "LinkedIn",
  email: "connect@yashmakwana.com",
  website: "https://yashmakwana.com",
  phone: "+91 9930955649",
  phoneHref: "tel:+919930955649",
  location: "Mumbai, India",
  timezone: "IST (UTC+5:30)",
  availability: "Open to remote roles worldwide",
  role: "Agentic AI Developer",
  headline:
    "I design and ship agentic systems — vision pipelines, RAG hiring platforms, and AI products that act under real constraints.",
  focus:
    "Remote-ready builder of agent loops, tool-using AI services, and full-stack delivery around them.",
  resumePath: "/AI_ML_resume.pdf",
  resumeLabel: "Download resume (PDF)",
  positioning: [
    "Agent loops over chat demos: tools, queues, webhooks, and human-in-the-loop handoffs.",
    "Hiring systems and edge vision are recurring domains — from resume RAG to CPU-only camera fleets.",
    "Comfortable owning the stack around the model: Docker, Redis, Postgres, and product UI.",
  ],
  education: {
    school: "DJ Sanghvi College of Engineering",
    location: "Mumbai, India",
    degree: "B.Tech in Electronics and Telecommunication; Honors in AI & Machine Learning",
    period: "2021 – 2025",
  },
};

export const experience = [
  {
    title: "AI Engineer",
    company: "SSIS India",
    period: "Dec 2025 – Present",
    location: "India",
    summary:
      "Resource-constrained computer vision at scale — live camera fleets, forensic synopsis, and scratch-built models on commodity edge hardware.",
    points: [
      "Engineered a distributed ingestion architecture for 11,000+ simultaneous live camera streams on CPU-only edge infrastructure with 16GB RAM — multithreaded decoding, active frame-skipping, and custom ring-buffer memory management to bypass thrashing.",
      "Built a forensic video synopsis pipeline that extracts moving objects and anomalies from multi-hour archives into condensed multi-object overlays, shrinking incident review time for enterprise investigations.",
      "Architected and trained custom PyTorch computer vision / behavioral models from scratch (including spatial-temporal heuristics such as hand-in-pocket tracking) with tailored geometric losses for real-time PPE and compliance inference.",
    ],
  },
  {
    title: "AI & Full Stack Engineer (Founding Team)",
    company: "Stratizic Consulting",
    period: "July 2025 – Dec 2025",
    location: "India",
    summary:
      "Founding engineer on a high-throughput AI resume analysis SaaS — serverless architecture, CI/CD, and type-safe full stack.",
    points: [
      "Spearheaded end-to-end architecture for an AI resume analysis platform: serverless design handling 500+ documents daily while cutting cloud costs by ~60% vs traditional EC2.",
      "Orchestrated CI/CD for Cloudflare Workers with robust error handling and logging, maintaining 99.9% uptime for enterprise clients.",
      "Built a type-safe Node.js/TypeScript backend with query and edge-caching optimizations that reduced API response times by 40%.",
      "Delivered a production SaaS that onboarded 9 corporate clients within 48 hours of launch.",
    ],
  },
];

export const skillGroups = [
  {
    label: "Core languages",
    story: "Primary languages from the resume — systems, agents, and product surfaces.",
    items: ["Python", "TypeScript", "JavaScript", "SQL (PostgreSQL)", "C++"],
  },
  {
    label: "AI & ML",
    story: "Custom models and agentic stacks, not only wrappers around off-the-shelf detectors.",
    items: [
      "PyTorch",
      "Custom architecture design",
      "Video synopsis",
      "Computer vision (OpenCV)",
      "YOLO-Pose",
      "LangChain",
      "RAG",
    ],
  },
  {
    label: "Systems & product",
    story: "Low-memory ingestion, realtime hiring dashboards, and shippable frontends.",
    items: [
      "Low-memory ingestion",
      "Multithreaded stream decoding",
      "Microservices",
      "Redis",
      "Socket.io",
      "Docker",
      "CI/CD",
      "React.js",
      "Tailwind CSS",
      "Vite",
      "PostgreSQL",
      "MongoDB",
      "Pinecone",
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
