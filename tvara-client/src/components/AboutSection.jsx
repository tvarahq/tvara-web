import React, { useState } from "react";
import { FaCogs, FaPlug, FaConnectdevelop, FaCodeBranch, FaProjectDiagram } from "react-icons/fa";

export default function AboutSection() {
  const [mousePosition, setMousePosition] = useState({});

  const handleMouseMove = (e, index) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setMousePosition((prev) => ({
      ...prev,
      [index]: { x, y, visible: true },
    }));
  };

  const handleMouseLeave = (index) => {
    setMousePosition((prev) => ({
      ...prev,
      [index]: { ...prev[index], visible: false },
    }));
    setTimeout(() => {
      setMousePosition((prev) => {
        const newPos = { ...prev };
        delete newPos[index];
        return newPos;
      });
    }, 500);
  };

  const data = [
    {
      title: "Universal Agent Framework",
      desc: [
        "Build agents with any LLM, any tool, any connector.",
        "Mix and match models, prompts, and capabilities.",
      ],
      icon: FaCogs,
    },
    {
      title: "Plug-and-Play Tools",
      desc: [
        "Add tools like web search, code execution, or your own APIs in seconds.",
        "Tools are first-class citizens: agents can call them autonomously.",
      ],
      icon: FaPlug,
    },
    {
      title: "Connectors for Everything",
      desc: [
        "Integrate with Slack, Discord, email, databases, and more.",
        "Bring your agents into your favorite apps and workflows.",
      ],
      icon: FaConnectdevelop,
    },
    {
      title: "Open, Extensible, Yours",
      desc: [
        "100% open-source. No vendor lock-in.",
        "Bring your own models, tools, and data.",
      ],
      icon: FaCodeBranch,
    },
    {
      title: "Visual Workflow Orchestration (coming soon!)",
      desc: [
        "Drag-and-drop interface to design multi-agent workflows.",
        "Automate, chain, and parallelize agent actions, no code required.",
      ],
      icon: FaProjectDiagram,
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 mt-6 sm:mt-8 md:mt-10 min-h-screen flex justify-center px-4">
      <div className="gap-8 sm:gap-10 md:gap-12 mx-auto max-w-7xl w-full">
        {/* Heading */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-blue-600 px-2">
            AI Workflows for Everyone
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-800 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto px-4">
            Tvara Studios bridges the gap between powerful AI capabilities and ease of use.
            Whether you're a developer building custom solutions or a business user automating
            workflows, we've got you covered.
          </p>
        </div>

        {/* Cards Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-2">
            {/* First card - full width on mobile, 6 columns on desktop */}
            <div
              className="col-span-1 md:col-span-6"
              onMouseMove={(e) => handleMouseMove(e, 0)}
              onMouseLeave={() => handleMouseLeave(0)}
              style={{
                background: mousePosition[0]?.visible
                  ? `radial-gradient(circle at ${mousePosition[0].x}px ${mousePosition[0].y}px, rgba(59, 130, 246, 0.3) 0%, transparent 90%)`
                  : "",
                transition: "background 0.5s ease-out",
              }}
            >
              <div className="relative bg-white/20 backdrop-filter backdrop-blur-lg border-2 border-gray-400/80 rounded-xl p-4 sm:p-6 md:p-8 transition-all duration-300 group dark:bg-gray-700/20 dark:border-gray-600/30 h-full">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gray-900/20 text-blue-600 dark:text-blue-400 dark:bg-gray-700/50 rounded-full mb-4 sm:mb-6">
                  {React.createElement(data[0].icon, { size: window.innerWidth < 640 ? 20 : window.innerWidth < 768 ? 24 : 32 })}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
                  {data[0].title}
                </h3>
                <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 space-y-2 text-sm sm:text-base md:text-lg">
                  {data[0].desc.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Second card - full width on mobile, 6 columns on desktop */}
            <div
              className="col-span-1 md:col-span-6"
              onMouseMove={(e) => handleMouseMove(e, 1)}
              onMouseLeave={() => handleMouseLeave(1)}
              style={{
                background: mousePosition[1]?.visible
                  ? `radial-gradient(circle at ${mousePosition[1].x}px ${mousePosition[1].y}px, rgba(59, 130, 246, 0.3) 0%, transparent 90%)`
                  : "",
                transition: "background 0.5s ease-out",
              }}
            >
              <div className="relative bg-white/20 backdrop-filter backdrop-blur-lg border-2 border-gray-400/80 rounded-xl p-4 sm:p-6 md:p-8 transition-all duration-300 group dark:bg-gray-700/20 dark:border-gray-600/30 h-full">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gray-900/20 text-blue-600 dark:text-blue-400 dark:bg-gray-700/50 rounded-full mb-4 sm:mb-6">
                  {React.createElement(data[1].icon, { size: window.innerWidth < 640 ? 20 : window.innerWidth < 768 ? 24 : 32 })}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
                  {data[1].title}
                </h3>
                <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 space-y-2 text-sm sm:text-base md:text-lg">
                  {data[1].desc.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Third card - full width on mobile, 5 columns on desktop */}
            <div
              className="col-span-1 md:col-span-5"
              onMouseMove={(e) => handleMouseMove(e, 2)}
              onMouseLeave={() => handleMouseLeave(2)}
              style={{
                background: mousePosition[2]?.visible
                  ? `radial-gradient(circle at ${mousePosition[2].x}px ${mousePosition[2].y}px, rgba(59, 130, 246, 0.3) 0%, transparent 90%)`
                  : "",
                transition: "background 0.5s ease-out",
              }}
            >
              <div className="relative bg-white/20 backdrop-filter backdrop-blur-lg border-2 border-gray-400/80 rounded-xl p-4 sm:p-6 md:p-8 transition-all duration-300 group dark:bg-gray-700/20 dark:border-gray-600/30 h-full">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gray-900/20 text-blue-600 dark:text-blue-400 dark:bg-gray-700/50 rounded-full mb-4 sm:mb-6">
                  {React.createElement(data[2].icon, { size: window.innerWidth < 640 ? 20 : window.innerWidth < 768 ? 24 : 32 })}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
                  {data[2].title}
                </h3>
                <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 space-y-2 text-sm sm:text-base md:text-lg">
                  {data[2].desc.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Fourth card - full width on mobile, 5 columns on desktop */}
            <div
              className="col-span-1 md:col-span-5"
              onMouseMove={(e) => handleMouseMove(e, 3)}
              onMouseLeave={() => handleMouseLeave(3)}
              style={{
                background: mousePosition[3]?.visible
                  ? `radial-gradient(circle at ${mousePosition[3].x}px ${mousePosition[3].y}px, rgba(59, 130, 246, 0.3) 0%, transparent 90%)`
                  : "",
                transition: "background 0.5s ease-out",
              }}
            >
              <div className="relative bg-white/20 backdrop-filter backdrop-blur-lg border-2 border-gray-400/80 rounded-xl p-4 sm:p-6 md:p-8 transition-all duration-300 group dark:bg-gray-700/20 dark:border-gray-600/30 h-full">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gray-900/20 text-blue-600 dark:text-blue-400 dark:bg-gray-700/50 rounded-full mb-4 sm:mb-6">
                  {React.createElement(data[3].icon, { size: window.innerWidth < 640 ? 20 : window.innerWidth < 768 ? 24 : 32 })}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
                  {data[3].title}
                </h3>
                <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 space-y-2 text-sm sm:text-base md:text-lg">
                  {data[3].desc.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Empty space - hidden on mobile */}
            <div className="hidden md:block md:col-span-7"></div>

            {/* Fifth card - full width on mobile, 6 columns on desktop */}
            <div
              className="col-span-1 md:col-span-6"
              onMouseMove={(e) => handleMouseMove(e, 4)}
              onMouseLeave={() => handleMouseLeave(4)}
              style={{
                background: mousePosition[4]?.visible
                  ? `radial-gradient(circle at ${mousePosition[4].x}px ${mousePosition[4].y}px, rgba(59, 130, 246, 0.3) 0%, transparent 90%)`
                  : "",
                transition: "background 0.5s ease-out",
              }}
            >
              <div className="relative bg-white/20 backdrop-filter backdrop-blur-lg border-2 border-gray-400/80 rounded-xl p-4 sm:p-6 md:p-8 transition-all duration-300 group dark:bg-gray-700/20 dark:border-gray-600/30 h-full md:-translate-y-2">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gray-900/20 text-blue-600 dark:text-blue-400 dark:bg-gray-700/50 rounded-full mb-4 sm:mb-6">
                  {React.createElement(data[4].icon, { size: window.innerWidth < 640 ? 20 : window.innerWidth < 768 ? 24 : 32 })}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
                  {data[4].title}
                </h3>
                <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 space-y-2 text-sm sm:text-base md:text-lg">
                  {data[4].desc.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile CTA Section (visible only on mobile) */}
        <div className="md:hidden mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Ready to get started?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Join our waitlist to be the first to experience Tvara's AI workflows.
            </p>
            <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
