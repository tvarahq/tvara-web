// import React from "react";
// import { FaCogs, FaPlug, FaConnectdevelop, FaCodeBranch, FaProjectDiagram } from "react-icons/fa";

// export default function AboutSection() {
//   const data = [
//     {
//       title: "Universal Agent Framework",
//       desc: [
//         "Build agents with any LLM, any tool, any connector.",
//         "Mix and match models, prompts, and capabilities."
//       ],
//       icon: FaCogs
//     },
//     {
//       title: "Plug-and-Play Tools",
//       desc: [
//         "Add tools like web search, code execution, or your own APIs in seconds.",
//         "Tools are first-class citizens: agents can call them autonomously."
//       ],
//       icon: FaPlug
//     },
//     {
//       title: "Connectors for Everything",
//       desc: [
//         "Integrate with Slack, Discord, email, databases, and more.",
//         "Bring your agents into your favorite apps and workflows."
//       ],
//       icon: FaConnectdevelop
//     },
//     {
//       title: "Open, Extensible, Yours",
//       desc: [
//         "100% open-source. No vendor lock-in.",
//         "Bring your own models, tools, and data."
//       ],
//       icon: FaCodeBranch
//     },
//     {
//       title: "Visual Workflow Orchestration (coming soon!)",
//       desc: [
//         "Drag-and-drop interface to design multi-agent workflows.",
//         "Automate, chain, and parallelize agent actions, no code required."
//       ],
//       icon: FaProjectDiagram
//     }
//   ];

//   return (
//     <section className="py-20 mt-10 min-h-screen flex justify-center">
//       <div className="gap-12 mx-auto px-4 max-w-7xl w-[82%]">
//         {/* Heading */}
//         <div className="space-y-8 text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600 ">
//             AI Workflows for Everyone
//           </h2>
//           <p className="text-xl text-gray-800 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
//             Tvara Studios bridges the gap between powerful AI capabilities and ease of use.
//             Whether you're a developer building custom solutions or a business user automating
//             workflows, we've got you covered.
//           </p>
//         </div>

//         {/* Cards Layout: All cards aligned to the left */}
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-12 gap-2">
//             {/* First large card - spans 6 columns, left aligned */}
//             <div className="col-span-12 md:col-span-6">
//               <div className="relative bg-white/20 backdrop-filter backdrop-blur-lg border-2 border-gray-400/80 rounded-xl p-8  transition-all duration-300 group dark:bg-gray-700/20 dark:border-gray-600/30 h-full">
//                 <div className="flex items-center justify-center w-16 h-16 bg-gray-900/20 text-blue-600 dark:text-blue-400 dark:bg-gray-700/50 rounded-full mb-6">
//                   {React.createElement(data[0].icon, { size: 32 })}
//                 </div>
//                 <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
//                   {data[0].title}
//                 </h3>
//                 <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 space-y-2 text-lg">
//                   {data[0].desc.map((point, i) => (
//                     <li key={i}>{point}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Second card - spans 6 columns, left aligned */}
//             <div className="col-span-12 md:col-span-6">
//               <div className="relative bg-white/20 backdrop-filter backdrop-blur-lg border-2 border-gray-400/80 rounded-xl p-8  transition-all duration-300 group dark:bg-gray-700/20 dark:border-gray-600/30 h-full">
//                 <div className="flex items-center justify-center w-16 h-16 bg-gray-900/20 text-blue-600 dark:text-blue-400 dark:bg-gray-700/50 rounded-full mb-6">
//                   {React.createElement(data[1].icon, { size: 32 })}
//                 </div>
//                 <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
//                   {data[1].title}
//                 </h3>
//                 <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 space-y-2 text-lg">
//                   {data[1].desc.map((point, i) => (
//                     <li key={i}>{point}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Third card - spans 4 columns, left aligned */}
//             <div className="col-span-12 md:col-span-5">
//               <div className="relative bg-white/20 backdrop-filter backdrop-blur-lg border-2 border-gray-400/80 rounded-xl p-8  transition-all duration-300 group dark:bg-gray-700/20 dark:border-gray-600/30 h-full">
//                 <div className="flex items-center justify-center w-16 h-16 bg-gray-900/20 text-blue-600 dark:text-blue-400 dark:bg-gray-700/50 rounded-full mb-6">
//                   {React.createElement(data[2].icon, { size: 32 })}
//                 </div>
//                 <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
//                   {data[2].title}
//                 </h3>
//                 <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 space-y-2 text-lg">
//                   {data[2].desc.map((point, i) => (
//                     <li key={i}>{point}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Fourth card - spans 4 columns, left aligned */}
//             <div className="col-span-12 md:col-span-5">
//               <div className="relative bg-white/20 backdrop-filter backdrop-blur-lg border-2 border-gray-400/80 rounded-xl p-8  transition-all duration-300 group dark:bg-gray-700/20 dark:border-gray-600/30 h-full">
//                 <div className="flex items-center justify-center w-16 h-16 bg-gray-900/20 text-blue-600 dark:text-blue-400 dark:bg-gray-700/50 rounded-full mb-6">
//                   {React.createElement(data[3].icon, { size: 32 })}
//                 </div>
//                 <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
//                   {data[3].title}
//                 </h3>
//                 <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 space-y-2 text-lg">
//                   {data[3].desc.map((point, i) => (
//                     <li key={i}>{point}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Empty space - spans 4 columns (creates the diagonal gap on the right) */}
//             <div className="col-span-12 md:col-span-7 hidden md:block"></div>

