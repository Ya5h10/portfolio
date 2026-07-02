import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

const websites = [
  {
    name: "Delve Experiences",
    url: "https://delveexperiences.co/",
    type: "Business Website",
    blurb: "Experience-focused travel and storytelling website with a clean premium feel.",
  },
  {
    name: "Highest Praise Church",
    url: "https://www.highestpraisechurch.org/",
    type: "Community / Church Website",
    blurb: "Faith community website designed for clear communication and accessibility.",
  },
  {
    name: "AI Image Upscaler",
    url: "https://upscaler.yashmakwana.com",
    type: "AI Product Landing",
    blurb: "Product-focused frontend for an AI upscaling workflow with conversion-first UX.",
  },
];

export default function Websites() {
  return (
    <section id="websites" className="w-full py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-left mb-10"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-medium mb-3">
            Work Showcase
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Websites & Designs
          </h2>
          <p className="text-gray-500 mt-3 text-base sm:text-lg max-w-2xl leading-relaxed">
            A few websites and product experiences I have designed and shipped.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {websites.map((site, index) => (
            <motion.a
              key={site.url}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl bg-white border border-gray-200/80 p-6 text-left
                shadow-sm shadow-gray-200/50 hover:shadow-lg hover:border-gray-300/80
                transition-[box-shadow,border-color] duration-200"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-gray-400 font-semibold mb-4">
                {site.type}
              </p>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                {site.name}
              </h3>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed min-h-[3.5rem]">
                {site.blurb}
              </p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-sm text-blue-600 font-medium">
                Visit website
                <ArrowUpRight size={15} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
