import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { sidebarData } from "../../utils/sidebar";

function SideBar({ selectedAnchor, onAnchorSelect }) {
  const [expandedNodes, setExpandedNodes] = useState(new Set(["parent-0"]));

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
    <div className="text-white border-r-[0.5px] border-gray-700 w-72 bg-black h-screen overflow-y-auto select-none custom-scrollbar">
      <div className="flex items-center justify-between h-12 px-3 py-8 border-b-[0.5px] border-gray-700">
        <h2 className="text-white font-bold text-2xl">Tvara Docs</h2>
      </div>

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