//             {/* Fifth card - spans 8 columns, left aligned (starts from column 1) */}
//             <div className="col-span-16 md:col-span-6">
//               <div className="relative bg-white/20 backdrop-filter backdrop-blur-lg border-2 border-gray-400/80 rounded-xl p-8  transition-all duration-300 group dark:bg-gray-700/20 dark:border-gray-600/30 h-full">
//                 <div className="flex items-center justify-center w-16 h-16 bg-gray-900/20 text-blue-600 dark:text-blue-400 dark:bg-gray-700/50 rounded-full mb-6">
//                   {React.createElement(data[4].icon, { size: 32 })}
//                 </div>
//                 <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
//                   {data[4].title}
//                 </h3>
//                 <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 space-y-2 text-lg">
//                   {data[4].desc.map((point, i) => (
//                     <li key={i}>{point}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



import React, { useState } from "react";
import { FaCogs, FaPlug, FaConnectdevelop, FaCodeBranch, FaProjectDiagram } from "react-icons/fa";

export default function AboutSection() {
  const [mousePosition, setMousePosition] = useState({});

  const handleMouseMove = (e, index) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left; // X position within the element
    const y = e.clientY - top;  // Y position within the element

    setMousePosition((prev) => ({
      ...prev,
      [index]: { x, y, visible: true }, // Add a 'visible' flag
    }));
  };

  const handleMouseLeave = (index) => {
    // Set visible to false, but keep x, y for a short duration to allow fade out
    setMousePosition((prev) => ({
      ...prev,
      [index]: { ...prev[index], visible: false },
    }));
    // Clean up after the fade-out transition
    setTimeout(() => {
      setMousePosition((prev) => {
        const newPos = { ...prev };
        delete newPos[index];
        return newPos;
      });
    }, 500); // Match CSS transition duration
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
    <section className="py-20 mt-10 min-h-screen flex justify-center">
      <div className="gap-12 mx-auto px-4 max-w-7xl w-[82%]">
        {/* Heading */}
        <div className="space-y-8 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600 ">
            AI Workflows for Everyone
          </h2>
          <p className="text-xl text-gray-800 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
            Tvara Studios bridges the gap between powerful AI capabilities and ease of use.
            Whether you're a developer building custom solutions or a business user automating
            workflows, we've got you covered.
          </p>
        </div>

        {/* Cards Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-2">
            {/* First large card - spans 6 columns */}
            <div
              className="col-span-12 md:col-span-6"
              onMouseMove={(e) => handleMouseMove(e, 0)}
              onMouseLeave={() => handleMouseLeave(0)}
              style={{
                background: mousePosition[0]?.visible
                  ? `radial-gradient(circle at ${mousePosition[0].x}px ${mousePosition[0].y}px, rgba(59, 130, 246, 0.3) 0%, transparent 90%)`
                  : "",
                transition: "background 0.5s ease-out",
              }}
            >
              <div className="relative bg-white/20 backdrop-filter backdrop-blur-lg border-2 border-gray-400/80 rounded-xl p-8 transition-all duration-300 group dark:bg-gray-700/20 dark:border-gray-600/30 h-full">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-900/20 text-blue-600 dark:text-blue-400 dark:bg-gray-700/50 rounded-full mb-6">
                  {React.createElement(data[0].icon, { size: 32 })}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {data[0].title}
                </h3>
                <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 space-y-2 text-lg">
                  {data[0].desc.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Second card - spans 6 columns */}
            <div
              className="col-span-12 md:col-span-6"
              onMouseMove={(e) => handleMouseMove(e, 1)}
              onMouseLeave={() => handleMouseLeave(1)}
              style={{
                background: mousePosition[1]?.visible
                  ? `radial-gradient(circle at ${mousePosition[1].x}px ${mousePosition[1].y}px, rgba(59, 130, 246, 0.3) 0%, transparent 90%)`
                  : "",
                transition: "background 0.5s ease-out",
              }}
            >
              <div className="relative bg-white/20 backdrop-filter backdrop-blur-lg border-2 border-gray-400/80 rounded-xl p-8 transition-all duration-300 group dark:bg-gray-700/20 dark:border-gray-600/30 h-full">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-900/20 text-blue-600 dark:text-blue-400 dark:bg-gray-700/50 rounded-full mb-6">
                  {React.createElement(data[1].icon, { size: 32 })}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {data[1].title}
                </h3>
                <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 space-y-2 text-lg">
                  {data[1].desc.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Third card - spans 5 columns */}
            <div
              className="col-span-12 md:col-span-5"
              onMouseMove={(e) => handleMouseMove(e, 2)}
              onMouseLeave={() => handleMouseLeave(2)}
              style={{
                background: mousePosition[2]?.visible
                  ? `radial-gradient(circle at ${mousePosition[2].x}px ${mousePosition[2].y}px, rgba(59, 130, 246, 0.3) 0%, transparent 90%)`
                  : "",
                transition: "background 0.5s ease-out",
              }}
            >
              <div className="relative bg-white/20 backdrop-filter backdrop-blur-lg border-2 border-gray-400/80 rounded-xl p-8 transition-all duration-300 group dark:bg-gray-700/20 dark:border-gray-600/30 h-full">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-900/20 text-blue-600 dark:text-blue-400 dark:bg-gray-700/50 rounded-full mb-6">
                  {React.createElement(data[2].icon, { size: 32 })}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {data[2].title}
                </h3>
                <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 space-y-2 text-lg">
                  {data[2].desc.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Fourth card - spans 5 columns */}
            <div
              className="col-span-12 md:col-span-5"
              onMouseMove={(e) => handleMouseMove(e, 3)}
              onMouseLeave={() => handleMouseLeave(3)}
              style={{
                background: mousePosition[3]?.visible
                  ? `radial-gradient(circle at ${mousePosition[3].x}px ${mousePosition[3].y}px, rgba(59, 130, 246, 0.3) 0%, transparent 90%)`
                  : "",
                transition: "background 0.5s ease-out",
              }}
            >
              <div className="relative bg-white/20 backdrop-filter backdrop-blur-lg border-2 border-gray-400/80 rounded-xl p-8 transition-all duration-300 group dark:bg-gray-700/20 dark:border-gray-600/30 h-full">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-900/20 text-blue-600 dark:text-blue-400 dark:bg-gray-700/50 rounded-full mb-6">
                  {React.createElement(data[3].icon, { size: 32 })}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {data[3].title}
                </h3>
                <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 space-y-2 text-lg">
                  {data[3].desc.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Empty space */}
            <div className="col-span-12 md:col-span-7 hidden md:block"></div>

            {/* Fifth card - spans 6 columns */}
            <div
              className="col-span-16 md:col-span-6 -translate-y-2"
              onMouseMove={(e) => handleMouseMove(e, 4)}
              onMouseLeave={() => handleMouseLeave(4)}
              style={{
                background: mousePosition[4]?.visible
                  ? `radial-gradient(circle at ${mousePosition[4].x}px ${mousePosition[4].y}px, rgba(59, 130, 246, 0.3) 0%, transparent 90%)`
                  : "",
                transition: "background 0.5s ease-out",
              }}
            >
              <div className="relative bg-white/20 backdrop-filter backdrop-blur-lg border-2 border-gray-400/80 rounded-xl p-8 transition-all duration-300 group dark:bg-gray-700/20 dark:border-gray-600/30 h-full">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-900/20 text-blue-600 dark:text-blue-400 dark:bg-gray-700/50 rounded-full mb-6">
                  {React.createElement(data[4].icon, { size: 32 })}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {data[4].title}
                </h3>
                <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 space-y-2 text-lg">
                  {data[4].desc.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
