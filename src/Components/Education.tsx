import { motion } from "motion/react";
import { profile } from "../data/site";

export default function Education() {
  const { education } = profile;
  return (
    <section id="education" className="relative scroll-mt-28 px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl border-t border-slate-200/90 pt-12"
        >
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-sky-700 uppercase">
            Education
          </p>
          <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-slate-900 sm:text-4xl">
            {education.school}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            {education.degree}
          </p>
          <p className="mt-3 text-sm text-slate-500">
            {education.location} · {education.period}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
