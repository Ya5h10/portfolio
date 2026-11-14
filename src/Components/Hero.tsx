import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { profile } from "../data/site";

export default function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[calc(100svh-5.5rem)] w-full max-w-6xl flex-col justify-center px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl"
      >
        <p className="mb-5 text-sm font-medium tracking-[0.18em] text-sky-700 uppercase">
          {profile.availability} · {profile.timezone}
        </p>

        <h1 className="font-display text-[clamp(2.75rem,8vw,5.75rem)] leading-[0.95] font-extrabold tracking-tight text-slate-900">
          {profile.name}
        </h1>

        <p className="mt-5 font-display text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl md:text-4xl">
          <span className="bg-linear-to-r from-sky-700 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {profile.role}
          </span>
        </p>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg md:text-xl">
          {profile.headline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition-colors hover:bg-slate-800 sm:text-base"
          >
            <Mail size={17} />
            Talk to me
          </motion.a>
          <motion.a
            href="#work"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300/80 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800 backdrop-blur-sm transition-colors hover:border-slate-400 hover:bg-white sm:text-base"
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
        className="mt-14 inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
      >
        Scroll for projects
        <ArrowDown size={16} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
