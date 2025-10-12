import React, { useState } from "react";
import { Plus, Info } from "lucide-react";
import AddAgent from "../../components/buttons/AddAgent";
import AddTool from "../../components/buttons/AddTool";

export default function NodesSideBar({ onAddNode, onDeleteSelectedNodes  }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [collapsed, setCollapsed] = useState(true);
    // Sample data
    const agents = [
        { id: 1, name: 'Data Analyst Agent', description: 'Analyzes datasets' },
        { id: 2, name: 'Content Writer Agent', description: 'Creates content' },
        { id: 3, name: 'Code Review Agent', description: 'Optimizes code' }
    ];

    const tools = [
        { id: 4, name: 'Research Assistant', description: 'Conducts research' },
        { id: 5, name: 'Creative Designer', description: 'Generates creative' }
    ];

    const handleItemSelect = (item) => {
        setSelectedItem(item);
        console.log('Selected item:', item);
    };

    return (
        <div className={`h-[88.6vh] overflow-y-auto flex flex-col items-center ${collapsed ? "w-14 " : "min-w-65"}`}>
            <button className={`flex justify-center`}>
                <Plus
                    onClick={() => setCollapsed(!collapsed)}
                    size={30}
                    className={`p-1 rounded-full bg-[#818089] text-white flex-shrink-0 ${collapsed ? "block mt-8" : "hidden mt-0"} `}
                />


            </button>
            <div className="p-3">
                {!collapsed && (
                    <div className="">
                        <div className="max-w-md mx-auto">
                            {/* Header */}
                            <div className="text-canvas-text/80 flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-2">
                                    <div className="">
                                        <Plus className="" />
                                    </div>
                                    <h1 className="font-medium ">Available Agents (19)</h1>
                                    <div className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center">
                                        <span className="text-gray-400 text-xs">
                                            <Info />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Agent Groups */}
                            <div className="mb-6">
                                <h2 className="text-gray-400 text-sm font-medium tracking-wider uppercase mb-3">
                                    Available Agents
                                </h2>
                                {agents.map((agent) => (
                                    <AddAgent
                                        onAddNode={onAddNode}
                                        onDeleteSelectedNodes={onDeleteSelectedNodes}
                                    />
                                ))}
                            </div>

                            <div className="mb-6">
                                <h2 className="text-gray-400 text-sm font-medium tracking-wider uppercase mb-3">
                                    Available Tools
                                </h2>
                                {tools.map((tool) => (
                                    <AddTool
                                        key={tool.id}
                                        tool={tool}
                                        isSelected={selectedItem?.id === tool.id}
                                        onClick={handleItemSelect}
                                    />
                                ))}
                            </div>

                            {/* Selected Agent Info */}
                            {selectedItem && (
                                <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                                    <h3 className="text-white font-medium mb-2">Selected Item</h3>
                                    <p className="text-blue-400 text-sm">{selectedItem.name}</p>
                                    <p className="text-gray-400 text-xs mt-1">{selectedItem.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}
