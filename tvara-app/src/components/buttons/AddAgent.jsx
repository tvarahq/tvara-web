import { Calendar } from "lucide-react";
import AgentNode from "../playground/nodes/AgentNode";


export default function AddAgent({ onAddNode, onDeleteSelectedNodes }) {

  const addNode = () => {
    const nodeData = { label: `Node ${Date.now()}` };

    // Call the canvas add node function
    if (window.canvasAddNode) {
      window.canvasAddNode(nodeData);
    }

    // Also call the parent callback if provided
    onAddNode?.(nodeData);
  };

  return (
    <div
      className={`
        bg-gray-800 hover:bg-gray-750 border-blue-500
        border-2 rounded-lg p-4 mb-3 cursor-pointer
        transition-all duration-200 hover:shadow-lg w-59
       
      `}
      onClick={addNode}
    >
      <div className="flex items-center space-x-3">
        <Calendar className="w-6 h-6 text-blue-400" />
        <div className="flex-1">
          <h3 className="text-white font-medium text-sm">Agent</h3>
          <p className="text-gray-400 text-xs mt-1">Working</p>
        </div>
      </div>
    </div>
  );
}