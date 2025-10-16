import React from 'react';
import { Handle, Position } from '@xyflow/react';

const TaskNode = ({ data, selected }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'running': return 'bg-yellow-500';
      case 'pending': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div 
      className={`px-4 py-3 rounded-lg shadow-lg border-2 transition-all duration-200 ${
        selected ? 'ring-2 ring-green-400 ring-opacity-50' : ''
      }`}
      style={{
        background: '#e8f5e8',
        borderColor: '#2e7d32',
        minWidth: '200px',
        minHeight: '100px'
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#2e7d32', width: '8px', height: '8px' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#2e7d32', width: '8px', height: '8px' }}
      />
      
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(data.status)}`}></div>
          <span className="text-sm font-semibold text-green-800">
            {data.label}
          </span>
        </div>
        <p className="text-xs text-green-600 mb-2">
          {data.description}
        </p>
        {data.expected_output && (
          <div className="text-xs text-green-500 italic">
            Output: {data.expected_output.substring(0, 40)}...
          </div>
        )}
        {data.assigned_agent && (
          <div className="text-xs text-green-700 font-medium mt-1">
            Agent: {data.assigned_agent}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskNode;
