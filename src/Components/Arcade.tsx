import { useState } from "react";
import { motion } from "motion/react";
import { Gamepad2 } from "lucide-react";
import TetrisGame from "./games/TetrisGame";
import DoomEmbed from "./games/DoomEmbed";

type Tab = "tetris" | "doom";

export default function Arcade() {
  const [tab, setTab] = useState<Tab>("tetris");

  return (
    <section id="arcade" className="relative scroll-mt-28 px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-12 max-w-2xl sm:mb-14"
        >
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-sky-700 uppercase">
            <Gamepad2 size={16} /> Arcade
          </p>
          <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl md:leading-[1.15]">
            Real browser games
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg sm:leading-8">
            Classic playable games in the page — not a fake portfolio quest.
            Tetris is touch-friendly; Doom shareware is desktop/keyboard-first.
            Portfolio content above and below stays fully scannable.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-wrap gap-2">
          {(
            [
              { id: "tetris" as const, label: "Tetris", note: "Mobile OK" },
              { id: "doom" as const, label: "Doom", note: "Desktop" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                tab === item.id
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15"
                  : "border border-slate-200 bg-white/80 text-slate-700 hover:border-slate-300"
              }`}
            >
              {item.label}
              <span
                className={`ml-2 text-xs font-medium ${
                  tab === item.id ? "text-slate-300" : "text-slate-400"
                }`}
              >
                {item.note}
              </span>
            </button>
          ))}
        </div>

        <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/75 p-5 shadow-lg shadow-slate-200/40 backdrop-blur-sm sm:p-8">
          {tab === "tetris" ? <TetrisGame /> : <DoomEmbed />}
        </div>
      </div>
    </section>
  );
}
