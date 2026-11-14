import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { questNodes } from "../data/site";
import { projects } from "../data/projects";

type NodeId = (typeof questNodes)[number]["id"];

const colorMap: Record<string, string> = {
  sky: "from-sky-500 to-blue-600",
  indigo: "from-indigo-500 to-violet-600",
  violet: "from-violet-500 to-fuchsia-600",
  cyan: "from-cyan-500 to-sky-600",
  blue: "from-blue-500 to-indigo-600",
};

export default function AgentQuest() {
  const [activeId, setActiveId] = useState<NodeId>(questNodes[0].id);
  const [unlocked, setUnlocked] = useState<NodeId[]>([]);
  const [log, setLog] = useState<string[]>([
    "Mission brief: run an agentic hiring loop. Tap each stage — content below stays readable either way.",
  ]);

  const active = questNodes.find((n) => n.id === activeId) ?? questNodes[0];
  const linkedProject = projects.find((p) => p.id === active.projectId);

  const xp = useMemo(
    () =>
      questNodes
        .filter((n) => unlocked.includes(n.id))
        .reduce((sum, n) => sum + n.xp, 0),
    [unlocked],
  );
  const maxXp = questNodes.reduce((sum, n) => sum + n.xp, 0);
  const complete = unlocked.length === questNodes.length;
  const progress = Math.round((unlocked.length / questNodes.length) * 100);

  const runStage = (id: NodeId) => {
    const node = questNodes.find((n) => n.id === id);
    if (!node) return;
    setActiveId(id);
    setUnlocked((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setLog((prev) => [
      `▸ ${node.title}: ${node.choiceLabel}`,
      node.reveal,
      ...prev.slice(0, 4),
    ]);
  };

  const reset = () => {
    setUnlocked([]);
    setActiveId(questNodes[0].id);
    setLog([
      "Loop reset. Stages cleared — projects and experience below are unchanged.",
    ]);
  };

  return (
    <section id="quest" className="relative scroll-mt-28 px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-14 max-w-2xl sm:mb-16"
        >
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-sky-700 uppercase">
            Playable proof
          </p>
          <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl md:leading-[1.15]">
            Agent Loop Quest
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg sm:leading-8">
            A short recruitment mission. Tap stages to run the loop and unlock
            real project proof. Skip anytime — the full Work section below stays
            scannable without playing.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/75 p-6 shadow-lg shadow-slate-200/40 backdrop-blur-sm sm:p-9">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">
                  Mission XP
                </p>
                <p className="font-display mt-2 text-3xl font-bold text-slate-900">
                  {xp}
                  <span className="text-lg font-semibold text-slate-400">
                    {" "}
                    / {maxXp}
                  </span>
                </p>
              </div>
              <div className="min-w-[10rem] flex-1 sm:max-w-xs">
                <div className="mb-2 flex justify-between text-xs font-medium text-slate-500">
                  <span>Loop progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    className="h-full rounded-full bg-linear-to-r from-sky-500 to-violet-500"
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 active:scale-[0.98]"
              >
                <RotateCcw size={14} />
                Reset
              </button>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute top-[1.65rem] right-6 left-6 hidden h-0.5 bg-linear-to-r from-sky-200 via-violet-200 to-blue-200 sm:block" />
              <ol className="grid grid-cols-2 gap-5 sm:grid-cols-5 sm:gap-4">
                {questNodes.map((node, index) => {
                  const isActive = node.id === activeId;
                  const isUnlocked = unlocked.includes(node.id);
                  return (
                    <li key={node.id}>
                      <motion.button
                        type="button"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => runStage(node.id)}
                        className={`relative w-full rounded-2xl border px-3.5 py-5 text-left transition-[box-shadow,border-color,background] ${
                          isActive
                            ? "border-sky-300 bg-white shadow-md shadow-sky-100"
                            : isUnlocked
                              ? "border-violet-200 bg-violet-50/60"
                              : "border-slate-200 bg-slate-50/80"
                        }`}
                      >
                        <span
                          className={`mb-4 flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white bg-linear-to-br ${colorMap[node.color]}`}
                        >
                          {node.step}
                        </span>
                        <p className="font-display text-sm leading-snug font-bold text-slate-900">
                          {node.title}
                        </p>
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {node.subtitle}
                        </p>
                        {isUnlocked && (
                          <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-violet-700">
                            <Sparkles size={11} /> +{node.xp} XP
                          </span>
                        )}
                        {index < questNodes.length - 1 && (
                          <ArrowRight
                            size={14}
                            className="absolute -right-2 top-6 hidden text-slate-300 sm:block lg:hidden xl:block"
                          />
                        )}
                      </motion.button>
                    </li>
                  );
                })}
              </ol>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="mt-10 rounded-2xl border border-slate-200 bg-slate-950 px-5 py-6 text-left sm:mt-12 sm:px-7 sm:py-7"
              >
                <p className="font-mono text-[11px] tracking-wide text-sky-300 uppercase">
                  agent://recruitment-loop/{active.id}
                </p>
                <p className="mt-5 text-sm leading-8 text-slate-200 sm:text-[15px]">
                  {active.prompt}
                </p>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => runStage(active.id)}
                  className={`mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-white bg-linear-to-r ${colorMap[active.color]}`}
                >
                  {unlocked.includes(active.id) ? "Replay stage" : "Run stage"}
                  <ArrowRight size={15} />
                </motion.button>
                {linkedProject && (
                  <a
                    href={`#work`}
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("focus-project", {
                          detail: linkedProject.id,
                        }),
                      );
                    }}
                    className="mt-4 block text-sm leading-7 text-sky-300 underline-offset-4 hover:underline"
                  >
                    Jump to proof: {linkedProject.name}
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-6 shadow-md shadow-slate-200/30 sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Mission log
                </h3>
                {complete && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                    <Trophy size={13} /> Loop complete
                  </span>
                )}
              </div>
              <ul className="space-y-5">
                {log.map((line, i) => (
                  <li
                    key={`${line}-${i}`}
                    className={`text-sm leading-8 ${
                      i === 0 ? "text-slate-800" : "text-slate-500"
                    }`}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-dashed border-sky-200 bg-linear-to-br from-sky-50/90 to-violet-50/70 p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.16em] text-sky-700 uppercase">
                Unlocked proof
              </p>
              <ul className="mt-6 space-y-4">
                {questNodes.map((node) => {
                  const project = projects.find((p) => p.id === node.projectId);
                  const open = unlocked.includes(node.id);
                  return (
                    <li
                      key={node.id}
                      className={`rounded-xl px-4 py-4 transition-colors ${
                        open ? "bg-white shadow-sm" : "bg-white/40"
                      }`}
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {node.step} · {node.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {open
                          ? project?.name
                          : "Locked — run the stage to reveal the linked project."}
                      </p>
                    </li>
                  );
                })}
              </ul>
              {complete && (
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
                >
                  Mission clear — talk hiring
                  <ArrowRight size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
