import { useEffect, useRef, useState } from "react";
import Particles from "./Effects/Particles";
import { motion } from "motion/react";
import { ChevronsDown } from "lucide-react";

const PARALLAX_STRENGTH = 20;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x, y };

      if (contentRef.current) {
        contentRef.current.style.transition = "none";
        contentRef.current.style.transform = `translate(${-x * PARALLAX_STRENGTH}px, ${-y * PARALLAX_STRENGTH}px)`;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 };
      if (contentRef.current) {
        contentRef.current.style.transition = "transform 0.5s ease-out";
        contentRef.current.style.transform = "translate(0px, 0px)";
      }
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Particles
          mouseRef={mouseRef}
          particleColors={["#30302f", "#000000"]}
          particleCount={isMobile ? 300 : 1000}
          particleSpread={10}
          speed={0.2}
          particleBaseSize={50}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={true}
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center max-w-3xl mx-auto px-4 pt-24 pb-10 md:pt-20 text-center pointer-events-none"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-4 md:mt-10">
          Yash Makwana
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mt-3 md:mt-4 text-gray-800">
          AI & Full Stack Developer
        </p>

        <p className="text-base sm:text-lg md:text-2xl text-gray-700 leading-relaxed px-2 sm:px-4 mt-10 md:mt-20">
          I'm a full stack developer and AI enthusiast, specializing in building
          intelligent, scalable, and user centric digital solutions. I combine
          modern web technologies with AI powered tools to create products that
          are not only functional but also intuitive and impactful.
        </p>

        <p className="mt-4 text-base sm:text-lg md:text-2xl text-gray-700">
          Explore my work — this is where innovation meets execution.
        </p>

        <a href="/contact" className="pointer-events-auto mt-10 md:mt-18 inline-block">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg md:text-2xl text-white font-medium
              bg-linear-to-br from-purple-900 via-purple-600 to-purple-400
              rounded-2xl shadow-lg"
          >
            Hire Now
          </motion.button>
        </a>

        <a href="#About" className="pointer-events-auto mt-10 md:mt-20 inline-block">
          <ChevronsDown
            size={40}
            className="text-gray-600/60 animate-bounce"
          />
        </a>
      </div>
    </section>
  );
}
