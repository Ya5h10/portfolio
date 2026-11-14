import { motion } from "motion/react";
import { experience } from "../data/site";

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-sky-700 uppercase">
            Experience
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Outcomes recruiters can scan in under a minute
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Role, company, dates, and measurable impact — written for async
            screening, not buzzwords.
          </p>
        </motion.div>

        <ol className="space-y-6">
          {experience.map((job, index) => (
            <motion.li
              key={`${job.company}-${job.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="grid gap-4 border-t border-slate-200/90 pt-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]"
            >
              <div>
                <p className="font-display text-xl font-bold text-slate-900">
                  {job.title}
                </p>
                <p className="mt-1 text-sm font-medium text-indigo-700">
                  {job.company}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  {job.period} · {job.location}
                </p>
              </div>
              <ul className="space-y-2.5">
                {job.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-4 text-[15px] leading-relaxed text-slate-600 before:absolute before:top-[0.65em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-sky-500"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
