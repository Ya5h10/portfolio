import { motion } from "motion/react";
import { skillGroups } from "../data/site";

export default function Stack() {
  return (
    <section id="stack" className="relative scroll-mt-28 px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-14 max-w-2xl sm:mb-16"
        >
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-sky-700 uppercase">
            Stack
          </p>
          <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl md:leading-[1.15]">
            Tools I use to ship agentic systems
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg sm:leading-8">
            Grouped the way remote hiring screens read them — with a short story
            for each lane, not just a logo wall.
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <h3 className="font-display text-xl font-bold text-slate-900">
                {group.label}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {group.story}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li key={item}>
                    <motion.span
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-block rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-sm leading-none text-slate-700 shadow-sm shadow-slate-200/40"
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
