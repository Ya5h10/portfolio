import { ArrowUpRight, Github, Mail, Globe, Phone } from "lucide-react";
import { motion } from "motion/react";

const contactLinks = [
  {
    label: "Email",
    value: "connect@yashmakwana.com",
    href: "mailto:connect@yashmakwana.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/Ya5h10",
    href: "https://github.com/Ya5h10",
    icon: Github,
  },
  {
    label: "Website",
    value: "yashmakwana.com",
    href: "https://yashmakwana.com",
    icon: Globe,
  },
  {
    label: "Phone",
    value: "+91 9930955649",
    href: "tel:+919930955649",
    icon: Phone,
  },
];

export default function Contact() {
  return (
    <section className="w-full min-h-[calc(100vh-5rem)] py-16 sm:py-24 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-left mb-12"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-medium mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Let&apos;s build something impactful
          </h2>
          <p className="text-gray-500 mt-3 text-base sm:text-lg max-w-2xl leading-relaxed">
            No forms. Just direct communication. Reach out through any channel
            below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="rounded-3xl border border-gray-200/80 bg-white p-4 sm:p-5 shadow-lg shadow-gray-300/15"
        >
          <ul className="space-y-3">
            {contactLinks.map(({ label, value, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "noopener noreferrer"}
                  className="group flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-gray-50/70 px-4 py-4
                    hover:bg-white hover:border-gray-300 transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 group-hover:text-blue-700 transition-colors duration-200">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-[0.14em] text-gray-400 font-semibold">
                      {label}
                    </p>
                    <p className="text-gray-900 font-medium mt-1 break-all">{value}</p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-gray-400 group-hover:text-blue-600 transition-colors duration-200"
                  />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
