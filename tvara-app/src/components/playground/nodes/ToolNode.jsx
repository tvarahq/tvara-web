import { Handle } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default function ToolNode({ tool_name, description, tool_id }) {
    return (
        <div>
            <div
                className=" bg-gray-900 hover:bg-gray-800 border-purple-500  border-dashed border-2 rounded-lg p-4 mb-3 cursor-pointer transition-all duration-200 hover:shadow-lg w-59"
            >
                <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6 ext-purple-400" />
                    <div className="flex-1">
                        <h3 className="text-canvas-text font-medium text-sm">{tool_name}</h3>
                        <p className="text-canvas-text/80 text-xs mt-1">{description}</p>
                    </div>
                </div>
            </div>
            <Handle type="source" position="top" />
            <Handle type="target" position="bottom" />
        </div>
    );
}