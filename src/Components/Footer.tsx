import { Github, Mail, Globe, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a href="/" className="font-bold text-xl text-blue-700 tracking-tight">
              Yash <span className="text-gray-900">Makwana</span>
            </a>
            <p className="mt-3 text-sm text-gray-500 max-w-xs leading-relaxed">
              AI & Full Stack Developer building intelligent, scalable, and user-centric digital solutions.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Ya5h10"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:connect@yashmakwana.com"
                className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://yashmakwana.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
                aria-label="Website"
              >
                <Globe size={20} />
              </a>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Get in touch <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} Yash Makwana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
