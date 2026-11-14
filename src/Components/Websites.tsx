import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { websites } from "../data/site";

export default function Websites() {
  return (
    <section id="shipped" className="relative scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-10 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-sky-700 uppercase">
            Shipped surfaces
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Live sites you can open today
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Production URLs for client and product work — the kind of signal
            remote recruiters verify in the first pass.
          </p>
        </motion.div>

        <ul className="divide-y divide-slate-200/90 border-y border-slate-200/90">
          {websites.map((site, index) => (
            <motion.li
              key={site.url}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 py-6 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-8"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-[0.14em] text-slate-400 uppercase">
                    {site.type}
                  </p>
                  <h3 className="font-display mt-1 text-xl font-bold text-slate-900 transition-colors group-hover:text-sky-700 sm:text-2xl">
                    {site.name}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                    {site.blurb}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-sky-700">
                  Visit
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-active:scale-95"
                  />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
