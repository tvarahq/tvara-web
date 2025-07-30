// import React from "react";
// export default function AboutSection() {
//   const data = [
//     {
//       title: "Universal Agent Framework",
//       desc: ["Build agents with any LLM, any tool, any connector.", "Mix and match models, prompts, and capabilities."]
//     },
//     {
//       title: "Plug-and-Play Tools",
//       desc: ["Add tools like web search, code execution, or your own APIs in seconds.", "Tools are first-class citizens: agents can call them autonomously."]
//     },
//     {
//       title: "Connectors for Everything",
//       desc: ["Integrate with Slack, Discord, email, databases, and more.", "Bring your agents into your favorite apps and workflows."]
//     },
//     {
//       title: "Open, Extensible, Yours",
//       desc: ["100% open-source. No vendor lock-in.", "Bring your own models, tools, and data."]
//     },
//     {
//       title: "Visual Workflow Orchestration (coming soon!)",
//       desc: ["Drag-and-drop interface to design multi-agent workflows.", "Automate, chain, and parallelize agent actions, no code required."]
//     }
//   ]
//   return (
//     <section className="py-20 mt-10">
//       <div className="gap-12 mx-auto px-4">
//         {/* Content */}
//         <div className="space-y-8">
//           <div className=" flex flex-col items-center">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center block text-transparent bg-clip-text bg-gradient-to-r from-[#4384c1] to-blue-600">
//               AI Workflows for Everyone
//             </h2>
//             <p className="text-xl text-gray-200 leading-relaxed w-[80%] text-center">
//               Tvara Studios bridges the gap between powerful AI capabilities and ease of use.
//               Whether you're a developer building custom solutions or a business user automating
//               workflows, we've got you covered.
//             </p>
//           </div>

//           <div className="flex">
//             <div className="space-y-6">
//               {data.map((item, index) => (
//                 <div
//                   key={index}
//                   className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-blue-100 hover:border-blue-200 transition-colors">
//                   <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
//                   <p className="text-gray-600">
//                     {item.desc}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



import React from "react";
import { FaCogs, FaPlug, FaConnectdevelop, FaCodeBranch, FaProjectDiagram } from "react-icons/fa";

export default function AboutSection() {
  const data = [
    {
      title: "Universal Agent Framework",
      desc: [
        "Build agents with any LLM, any tool, any connector.",
        "Mix and match models, prompts, and capabilities."
      ],
      icon: FaCogs
    },
    {
      title: "Plug-and-Play Tools",
      desc: [
        "Add tools like web search, code execution, or your own APIs in seconds.",
        "Tools are first-class citizens: agents can call them autonomously."
      ],
      icon: FaPlug
    },
    {
      title: "Connectors for Everything",
      desc: [
        "Integrate with Slack, Discord, email, databases, and more.",
        "Bring your agents into your favorite apps and workflows."
      ],
      icon: FaConnectdevelop
    },
    {
      title: "Open, Extensible, Yours",
      desc: [
        "100% open-source. No vendor lock-in.",
        "Bring your own models, tools, and data."
      ],
      icon: FaCodeBranch
    },
    {
      title: "Visual Workflow Orchestration (coming soon!)",
      desc: [
        "Drag-and-drop interface to design multi-agent workflows.",
        "Automate, chain, and parallelize agent actions, no code required."
      ],
      icon: FaProjectDiagram
    }
  ];

  return (
    <section className="py-20 mt-10">
      <div className="gap-12 mx-auto px-4">
        {/* Heading */}
        <div className="space-y-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-blue-600 dark:bg-blue-700 ">
            AI Workflows for Everyone
          </h2>
          <p className="text-xl dark:text-gray-200 leading-relaxed w-[80%] mx-auto text-gray-900 ">
            Tvara Studios bridges the gap between powerful AI capabilities and ease of use.
            Whether you're a developer building custom solutions or a business user automating
            workflows, we've got you covered.
          </p>
        </div>

        {/* Cards */}
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap gap-6 mt-12 w-[80%]">
            {data.map((item, index) => (
              <div
                key={index}
                className="relative bg-white/20 backdrop-filter backdrop-blur-lg border border-gray-200/50 rounded-xl p-6 shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-gray-700/20 dark:border-gray-600/30"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 text-blue-600 dark:text-blue-400 bg-white/30 rounded-full mb-4">
                  <item.icon size={30} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {item.title}
                </h3>

                {/* Description as bullet points */}
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  {item.desc.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
