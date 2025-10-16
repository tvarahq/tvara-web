import React from 'react';
import { Handle, Position } from '@xyflow/react';

const OutputNode = ({ data, selected }) => {
  return (
    <div 
      className={`px-4 py-3 rounded-lg shadow-lg border-2 transition-all duration-200 ${
        selected ? 'ring-2 ring-orange-400 ring-opacity-50' : ''
      }`}
      style={{
        background: '#fff3e0',
        borderColor: '#f57c00',
        minWidth: '150px',
        minHeight: '60px'
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#f57c00', width: '8px', height: '8px' }}
      />
      
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
          <span className="text-sm font-semibold text-orange-800">
            {data.label}
          </span>
        </div>
        <p className="text-xs text-orange-600 text-center">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default OutputNode;
