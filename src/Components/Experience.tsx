import { motion } from "motion/react";
import { experience } from "../data/site";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-28 px-4 py-28 sm:px-6 sm:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-14 max-w-2xl sm:mb-16"
        >
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-sky-700 uppercase">
            Experience
          </p>
          <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl md:leading-[1.15]">
            Outcomes recruiters can scan in under a minute
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg sm:leading-8">
            Role, company, dates, and measurable impact — written for async
            screening, not buzzwords. No invented titles; same roles as before,
            with more breathing room and context.
          </p>
        </motion.div>

        <ol className="space-y-10 sm:space-y-12">
          {experience.map((job, index) => (
            <motion.li
              key={`${job.company}-${job.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="grid gap-6 border-t border-slate-200/90 pt-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] md:gap-10"
            >
              <div>
                <p className="font-display text-xl leading-snug font-bold text-slate-900 sm:text-2xl">
                  {job.title}
                </p>
                <p className="mt-2 text-sm font-medium text-indigo-700 sm:text-base">
                  {job.company}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {job.period} · {job.location}
                </p>
                <p className="mt-5 text-sm leading-7 text-slate-600">
                  {job.summary}
                </p>
              </div>
              <ul className="space-y-4">
                {job.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-5 text-[15px] leading-7 text-slate-600 before:absolute before:top-[0.7em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-sky-500"
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
