
import { useState } from "react";
import { motion } from "motion/react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaAws,
  FaDocker,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiTensorflow,
  SiPytorch,
  SiNextdotjs,
  SiTailwindcss,
  SiC,
  SiCplusplus,
  SiKubernetes,
  SiJenkins,
  SiGooglecloud,
  SiPandas
} from "react-icons/si";

export default function About() {
  const [active, setActive] = useState<"Skills" | "Experience" | "Projects">(
    "Skills"
  );

  const skillIcons = [
    { name: "React", icon: <FaReact className="text-3xl sm:text-4xl" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-3xl sm:text-4xl" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-3xl sm:text-4xl" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-3xl sm:text-4xl" /> },
    { name: "Python", icon: <FaPython className="text-3xl sm:text-4xl" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-3xl sm:text-4xl" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-3xl sm:text-4xl" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-3xl sm:text-4xl" /> },
    { name: "TensorFlow", icon: <SiTensorflow className="text-3xl sm:text-4xl" /> },
    { name: "PyTorch", icon: <SiPytorch className="text-3xl sm:text-4xl" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-3xl sm:text-4xl" /> },
    { name: "Docker", icon: <FaDocker className="text-3xl sm:text-4xl" /> },
    { name: "AWS", icon: <FaAws className="text-3xl sm:text-4xl" /> },
    { name: "Git", icon: <FaGitAlt className="text-3xl sm:text-4xl" /> },
    { name: "C++", icon: <SiCplusplus className="text-3xl sm:text-4xl"/> },
    { name: "Kubernetus", icon: <SiKubernetes className="text-3xl sm:text-4xl"/> },
    { name: "C", icon: <SiC className="text-3xl sm:text-4xl"/> },
    { name: "Jenkins", icon: <SiJenkins className="text-3xl sm:text-4xl"/> },
    { name: "GCP", icon: <SiGooglecloud className="text-3xl sm:text-4xl"/> },
    { name: "Pandas", icon: <SiPandas className="text-3xl sm:text-4xl"/> },
  ];

  const experience = [
    {
      title: "Founding AI Engineer",
      company: "Stratizic Consulting",
      period: "Jul 2025 – Present · Mumbai, India",
      points: [
        "Architected a high-concurrency RAG-based Resume Analyzer handling 500+ documents/minute using Node.js and Redis queues.",
        "Reduced system latency by 40% via Cloudflare Workers & S3 presigned URLs.",
        "Implemented hybrid search with Pinecone, improving retrieval accuracy by 25%.",
      ],
    },
    {
      title: "Technical Staff Intern (Chief of Staff Office)",
      company: "PropelEdgeX",
      period: "Aug 2023 – May 2024 · Mumbai, India",
      points: [
        "Built internal ERP tools using React and Node.js, reducing project turnaround time by 30%.",
        "Optimized PostgreSQL queries, improving page load speeds by 40%.",
        "Led a cross-functional team of 3 to deploy data pipelines for modeling & strategy.",
      ],
    },
    {
      title: "Web Development Intern",
      company: "NavaMind (PropelEdgeX Subsidiary)",
      period: "Dec 2023 – May 2024 · Mumbai, India",
      points: [
        "Developed the official company website using React and Tailwind CSS.",
        "Optimized assets & lazy loading to achieve a 95+ score on Google Lighthouse.",
      ],
    },
  ];

  const projects = [
    {
      name: "Autonomous AI Recruitment ERP",
      stack: "Python · Docker · Postgres · Gemini 1.5",
      details: [
        "End-to-end hiring platform that scrapes LinkedIn & aggregates candidates.",
        "Uses Gemini 1.5 Flash to rank resumes vs JDs with ~90% relevance.",
        "Includes an autonomous outreach agent for personalized InMail.",
      ],
    },
    {
      name: "Serverless AI Image Upscaler",
      stack: "Python · Docker · RunPod · React",
      details: [
        "Production-grade image upscaler using Real-ESRGAN on RunPod Serverless GPUs.",
        "Cold-start under 2 seconds with containerized inference.",
        "Async task queue for handling concurrent users without dropping connections.",
      ],
    },
    {
      name: "Facial Frontalization with GANs",
      stack: "PyTorch · CUDA · NVIDIA H100",
      details: [
        "Implemented Pix2Pix and CycleGAN for frontal views from profile images.",
        "Optimized pipelines with CUDA multiprocessing for ~10% preprocessing speedup.",
      ],
    },
  ];

  return (
    <section
      id="About"
      className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden"
    >
      {/* Top gradient bar */}
      <div className="h-8 w-screen bg-linear-to-b from-gray-200 via-blue-700 to-gray-950" />

          <div className="relative flex w-full bg-gray-950 items-center justify-center p-3 sm:p-6 min-h-[85vh]" data-nav-theme="dark">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full sm:w-[90%] max-w-5xl min-h-[70vh] rounded-2xl bg-gray-900/70 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
              >
                {/* Title bar */}
            <div className="flex items-center px-4 py-2 bg-gray-800/70 border-b border-white/10">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="mx-auto text-xs sm:text-sm text-gray-300 font-medium pr-10">
                {active}
              </div>
            </div>
            

            {/* Body: sidebar + main */}
            <div className="flex flex-col sm:flex-row flex-1 min-h-0">
              {/* Sidebar */}
              <aside className="w-full sm:w-[23%] bg-gray-900/60 sm:border-r border-b sm:border-b-0 border-white/10 p-3 sm:p-4 text-gray-300">
                <p className="text-[11px] uppercase tracking-[0.12em] text-gray-400 mb-2">
                  Favourites
                </p>
                <div className="flex sm:block gap-2 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
                {["Skills", "Experience", "Projects"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setActive(item as any)}
                    className={`w-auto sm:w-full whitespace-nowrap text-left px-3 py-2 rounded-md text-sm mb-0 sm:mb-1 transition-all
                      ${
                        active === item
                          ? "bg-blue-500 text-white shadow-sm"
                          : "hover:bg-gray-800"
                      }`}
                  >
                    {item}
                  </button>
                ))}
                </div>
              </aside>

              {/* Main view */}
              <main className="flex-1 p-4 sm:p-6 overflow-y-auto text-gray-100">
                {active === "Skills" && (
                  <>
                    {/* Icon view toolbar feel */}
                    <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
                      <span>Icon View</span>
                      <span>{skillIcons.length} items</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-6 place-items-center">
                      {skillIcons.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex flex-col items-center justify-center gap-2"
                        >
                          <div className="rounded-xl bg-gray-800/70 border border-white/10 px-4 py-4 shadow-md hover:bg-gray-700/80 transition">
                            {skill.icon}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-200 text-center">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {active === "Experience" && (
                  <div className="space-y-4 text-left">
                    {experience.map((job) => (
                      <div
                        key={job.title}
                        className="bg-gray-800/60 border border-white/10 rounded-xl p-4 sm:p-5"
                      >
                        <h3 className="text-sm sm:text-base font-semibold">
                          {job.title} ·{" "}
                          <span className="text-blue-300">{job.company}</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400 mb-2">
                          {job.period}
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-200">
                          {job.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {active === "Projects" && (
                  <div className="space-y-4">
                    {projects.map((proj) => (
                      <div
                        key={proj.name}
                        className="bg-gray-800/60 border border-white/10 rounded-xl p-4 sm:p-5"
                      >
                        <h3 className="text-sm sm:text-base font-semibold mb-1">
                          {proj.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-blue-300 mb-2">
                          {proj.stack}
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-200 text-left">
                          {proj.details.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </main>
            </div>
          </motion.div>
      </div>
    <div className="h-8 w-screen bg-linear-to-b from-gray-950 via-blue-700 to-gray-50" />
    </section>
  );
}
