import { ArrowUpRight, Github, Mail, Globe, Phone, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { profile } from "../data/site";

const contactLinks = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/Ya5h10",
    href: profile.githubUrl,
    icon: Github,
  },
  {
    label: "Website",
    value: "yashmakwana.com",
    href: profile.website,
    icon: Globe,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: profile.phoneHref,
    icon: Phone,
  },
];

export default function Contact({ embedded = false }: { embedded?: boolean }) {
  return (
    <section
      id="contact"
      className={`relative scroll-mt-28 px-4 sm:px-6 ${
        embedded ? "py-20 sm:py-28" : "min-h-[calc(100vh-5rem)] py-16 sm:py-24"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <div>
            <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-sky-700 uppercase">
              Contact
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Hiring for agentic AI or remote product engineering?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              No forms. Direct channels only — built for overseas recruiters who
              need a clear next step in one click.
            </p>
          </div>
          <div className="rounded-3xl border border-sky-200/70 bg-linear-to-br from-sky-50/90 to-violet-50/70 p-5 sm:p-6">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
              <MapPin size={15} className="text-sky-700" />
              Based in {profile.location}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {profile.timezone} · {profile.availability}
            </p>
            <motion.a
              href={`mailto:${profile.email}?subject=Remote%20role%20for%20Agentic%20AI%20Developer`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15"
            >
              Email {profile.name.split(" ")[0]}
              <ArrowUpRight size={15} />
            </motion.a>
          </div>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-3 sm:grid-cols-2"
        >
          {contactLinks.map(({ label, value, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={
                  href.startsWith("mailto:") || href.startsWith("tel:")
                    ? undefined
                    : "_blank"
                }
                rel={
                  href.startsWith("mailto:") || href.startsWith("tel:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/75 px-4 py-4 transition-[border-color,background,transform] hover:border-slate-300 hover:bg-white active:scale-[0.99]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors group-hover:text-sky-700">
                  <Icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold tracking-[0.14em] text-slate-400 uppercase">
                    {label}
                  </p>
                  <p className="mt-1 break-all font-medium text-slate-900">
                    {value}
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-slate-400 transition-colors group-hover:text-sky-600"
                />
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
