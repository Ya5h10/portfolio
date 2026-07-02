import { useEffect, useRef, useState } from "react";
import { Github, Menu, X } from "lucide-react";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [onDark, setOnDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isContactPage = window.location.pathname === "/contact";

  useEffect(() => {
    const update = () => {
      const nav = navRef.current;
      if (!nav) return;

      const rect = nav.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const elements = document.elementsFromPoint(x, y);
      const behind = elements.find((el) => !nav.contains(el));
      setOnDark(!!behind?.closest("[data-nav-theme='dark']"));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [isContactPage]);

  const linkClass = `px-3 py-2 transition-colors duration-300 ${
    onDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
  }`;

  return (
    <nav
      ref={navRef}
      className={`sticky top-2 max-w-7xl w-[94%] md:w-9/10 mb-2 mx-auto z-50 rounded-2xl
        backdrop-blur-md backdrop-saturate-50 transition-colors duration-300
        ${
          onDark
            ? "bg-white/10 border border-white/15"
            : "bg-gray-600/10"
        }`}
    >
      <div className="container mx-auto px-3 py-3 md:p-4 flex flex-1 justify-between items-center">
        <a
          href="/"
          className={`font-bold text-base sm:text-lg md:text-xl px-2 md:px-6 transition-colors duration-300 ${
            onDark ? "text-blue-300" : "text-blue-700"
          }`}
        >
          Yash{" "}
          <span className={onDark ? "text-white" : "text-gray-900"}>
            Makwana
          </span>
        </a>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className={`md:hidden p-2 rounded-lg ${onDark ? "text-gray-200" : "text-gray-700"}`}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="hidden md:flex items-center">
          <a
            href="/#projects"
            className={linkClass}
          >
            Projects
          </a>
          <a
            href="/#websites"
            className={linkClass}
          >
            Websites
          </a>
          <a
            href="https://github.com/Ya5h10"
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} inline-flex items-center gap-1`}
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href="/contact"
            className={linkClass}
          >
            Contact
          </a>
          {!isContactPage && (
            <a
              href="#About"
              className={linkClass}
            >
              About
            </a>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className={`md:hidden border-t mt-2 ${onDark ? "border-white/10" : "border-black/10"} px-3 pb-4 pt-3 flex flex-col space-y-1`}>
          <a href="/#projects" onClick={() => setMobileOpen(false)} className={`${linkClass} rounded-xl active:bg-gray-500/20 py-3 text-center font-medium`}>
            Projects
          </a>
          <a href="/#websites" onClick={() => setMobileOpen(false)} className={`${linkClass} rounded-xl active:bg-gray-500/20 py-3 text-center font-medium`}>
            Websites
          </a>
          <a
            href="https://github.com/Ya5h10"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className={`${linkClass} rounded-xl active:bg-gray-500/20 py-3 flex justify-center items-center gap-2 font-medium`}
          >
            <Github size={18} />
            GitHub
          </a>
          <a href="/contact" onClick={() => setMobileOpen(false)} className={`${linkClass} rounded-xl active:bg-gray-500/20 py-3 text-center font-medium`}>
            Contact
          </a>
          {!isContactPage && (
            <a href="#About" onClick={() => setMobileOpen(false)} className={`${linkClass} rounded-xl active:bg-gray-500/20 py-3 text-center font-medium`}>
              About
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
