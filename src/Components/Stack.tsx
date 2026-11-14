import { motion } from "motion/react";
import { skillGroups } from "../data/site";

export default function Stack() {
  return (
    <section id="stack" className="relative scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-sky-700 uppercase">
            Stack
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Tools I use to ship agentic systems
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Grouped the way remote hiring screens read them: AI systems, product
            surface, and how it gets into production.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <h3 className="font-display text-lg font-bold text-slate-900">
                {group.label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <motion.span
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-block rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-sm text-slate-700 shadow-sm shadow-slate-200/40"
                    >
                      {item}
                    </motion.span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
