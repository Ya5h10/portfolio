import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react";
import { projects, type Project } from "../data/projects";
import { profile } from "../data/site";

const panelTransition = { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] as const };

function ProjectRow({
  project,
  isSelected,
  onClick,
}: {
  project: Project;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full rounded-2xl border px-4 py-5 text-left transition-[background,border-color,box-shadow,transform] duration-200 sm:px-5 sm:py-6 ${
        isSelected
          ? "border-sky-300/80 bg-white shadow-lg shadow-sky-100/80"
          : "border-transparent bg-white/40 hover:border-slate-200 hover:bg-white/80 active:scale-[0.995]"
      }`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`font-display text-sm font-bold tabular-nums ${
            isSelected ? "text-sky-700" : "text-slate-400"
          }`}
        >
          {project.index}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="font-display text-lg leading-snug font-bold text-slate-900 sm:text-xl">
              {project.name}
            </h3>
            <span className="text-xs font-medium tracking-wide text-slate-400 uppercase">
              {project.language}
            </span>
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-[15px]">
            {project.tagline}
          </p>
          <p className="mt-3 text-sm leading-6 font-medium text-indigo-700">
            {project.outcome}
          </p>
          <p className="mt-2 text-xs font-medium tracking-wide text-slate-400 uppercase">
            {project.year}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-slate-50 px-2.5 py-1 text-[11px] text-slate-500"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <ArrowUpRight
          size={18}
          className={`mt-1 shrink-0 transition-colors ${
            isSelected ? "text-sky-600" : "text-slate-300 group-hover:text-slate-500"
          }`}
        />
      </div>
    </button>
  );
}

function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
      <div
        className={`relative bg-linear-to-br ${project.accent} px-5 pt-7 pb-6 sm:px-7 sm:pt-8 sm:pb-7`}
      >
        <div className="absolute inset-0 bg-slate-950/10" />
        <div className="relative flex items-start justify-between gap-4">
          <div className="pr-2">
            <span className="font-mono text-sm text-white/70">{project.index}</span>
            <h3 className="font-display mt-2 text-2xl leading-snug font-bold text-white sm:text-3xl">
              {project.name}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/85">
              {project.tagline}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl bg-white/20 p-2.5 text-white transition-colors hover:bg-white/30 active:scale-95"
            aria-label="Close project details"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto p-5 sm:space-y-9 sm:p-7">
        <p className="text-[15px] leading-8 text-slate-600">{project.description}</p>

        <div>
          <h4 className="mb-4 text-[11px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
            What I built
          </h4>
          <ul className="space-y-3.5">
            {project.highlights.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-sm leading-7 text-slate-600"
              >
                <span
                  className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-linear-to-br ${project.accent}`}
                />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[11px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
            How I approached it
          </h4>
          <ol className="space-y-3.5">
            {project.process.map((step, i) => (
              <li
                key={step}
                className="flex gap-3 text-sm leading-7 text-slate-600"
              >
                <span className="font-display shrink-0 text-xs font-bold text-sky-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h4 className="mb-4 text-[11px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
            Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-slate-100 bg-slate-50/60 px-5 py-5 sm:px-7">
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            <Github size={16} />
            View on GitHub
            <ArrowUpRight size={14} className="opacity-80" />
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 transition-colors hover:border-slate-300 active:scale-[0.98]"
          >
            <ExternalLink size={15} />
            Live demo
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(projects[0]);

  const handleSelect = (project: Project) => {
    const isMobile = window.innerWidth < 768;
    if (selected?.id === project.id && isMobile) {
      setSelected(null);
      return;
    }
    setSelected(project);
    if (isMobile) {
      const section = document.getElementById("work");
      if (section) {
        const y = section.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <section id="work" className="relative scroll-mt-28 px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-sky-700 uppercase">
              Selected work
            </p>
            <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl md:leading-[1.15]">
              Proof of agentic systems in the wild
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg sm:leading-8">
              Projects aligned with the resume — problem, process, stack, and
              ownership. Tap for depth; GitHub and live demos one click away.
            </p>
          </div>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-[box-shadow,border-color] hover:border-slate-300 hover:shadow-md"
          >
            <Github size={17} />
            {profile.githubHandle}
            <ArrowUpRight size={14} className="text-slate-400" />
          </a>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="space-y-3 rounded-3xl border border-slate-200/70 bg-white/50 p-3 shadow-sm shadow-slate-200/40 backdrop-blur-sm sm:space-y-3.5 sm:p-4"
          >
            {projects.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                isSelected={selected?.id === project.id}
                onClick={() => handleSelect(project)}
              />
            ))}
          </motion.div>

          <div className="hidden min-h-[540px] lg:block">
            <AnimatePresence mode="wait">
              {selected && (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={panelTransition}
                  className="sticky top-28 h-[min(720px,calc(100vh-8rem))]"
                >
                  <ProjectDetail
                    project={selected}
                    onClose={() => setSelected(null)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              key={`mobile-${selected.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={panelTransition}
              className="mt-6 lg:hidden"
            >
              <ProjectDetail
                project={selected}
                onClose={() => setSelected(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
