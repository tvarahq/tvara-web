import React from 'react';
import { Handle, Position } from '@xyflow/react';

const WorkflowAgentNode = ({ data, selected }) => {
  return (
    <div 
      className={`px-4 py-3 rounded-lg shadow-lg border-2 transition-all duration-200 ${
        selected ? 'ring-2 ring-purple-400 ring-opacity-50' : ''
      }`}
      style={{
        background: '#f3e5f5',
        borderColor: '#7b1fa2',
        minWidth: '200px',
        minHeight: '100px'
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#7b1fa2', width: '8px', height: '8px' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#7b1fa2', width: '8px', height: '8px' }}
      />
      
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
          <span className="text-sm font-semibold text-purple-800">
            {data.label}
          </span>
        </div>
        <p className="text-xs text-purple-600 mb-2">
          {data.description}
        </p>
        {data.backstory && (
          <div className="text-xs text-purple-500 italic">
            {data.backstory.substring(0, 50)}...
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowAgentNode;
