import React from 'react';

const NodeDetailsPanel = ({ selectedNode, onClose }) => {
  if (!selectedNode) return null;

  const renderNodeDetails = () => {
    switch (selectedNode.type) {
      case 'input':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-800">User Input</h3>
            <p className="text-sm text-gray-600">{selectedNode.data.description}</p>
          </div>
        );

      case 'agent':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-800">{selectedNode.data.label}</h3>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-700">Role:</span>
                <p className="text-sm text-gray-600">{selectedNode.data.description}</p>
              </div>
              {selectedNode.data.backstory && (
                <div>
                  <span className="font-medium text-gray-700">Backstory:</span>
                  <p className="text-sm text-gray-600">{selectedNode.data.backstory}</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'task':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800">{selectedNode.data.label}</h3>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-700">Description:</span>
                <p className="text-sm text-gray-600">{selectedNode.data.description}</p>
              </div>
              {selectedNode.data.expected_output && (
                <div>
                  <span className="font-medium text-gray-700">Expected Output:</span>
                  <p className="text-sm text-gray-600">{selectedNode.data.expected_output}</p>
                </div>
              )}
              {selectedNode.data.assigned_agent && (
                <div>
                  <span className="font-medium text-gray-700">Assigned Agent:</span>
                  <p className="text-sm text-gray-600">{selectedNode.data.assigned_agent}</p>
                </div>
              )}
              {selectedNode.data.status && (
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                    selectedNode.data.status === 'completed' ? 'bg-green-100 text-green-800' :
                    selectedNode.data.status === 'running' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedNode.data.status}
                  </span>
                </div>
              )}
            </div>
          </div>
        );

      case 'output':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-800">Final Output</h3>
            <p className="text-sm text-gray-600">{selectedNode.data.description}</p>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">{selectedNode.data.label}</h3>
            <p className="text-sm text-gray-600">{selectedNode.data.description}</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed top-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Node Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4">
        {renderNodeDetails()}
      </div>
    </div>
  );
};

export default NodeDetailsPanel;
