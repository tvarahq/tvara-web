import React from "react";
import { motion } from "framer-motion";
import right_arrow from "../../assets/right_arrow.svg";

function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
  };

  // Scroll icon subtle bounce
  const iconVariants = {
    animate: {
      y: [0, 6, 0],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="mt-10 sm:mt-0 md:mt-0 lg:mt-0 md:min-h-screen h-[80vh] flex items-center md:items-end md:pb-18 z-10 px-4 md:px-24 lg:px-36"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="hero"
    >
      <div className="w-full">
        <motion.div className="max-w-4xl" variants={fadeUp}>
          <h1 className="text-4xl sm:text-4xl md:text-6xl font-bold leading-tight drop-shadow-2xl">
            Build AI Workflows <br />
            That Work While You Sleep
          </h1>
        </motion.div>

        <motion.p
          className="mt-3 md:mt-4 text-base sm:text-lg md:text-xl text-gray-300 font-light w-full md:w-[65%]"
          variants={fadeUp}
        >
          Tvara Canvas lets you design, connect, and deploy automations in
          minutes. With 10,000+ tools and an agentic engine, turn ideas into
          adaptive workflows that keep running while you sleep.
        </motion.p>

        <motion.div
          className="mt-6 md:mt-8 flex flex-col sm:flex-row w-full items-center justify-between gap-6 sm:gap-0 sm:translate-y-[-12px]"
          variants={containerVariants}
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <motion.button
              className="w-full sm:w-auto px-4 py-2.5 sm:px-3.5 sm:py-2 border rounded-[10px] transition cursor-pointer text-sm sm:text-base"
              variants={buttonVariants}
              whileHover="hover"
            >
              <a href="https://blog.tvarahq.com/meet-tvara-v1-build-agents-and-workflows-without-the-hassle" target="_blank" rel="noopener noreferrer">
                <span>Release Blog</span>
              </a>
            </motion.button>
            <motion.button
              className="w-full sm:w-auto px-4 py-2.5 sm:px-3.5 sm:py-2 bg-primary/80 text-white font-bold rounded-[10px] transition cursor-pointer text-sm sm:text-base"
              variants={buttonVariants}
              whileHover="hover"
              onClick={() => {
                const cta = document.getElementById("cta");
                if (cta) {
                  cta.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span className="flex items-center justify-center">
                Join Waitlist
                <img
                  src={right_arrow}
                  alt="Right Arrow"
                  className="inline h-2 ml-2.5"
                />
              </span>
            </motion.button>
          </div>

          {/* Scroll Icon with bounce */}
          <motion.div
            className="cursor-pointer group"
            variants={iconVariants}
            animate="animate"
            onClick={() => {
              const exploreSection = document.getElementById("explore");
              if (exploreSection) {
                exploreSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 sm:h-12 transition-colors duration-300 group-hover:fill-primary group-hover:text-white"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="11"
                className="stroke-current text-primary fill-transparent group-hover:fill-primary transition-colors duration-300"
                strokeWidth="1"
              />
              <line
                x1="12"
                y1="7"
                x2="12"
                y2="16"
                className="stroke-primary group-hover:stroke-white transition-colors duration-300"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <polyline
                points="8,11 12,16 16,11"
                className="stroke-primary group-hover:stroke-white transition-colors duration-300"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default HeroSection;
