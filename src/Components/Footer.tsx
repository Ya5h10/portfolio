import { Github, Mail, Globe, ArrowUpRight } from "lucide-react";
import { profile } from "../data/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-slate-200/80 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <a
              href="/"
              className="font-display text-xl font-bold tracking-tight text-slate-900"
            >
              Yash{" "}
              <span className="bg-linear-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
                Makwana
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-500">
              {profile.role} — building autonomous hiring systems, RAG
              pipelines, and AI products that ship.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex items-center gap-3">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-slate-50 p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full bg-slate-50 p-2.5 text-slate-500 transition-colors hover:bg-sky-50 hover:text-sky-700"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-slate-50 p-2.5 text-slate-500 transition-colors hover:bg-violet-50 hover:text-violet-700"
                aria-label="Website"
              >
                <Globe size={18} />
              </a>
            </div>
            <a
              href="/#contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-sky-700"
            >
              Get in touch <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {currentYear} Yash Makwana. All rights reserved.</p>
          <p>
            {profile.location} · {profile.timezone}
          </p>
        </div>
      </div>
    </footer>
  );
}
