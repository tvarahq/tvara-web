import { Calendar } from "lucide-react";

export default function AddTool({ tool, isSelected = false, onClick }) {
  return (
    <div
      className={`
        bg-gray-900 hover:bg-gray-800 border-purple-500 border-dashed
        border-2 rounded-lg p-4 mb-3 cursor-pointer
        transition-all duration-200 hover:shadow-lg w-59
        ${isSelected ? 'ring-2 ring-purple-400' : ''}
      `}
      onClick={() => onClick?.(tool)}
    >
      <div className="flex items-center space-x-3">
        <Calendar className="w-6 h-6 text-purple-400" />
        <div className="flex-1">
          <h3 className="text-white font-medium text-sm">{tool.name}</h3>
          <p className="text-gray-400 text-xs mt-1">{tool.description}</p>
        </div>
      </div>
    </div>
  );
}