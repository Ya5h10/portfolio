import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, FileDown, Gamepad2, Mail } from "lucide-react";
import { profile } from "../data/site";

export default function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[calc(100svh-5.5rem)] w-full max-w-6xl flex-col justify-center px-4 pb-20 pt-14 sm:px-6 sm:pt-20 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl"
      >
        <p className="mb-6 text-sm font-medium tracking-[0.18em] text-sky-700 uppercase sm:mb-7">
          {profile.availability} · {profile.timezone}
        </p>

        <h1 className="font-display text-[clamp(2.75rem,8vw,5.75rem)] leading-[1.05] font-extrabold tracking-tight text-slate-900">
          {profile.name}
        </h1>

        <p className="mt-6 font-display text-2xl leading-snug font-semibold tracking-tight text-slate-800 sm:mt-7 sm:text-3xl md:text-4xl md:leading-snug">
          <span className="bg-linear-to-r from-sky-700 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {profile.role}
          </span>
        </p>

        <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:mt-8 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
          {profile.headline}
        </p>

        <ul className="mt-8 max-w-2xl space-y-3 sm:mt-10">
          {profile.positioning.map((line) => (
            <li
              key={line}
              className="relative pl-4 text-sm leading-7 text-slate-600 before:absolute before:top-[0.7em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-sky-500 sm:text-[15px] sm:leading-7"
            >
              {line}
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center gap-3 sm:mt-14 sm:gap-4">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition-colors hover:bg-slate-800 sm:text-base"
          >
            <Mail size={17} />
            Talk to me
          </motion.a>
          <motion.a
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-2xl border border-sky-200 bg-sky-50/90 px-5 py-3.5 text-sm font-semibold text-sky-900 transition-colors hover:bg-sky-50 sm:text-base"
          >
            <FileDown size={17} />
            Resume PDF
          </motion.a>
          <motion.a
            href="#arcade"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-2xl border border-violet-200 bg-violet-50/80 px-5 py-3.5 text-sm font-semibold text-violet-900 transition-colors hover:bg-violet-50 sm:text-base"
          >
            <Gamepad2 size={17} />
            Play arcade
          </motion.a>
          <motion.a
            href="#work"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300/80 bg-white/70 px-5 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur-sm transition-colors hover:border-slate-400 hover:bg-white sm:text-base"
          >
            See proof
            <ArrowUpRight size={16} />
          </motion.a>
        </div>
      </motion.div>

      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-16 inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800 sm:mt-20"
      >
        Scroll for projects
        <ArrowDown size={16} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
