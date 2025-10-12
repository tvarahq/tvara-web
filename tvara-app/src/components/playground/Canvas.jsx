import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState, useCallback } from 'react';
import AgentNode from './nodes/AgentNode';
import React from 'react';

const nodeTypes = {
  agentNode: AgentNode,
  default: AgentNode,
};

export default function Canvas({ onAddNode, onDeleteSelectedNodes }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  // Function to add node - called from external components via global reference
  const addNode = (nodeData = null) => {
    const newNode = {
      id: `node-${Date.now()}`,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: nodeData || { label: `Node ${nodes.length + 1}` },
      type: 'agentNode',
    };
    setNodes((nds) => [...nds, newNode]);
    onAddNode?.(newNode); // Notify parent component
  };

  // Function to delete selected nodes
  const deleteSelectedNodes = () => {
    setNodes((nds) =>
      nds.filter((n) => !selectedNodes.some((sel) => sel.id === n.id))
    );

    setEdges((eds) =>
      eds.filter(
        (e) =>
          !selectedNodes.some(
            (sel) => sel.id === e.source || sel.id === e.target
          )
      )
    );
    onDeleteSelectedNodes?.(selectedNodes); // Notify parent component
  };

  // Expose functions to external components via global references
  React.useEffect(() => {
    window.canvasAddNode = addNode;
    window.canvasDeleteSelectedNodes = deleteSelectedNodes;
    return () => {
      delete window.canvasAddNode;
      delete window.canvasDeleteSelectedNodes;
    };
  }, [nodes.length]); // Re-run when nodes change to update the closure

  return (
    <div className='w-full h-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        // colorMode='dark'
        style={{ backgroundColor: '#0f181f' }}
        fitView
        onSelectionChange={({ nodes }) => setSelectedNodes(nodes)}
      >
        <Background variant="dots" color="#fff" gap={20} size={1} />
        <Controls />
        <MiniMap style={{ backgroundColor: "#242424" }} />
      </ReactFlow>
    </div>
  );
}