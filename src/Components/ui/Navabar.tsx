import { useEffect, useState } from "react";
import { Github, Menu, X } from "lucide-react";
import { profile } from "../../data/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#stack", label: "Stack" },
  { href: "/#shipped", label: "Shipped" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-3 z-50 mx-auto w-[94%] max-w-6xl rounded-2xl border transition-[background,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-slate-200/80 bg-white/80 shadow-lg shadow-slate-200/40 backdrop-blur-xl"
          : "border-transparent bg-white/40 backdrop-blur-md"
      }`}
    >
      <div className="flex items-center justify-between gap-3 px-3 py-3 md:px-5">
        <a
          href="/"
          className="font-display text-base font-bold tracking-tight text-slate-900 sm:text-lg"
        >
          Yash{" "}
          <span className="bg-linear-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
            Makwana
          </span>
        </a>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-xl p-2 text-slate-700 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            <Github size={15} />
            GitHub
          </a>
        </div>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-1 border-t border-slate-200/70 px-3 pb-4 pt-2 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-3 text-center text-sm font-medium text-slate-700 active:bg-slate-100"
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 active:bg-slate-100"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
