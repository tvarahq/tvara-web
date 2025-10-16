import React from 'react';
import { Handle, Position } from '@xyflow/react';

const InputNode = ({ data, selected }) => {
  return (
    <div 
      className={`px-4 py-3 rounded-lg shadow-lg border-2 transition-all duration-200 ${
        selected ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
      }`}
      style={{
        background: '#e1f5fe',
        borderColor: '#0277bd',
        minWidth: '150px',
        minHeight: '60px'
      }}
    >
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#0277bd', width: '8px', height: '8px' }}
      />
      
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-sm font-semibold text-blue-800">
            {data.label}
          </span>
        </div>
        <p className="text-xs text-blue-600 text-center">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default InputNode;
