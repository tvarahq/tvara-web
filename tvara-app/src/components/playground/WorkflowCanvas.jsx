import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ReactFlow, Background, Controls, MiniMap, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Import custom node components
import InputNode from './nodes/InputNode';
import WorkflowAgentNode from './nodes/WorkflowAgentNode';
import TaskNode from './nodes/TaskNode';
import OutputNode from './nodes/OutputNode';
import NodeDetailsPanel from './NodeDetailsPanel';

const nodeTypes = {
  input: InputNode,
  agent: WorkflowAgentNode,
  task: TaskNode,
  output: OutputNode,
};

const WorkflowCanvas = ({ workflowData, onWorkflowLoad }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const reactFlowWrapper = useRef(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Export functionality
  const exportWorkflow = useCallback(async (format = 'png') => {
    try {
      if (format === 'png') {
        // Export as PNG - simplified version
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = 1920;
        canvas.height = 1080;
        
        // Fill background
        ctx.fillStyle = '#0f181f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw workflow info
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.fillText('CrewAI Workflow', 50, 100);
        
        ctx.font = '16px Arial';
        ctx.fillText(`Nodes: ${nodes.length}`, 50, 150);
        ctx.fillText(`Edges: ${edges.length}`, 50, 180);
        ctx.fillText(`Exported: ${new Date().toLocaleString()}`, 50, 210);
        
        // Download the image
        const link = document.createElement('a');
        link.download = `workflow-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } else if (format === 'json') {
        // Export as JSON
        const workflowExport = {
          nodes: nodes,
          edges: edges,
          exportedAt: new Date().toISOString(),
          workflowData: workflowData
        };
        
        const dataStr = JSON.stringify(workflowExport, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `workflow-${Date.now()}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Export failed:', err);
    }
  }, [nodes, edges, workflowData]);

  // Load workflow data
  useEffect(() => {
    const loadWorkflow = async () => {
      if (!workflowData) return;

      try {
        setLoading(true);
        setError(null);

        // Transform the API response to React Flow format
        const flowNodes = workflowData.visualization.nodes.map(node => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: {
            ...node.data,
            status: getNodeStatus(node.id, workflowData.execution_plan)
          },
          style: node.style
        }));

        const flowEdges = workflowData.visualization.edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          type: edge.type,
          animated: edge.animated,
          style: edge.style
        }));

        setNodes(flowNodes);
        setEdges(flowEdges);
        
        // Notify parent component that workflow is loaded
        onWorkflowLoad?.(workflowData);
      } catch (err) {
        setError(err.message);
        console.error('Error loading workflow:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWorkflow();
  }, [workflowData, onWorkflowLoad]);

  // Helper function to get node status from execution plan
  const getNodeStatus = (nodeId, executionPlan) => {
    if (!executionPlan || !executionPlan.steps) return 'pending';
    
    const step = executionPlan.steps.find(step => 
      step.task_id === nodeId || 
      `task_${step.task_id}` === nodeId ||
      `agent_${step.assigned_agent}` === nodeId
    );
    
    return step?.status || 'pending';
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Loading workflow...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-white mb-4">Error loading workflow</p>
          <p className="text-gray-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (nodes.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <p className="text-white">No workflow data available</p>
          <p className="text-gray-400 text-sm">Generate a workflow to see the visualization</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative" ref={reactFlowWrapper}>
      {/* Export Controls */}
      {nodes.length > 0 && (
        <div className="absolute top-4 left-4 z-10 flex space-x-2">
          <button
            onClick={() => exportWorkflow('png')}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg shadow-lg transition-colors"
            title="Export as PNG"
          >
            📷 PNG
          </button>
          <button
            onClick={() => exportWorkflow('json')}
            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg shadow-lg transition-colors"
            title="Export as JSON"
          >
            📄 JSON
          </button>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        style={{ backgroundColor: '#0f181f' }}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background variant="dots" color="#374151" gap={20} size={1} />
        <Controls 
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid #374151',
            borderRadius: '8px'
          }}
        />
        <MiniMap 
          style={{ 
            backgroundColor: "#1f2937",
            border: '1px solid #374151'
          }}
          nodeColor={(node) => {
            switch (node.type) {
              case 'input': return '#0277bd';
              case 'agent': return '#7b1fa2';
              case 'task': return '#2e7d32';
              case 'output': return '#f57c00';
              default: return '#6b7280';
            }
          }}
        />
      </ReactFlow>

      {/* Node Details Panel */}
      {selectedNode && (
        <NodeDetailsPanel
          selectedNode={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
};

export default WorkflowCanvas;
