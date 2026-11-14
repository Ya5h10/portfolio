export interface Project {
  id: string;
  name: string;
  repo?: string;
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
  year: string;
}

export const projects: Project[] = [
  {
    id: "recruitment-erp",
    name: "Autonomous AI Recruitment ERP",
    repo: "https://github.com/Ya5h10/hr-with-docker",
    language: "TypeScript",
    year: "2025",
    stack: ["React", "Redis", "Socket.io", "Gemini 2.5"],
    tagline: "Live hiring dashboard with Gemini ranking and autonomous outreach",
    accent: "from-sky-500 to-blue-600",
    index: "01",
    outcome: "90% resume–JD relevance match with realtime recruiter feeds",
    description:
      "Full-stack hiring platform with a realtime dashboard (Socket.io + Redis) so recruiters see live scraping feeds and candidate ranking status without reloads. Gemini 2.5 Flash semantically ranks resumes against JDs (~90% relevance) while autonomous background agents handle outreach. Scraping aggregates LinkedIn candidates with Redis session caching for high-concurrency pipelines.",
    highlights: [
      "Realtime dashboard via Socket.io and Redis — live scraping + ranking status",
      "Gemini 2.5 Flash semantic resume-vs-JD ranking at ~90% relevance",
      "Autonomous background agents for outreach automation",
      "LinkedIn candidate aggregation with Redis-backed session/caching concurrency",
    ],
    process: [
      "Push live state to recruiters instead of polling-heavy UIs.",
      "Separate ranking/outreach agents from the interactive dashboard path.",
      "Cache scrape sessions in Redis so concurrency does not melt the pipeline.",
    ],
  },
  {
    id: "gan",
    name: "Frontal Face Generation Using GAN",
    repo: "https://github.com/Ya5h10/GAN",
    language: "Python",
    year: "2025",
    stack: ["PyTorch", "CUDA", "Computer Vision"],
    tagline: "Pix2Pix & CycleGAN frontalization on CelebA-HQ",
    accent: "from-slate-500 to-blue-600",
    index: "02",
    outcome: "30,000+ images; ~10% throughput gain on NVIDIA H100 training",
    description:
      "GAN pipeline (Pix2Pix & CycleGAN) processing over 30,000 images from CelebA-HQ. Training loops optimized on NVIDIA H100 GPUs with multiprocessing and mixed-precision training to increase throughput by 10%.",
    highlights: [
      "Pix2Pix and CycleGAN frontalization pipeline",
      "30,000+ CelebA-HQ images processed",
      "H100 training with multiprocessing + mixed precision (~10% throughput)",
    ],
    process: [
      "Start from established GAN recipes, then optimize the data/training path.",
      "Use mixed precision and multiprocessing where the GPU would otherwise wait.",
    ],
  },
  {
    id: "upscaler",
    name: "AI Image Upscaler SaaS",
    repo: "https://github.com/Ya5h10/upscaler",
    liveUrl: "https://upscaler.yashmakwana.com",
    language: "JavaScript",
    year: "2025",
    stack: ["Python", "Docker", "React.js", "RunPod"],
    tagline: "Real-ESRGAN on serverless GPUs with a product frontend",
    accent: "from-blue-500 to-violet-500",
    index: "03",
    outcome: "Sub-3 second inference for 4× upscaling",
    description:
      "Scalable image enhancement service using Real-ESRGAN. Inference engine containerized with Docker and deployed on RunPod serverless GPUs, achieving sub-3 second inference for 4× upscaling, with a React product surface.",
    highlights: [
      "Real-ESRGAN inference containerized with Docker",
      "RunPod serverless GPU deployment",
      "Sub-3 second inference for 4× upscaling",
      "Live product URL at upscaler.yashmakwana.com",
    ],
    process: [
      "Containerize the model once; let serverless GPUs scale the rest.",
      "Ship a URL recruiters can open — proof beats a notebook.",
    ],
  },
  {
    id: "whatsapp-agent",
    name: "Voice-Interactive WhatsApp Agent",
    repo: "https://github.com/Ya5h10/Whatsapp-bot",
    language: "n8n",
    year: "2025",
    stack: ["n8n", "GPT-4", "Whisper API"],
    tagline: "Realtime conversational agent without a traditional server backend",
    accent: "from-violet-500 to-indigo-600",
    index: "04",
    outcome: "Fault-tolerant webhook workflows at scale via n8n",
    description:
      "Realtime conversational agent integrating Whisper and GPT-4. Fault-tolerant n8n workflows handle webhook events at scale without a traditional server backend.",
    highlights: [
      "Whisper + GPT-4 voice/text conversational loop",
      "n8n workflows for webhook-driven scale",
      "No traditional always-on server backend required",
    ],
    process: [
      "Prefer durable workflow graphs for webhook agents.",
      "Keep STT (Whisper) and reasoning (GPT-4) as composable steps.",
    ],
  },
];
