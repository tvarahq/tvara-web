import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { docsContent } from "../../utils/docsContent";

function SideBar({ selectedAnchor, onAnchorSelect }) {
  const [expandedNodes, setExpandedNodes] = useState(new Set(["parent-0"]));

  const sidebarData = [
    {
      id: "parent-0",
      title: "Getting Started",
      children: [
        {
          id: "child-0-0",
          title: "Overview",
          anchors: [{ id: "anchor-0-0", title: docsContent["anchor-0-0"]?.title || "Getting Started" }]
        },
        {
          id: "child-0-1", 
          title: "Setup",
          anchors: [
            { id: "anchor-0-1", title: docsContent["anchor-0-1"]?.title || "Installation" },
            { id: "anchor-0-2", title: docsContent["anchor-0-2"]?.title || "Quick Start" }
          ]
        }
      ]
    },
    {
      id: "parent-1",
      title: "Core Concepts",
      children: [
        {
          id: "child-1-0",
          title: "Agents",
          anchors: [
            { id: "anchor-1-0", title: docsContent["anchor-1-0"]?.title || "Agents" },
            { id: "anchor-1-1", title: docsContent["anchor-1-1"]?.title || "Agent Configuration" },
            { id: "anchor-1-2", title: docsContent["anchor-1-2"]?.title || "Supported Models" }
          ]
        }
      ]
    },
    {
      id: "parent-2",
      title: "Workflows",
      children: [
        {
          id: "child-2-0",
          title: "Workflow Types",
          anchors: [
            { id: "anchor-2-0", title: docsContent["anchor-2-0"]?.title || "Workflows" },
            { id: "anchor-2-1", title: docsContent["anchor-2-1"]?.title || "Sequential Workflows" },
            { id: "anchor-2-2", title: docsContent["anchor-2-2"]?.title || "Supervised Workflows" }
          ]
        }
      ]
    },
    {
      id: "parent-3",
      title: "Integrations",
      children: [
        {
          id: "child-3-0",
          title: "Tools & Services",
          anchors: [
            { id: "anchor-3-0", title: docsContent["anchor-3-0"]?.title || "Tools & Integrations" },
            { id: "anchor-3-1", title: docsContent["anchor-3-1"]?.title || "Authentication & Caching" }
          ]
        }
      ]
    },
    {
      id: "parent-4",
      title: "Configuration",
      children: [
        {
          id: "child-4-0",
          title: "Setup & Customization",
          anchors: [
            { id: "anchor-4-0", title: docsContent["anchor-4-0"]?.title || "Configuration" },
            { id: "anchor-4-1", title: docsContent["anchor-4-1"]?.title || "Custom Prompts" }
          ]
        }
      ]
    },
    {
      id: "parent-5",
      title: "Advanced Usage",
      children: [
        {
          id: "child-5-0",
          title: "Workflow Management",
          anchors: [
            { id: "anchor-5-0", title: docsContent["anchor-5-0"]?.title || "Workflow Management" },
            { id: "anchor-5-1", title: docsContent["anchor-5-1"]?.title || "Result Handling" }
          ]
        }
      ]
    },
    {
      id: "parent-6",
      title: "Best Practices",
      children: [
        {
          id: "child-6-0",
          title: "Guidelines & Optimization",
          anchors: [
            { id: "anchor-6-0", title: docsContent["anchor-6-0"]?.title || "Best Practices" },
            { id: "anchor-6-1", title: docsContent["anchor-6-1"]?.title || "Debugging & Monitoring" }
          ]
        }
      ]
    },
    {
      id: "parent-7",
      title: "Examples",
      children: [
        {
          id: "child-7-0",
          title: "Use Cases & Features",
          anchors: [
            { id: "anchor-7-0", title: docsContent["anchor-7-0"]?.title || "Examples & Use Cases" },
            { id: "anchor-7-1", title: docsContent["anchor-7-1"]?.title || "Advanced Features" }
          ]
        }
      ]
    },
    {
      id: "parent-8",
      title: "Help & Support",
      children: [
        {
          id: "child-8-0",
          title: "Common Issues",
          anchors: [
            { id: "anchor-8-0", title: docsContent["anchor-8-0"]?.title || "FAQ" },
            { id: "anchor-8-1", title: docsContent["anchor-8-1"]?.title || "Troubleshooting" }
          ]
        }
      ]
    },
    {
      id: "parent-9",
      title: "Community",
      children: [
        {
          id: "child-9-0",
          title: "Get Involved",
          anchors: [
            { id: "anchor-9-0", title: docsContent["anchor-9-0"]?.title || "Community & Support" },
            { id: "anchor-9-1", title: docsContent["anchor-9-1"]?.title || "Roadmap & Future" }
          ]
        }
      ]
    }
  ];

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const selectAnchor = (anchorId) => {
    onAnchorSelect(anchorId);
  };

  return (
    <div className="text-white border-r-[0.5px] border-gray-700 w-[85vw] max-w-xs md:w-72 bg-black h-screen md:h-[calc(100vh-0px)] overflow-y-auto select-none custom-scrollbar">

      <ul className="space-y-2 text-md p-4">
        {sidebarData.map((parentNode) => (
          <li key={parentNode.id}>
            <div
              className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-800 rounded px-2"
              onClick={() => toggleNode(parentNode.id)}
            >
              {parentNode.children ? (
                expandedNodes.has(parentNode.id) ? (
                  <ChevronDown size={16} className="text-gray-400" />
                ) : (
                  <ChevronRight size={16} className="text-gray-400" />
                )
              ) : (
                <div className="w-4" />
              )}
              <span className="font-medium">{parentNode.title}</span>
            </div>

            {parentNode.children && expandedNodes.has(parentNode.id) && (
              <ul className="ml-2 relative">
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-700"></div>

                <div className="ml-4 space-y-1">
                  {parentNode.children.map((childNode) => (
                    <li key={childNode.id}>
                      <div className="flex items-center gap-2 py-1 relative">
                        <span className="text-gray-300">{childNode.title}</span>
                      </div>

                      {childNode.anchors && (
                        <ul className="ml-4">
                          <div className="ml-4 space-y-1">
                            {childNode.anchors.map((anchor) => (
                              <li key={anchor.id} className="relative">
                                {selectedAnchor === anchor.id && (
                                  <div className="absolute left-[-20px] top-0 bottom-0 w-1 bg-primary rounded-r"></div>
                                )}

                                <button
                                  onClick={() => selectAnchor(anchor.id)}
                                  className={`text-left py-1 px-2 rounded transition-colors cursor-pointer w-full ${
                                    selectedAnchor === anchor.id
                                      ? "text-primary bg-primary/10"
                                      : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                                  }`}
                                >
                                  {anchor.title}
                                </button>
                              </li>
                            ))}
                          </div>
                        </ul>
                      )}
                    </li>
                  ))}
                </div>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;