import {Handle } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Calendar } from "lucide-react";
export default function AgentNode({ agent_name, description, agent_id }) {
    return (
        <div>
            <div
                className=" bg-gray-800 hover:bg-gray-750 border-blue-500 border-2 rounded-lg p-4 mb-3 cursor-pointer transition-all duration-200 hover:shadow-lg w-40"
            >
                <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6 text-blue-400" />
                    <div className="flex-1">
                        <h3 className="text-canvas-text font-medium text-sm">Hello Agent</h3>
                        <p className="text-canvas-text/80 text-xs mt-1">This is a description</p>
                    </div>
                    {/* <div className="flex-1">
                        <h3 className="text-canvas-text font-medium text-sm">{agent_name}</h3>
                        <p className="text-canvas-text/80 text-xs mt-1">{description}</p>
                    </div> */}
                </div>
            </div>
            <Handle type="source" position="top" />
            <Handle type="target" position="bottom" />
        </div>
    );
}