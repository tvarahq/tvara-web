import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Copy,
  FileText,
  Bot,
  Database,
} from "lucide-react";

const SDKSection = () => {
  const targetRef = useRef(null);

  const [copied, setCopied] = useState(false);
  const code = `
from tvara.core import Agent
from dotenv import load_dotenv
import os

load_dotenv()
agent = Agent(
    name="MyAgent",
    model="gemini-2.5-flash",
    api_key=os.getenv("MODEL_API_KEY"),
)
response = agent.run("Hi, how are you?")
print(response)
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Track scroll progress for slide-up animation
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start start"],
  });

  // Slide up from below
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "RAG Applications",
      description:
        "Build intelligent document retrieval systems that understand context and provide accurate answers",
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "Customer Support Automation",
      description:
        "Create AI agents that handle complex customer queries with human-like understanding",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Processing Pipelines",
      description:
        "Automate complex data workflows with AI-powered analysis and decision making",
    },
  ];

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={targetRef}
      style={{ y, opacity }}
      className="min-h-screen py-20 px-6 relative overflow-hidden bg-black"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-200 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-bold text-white mb-6 leading-tight"
          >
            Beyond No-Code:
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
              Full SDK Control
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            While our no-code platform gets you started quickly, our
            comprehensive SDK gives you
            <span className="font-semibold bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              unlimited creative freedom
            </span>
            . Build exactly what you envision with complete control over your
            code.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid lg:grid-cols-2 gap-12 mb-16 items-center"
        >
          {/* Left side - Code example */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-cyan-400/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-400 ml-3">main.py</span>

                {/* Copy button */}
                <button
                  onClick={handleCopy}
                  className="ml-auto flex items-center gap-1 px-2 py-1 text-xs rounded-md border border-cyan-400/30 hover:border-cyan-400/60 text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className="font-mono text-sm space-y-2 text-left">
                <div>
                  <span className="text-cyan-400">from</span>{" "}
                  <span className="text-white">tvara.core</span>{" "}
                  <span className="text-cyan-400">import</span>{" "}
                  <span className="text-purple-400">Agent</span>
                </div>
                <div>
                  <span className="text-cyan-400">from</span>{" "}
                  <span className="text-white">dotenv</span>{" "}
                  <span className="text-cyan-400">import</span>{" "}
                  <span className="text-purple-400">load_dotenv</span>
                </div>
                <div>
                  <span className="text-cyan-400">import</span>{" "}
                  <span className="text-white">os</span>
                </div>
                <div>
                  <span className="text-purple-400">load_dotenv</span>()
                </div>
                <div>
                  <span className="text-white">agent</span> ={" "}
                  <span className="text-purple-400">Agent</span>(
                </div>
                <div className="ml-4">
                  <span className="text-white">name</span>=
                  <span className="text-green-400">"MyAgent"</span>,
                </div>
                <div className="ml-4">
                  <span className="text-white">model</span>=
                  <span className="text-green-400">"gemini-2.5-flash"</span>,
                </div>
                <div className="ml-4">
                  <span className="text-white">api_key</span>=
                  <span className="text-white">os</span>.
                  <span className="text-purple-400">getenv</span>(
                  <span className="text-green-400">"MODEL_API_KEY"</span>),
                </div>
                <div>)</div>
                <div>
                  <span className="text-white">response</span> ={" "}
                  <span className="text-white">agent</span>.
                  <span className="text-purple-400">run</span>(
                  <span className="text-green-400">"Hi, how are you?"</span>)
                </div>
                <div>
                  <span className="text-purple-400">print</span>(
                  <span className="text-white">response</span>)
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Benefits */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              Create Whatever You Imagine
            </h3>

            <div className="space-y-4">
              {/* Top full-width feature */}
              <motion.div
                key={0}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/20 hover:shadow-lg hover:border-cyan-400/40 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-cyan-400/20 rounded-lg text-cyan-400 flex-shrink-0">
                    {features[0].icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      {features[0].title}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {features[0].description}
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="flex flex-col lg:flex-row gap-4">
                {features.slice(1).map((feature, index) => (
                  <motion.div
                    key={index + 1}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    className="flex-1 bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/20 hover:shadow-lg hover:border-cyan-400/40 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-cyan-400/20 rounded-lg text-cyan-400 flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default SDKSection;
