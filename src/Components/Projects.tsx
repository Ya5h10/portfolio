import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, X } from "lucide-react";
import { projects, type Project } from "../data/projects";

const panelTransition = { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] as const };

function ProjectCard({
  project,
  isSelected,
  onClick,
  listMode,
}: {
  project: Project;
  isSelected: boolean;
  onClick: () => void;
  listMode: boolean;
}) {
  if (listMode) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`group relative w-full text-left px-4 py-3.5 rounded-xl
          ${
            isSelected
              ? "bg-white shadow-md shadow-gray-200/80"
              : "hover:bg-white/60"
          }`}
      >
        {isSelected && (
          <div
            className={`absolute left-0 top-2 bottom-2 w-1 rounded-full bg-linear-to-b ${project.accent}`}
          />
        )}
        <div className="flex items-center gap-3 pl-2">
          <span
            className={`text-xs font-mono tabular-nums ${
              isSelected ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {project.index}
          </span>
          <div className="min-w-0">
            <p
              className={`text-sm font-semibold truncate ${
                isSelected ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"
              }`}
            >
              {project.name}
            </p>
            <p className="text-xs text-gray-400 truncate">{project.language}</p>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full h-full flex flex-col text-left rounded-2xl bg-white border border-gray-200/80
        shadow-sm shadow-gray-200/50 overflow-hidden
        hover:shadow-lg hover:border-gray-300/80
        transition-[box-shadow,border-color] duration-200"
    >
      <div className={`shrink-0 h-1 w-full bg-linear-to-r ${project.accent}`} />
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-4 h-10 mb-4">
          <span
            className={`text-3xl font-bold leading-none select-none bg-clip-text text-transparent bg-linear-to-br ${project.accent} opacity-40 group-hover:opacity-60 transition-opacity duration-200`}
          >
            {project.index}
          </span>
          <span className="text-[11px] uppercase tracking-widest text-gray-400 font-medium px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 shrink-0">
            {project.language}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1.5 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-700 transition-colors duration-200">
          {project.name}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 min-h-[2.75rem] mb-5">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-1.5 min-h-[1.625rem]">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2 py-0.5 rounded-md bg-gray-50 text-gray-500 border border-gray-100"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5 flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-blue-600 transition-colors duration-200">
          View details
          <ArrowUpRight size={14} />
        </div>
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
    <div className="h-full flex flex-col rounded-2xl bg-white border border-gray-200/80 shadow-xl shadow-gray-300/30 overflow-hidden">
      <div className={`relative px-5 md:px-8 pt-6 md:pt-8 pb-5 md:pb-6 bg-linear-to-br ${project.accent}`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative flex items-start justify-between">
          <div className="text-left pr-4">
            <span className="text-white/60 text-sm font-mono">{project.index}</span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">
              {project.name}
            </h3>
            <p className="text-white/80 text-sm mt-1.5 max-w-md">{project.tagline}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 md:p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors duration-200 shrink-0"
            aria-label="Close project details"
          >
            <X size={24} className="md:w-[18px] md:h-[18px]" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 md:p-8 text-left space-y-6 md:space-y-8">
        <p className="text-gray-600 leading-relaxed text-[15px]">
          {project.description}
        </p>

        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-semibold mb-4">
              Key Highlights
            </h4>
            <ul className="space-y-3">
              {project.highlights.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                  <span
                    className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-linear-to-br ${project.accent}`}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-semibold mb-4">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 border border-gray-100 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-8 py-4 md:py-5 border-t border-gray-100 bg-gray-50/50">
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl
            bg-linear-to-br from-purple-900 via-purple-600 to-purple-400
            text-white text-sm font-medium shadow-lg shadow-purple-500/20
            hover:opacity-90 transition-opacity duration-200"
        >
          <Github size={16} />
          View on GitHub
          <ArrowUpRight size={14} className="opacity-80" />
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  const handleSelect = (project: Project) => {
    const isMobile = window.innerWidth < 768;
    
    if (selected?.id === project.id) {
      setSelected(null);
    } else {
      setSelected(project);
      if (isMobile) {
        // Scroll to the projects section on mobile so the detail view is visible
        const section = document.getElementById("projects");
        if (section) {
          const yOffset = section.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: yOffset, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <section
      id="projects"
      className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gray-50" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(209 213 219) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-10 sm:mb-16 text-left"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-medium mb-3">
              Open Source
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Selected Projects
            </h2>
            <p className="text-gray-500 mt-3 text-base sm:text-lg max-w-lg leading-relaxed">
              Hand-picked from my GitHub. Select a project to read more.
            </p>
          </div>
          <a
            href="https://github.com/Ya5h10"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl
              bg-white border border-gray-200 text-gray-700 text-sm font-medium
              shadow-sm hover:shadow-md hover:border-gray-300 transition-[box-shadow,border-color] duration-200 shrink-0"
          >
            <Github size={18} />
            Ya5h10
            <ArrowUpRight size={14} className="text-gray-400" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className={`rounded-3xl border border-gray-200/80 bg-white/90 shadow-2xl shadow-gray-300/20 overflow-hidden
            transition-[padding] duration-300 ease-out
            ${selected ? "hidden md:block p-3 md:p-4" : "block p-4 sm:p-6 md:p-8"}`}
        >
          <div className="flex gap-4 md:gap-6 items-start">
            <div
              className={`shrink-0 transition-[width] duration-300 ease-out ${
                selected ? "w-full md:w-[38%]" : "w-full"
              }`}
            >
              <div
                key={selected ? "list" : "grid"}
                className={`grid gap-3 items-stretch ${
                  selected
                    ? "grid-cols-1"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={selected ? undefined : "min-h-[280px]"}
                  >
                    <ProjectCard
                      project={project}
                      isSelected={selected?.id === project.id}
                      listMode={!!selected}
                      onClick={() => handleSelect(project)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {selected && (
                <motion.div
                  key="detail-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={panelTransition}
                  className="hidden md:block flex-1 sticky top-24 min-h-[520px] max-h-[calc(100vh-7rem)]"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selected.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="h-full"
                    >
                      <ProjectDetail
                        project={selected}
                        onClose={() => setSelected(null)}
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence>
          {selected && (
            <motion.div
              key="mobile-detail"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={panelTransition}
              className="md:hidden mt-4"
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
