import React, { useState, useCallback } from 'react';
import { Cpu, Zap, Database, Globe, Share2 } from 'lucide-react';
import { ReactFlow, Background, applyNodeChanges, applyEdgeChanges, addEdge, Handle } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default function DragDropCanvas() {
  const [draggedItem, setDraggedItem] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const componentTypes = [
    { id: 'trigger', name: 'Trigger', icon: Zap, color: '#f97316' },
    { id: 'agent', name: 'AI Agent', icon: Cpu, color: '#3b82f6' },
    { id: 'database', name: 'Database', icon: Database, color: '#10b981' },
    { id: 'api', name: 'API Call', icon: Globe, color: '#8b5cf6' },
    { id: 'webhook', name: 'Webhook', icon: Share2, color: '#06b6d4' }
  ];

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItem) {
      const rect = e.currentTarget.getBoundingClientRect();
      const position = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      const id = `${draggedItem.id}-${Date.now()}`;
      const label = draggedItem.name;

      setNodes((prev) => ([
        ...prev,
        {
          id,
          position,
          data: { label, Icon: draggedItem.icon, color: draggedItem.color },
          type: draggedItem.id === 'agent'
            ? 'agentNode'
            : draggedItem.id === 'database'
            ? 'dbNode'
            : draggedItem.id === 'trigger'
            ? 'triggerNode'
            : 'toolNode'
        }
      ]));
      setDraggedItem(null);
    }
  };

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: false, style: { stroke: '#6b7280' } }, eds)), []);

  const TriggerNode = ({ data }) => {
    const IconComp = data.Icon || Zap;
    return (
      <div>
        <div className="p-3 rounded-lg bg-gray-800 border border-gray-600 text-white flex items-center gap-2 min-w-[160px] shadow-lg">
          <IconComp size={18} style={{ color: data.color || '#f97316' }} />
          <div className="font-semibold text-sm">{data.label}</div>
        </div>
        <Handle type="source" position="right" style={{ width: 10, height: 10, backgroundColor: '#f97316' }} />
      </div>
    );
  };

  const AgentNode = ({ data }) => {
    const IconComp = data.Icon || Cpu;
    return (
      <div>
        <div className="p-4 rounded-lg bg-gray-800 border border-gray-600 text-white flex flex-col items-center justify-center min-w-[200px] min-h-[100px] shadow-lg relative">
          <IconComp size={22} style={{ color: data.color || '#3b82f6' }} className="mb-2" />
          <div className="font-semibold text-sm">{data.label}</div>
          <div className="absolute -bottom-2 bg-gray-600 rounded-full p-1"><div className="w-2 h-2 bg-white rounded-full"/></div>
        </div>
        <Handle type="target" position="left" style={{ width: 10, height: 10, backgroundColor: '#3b82f6' }} />
        <Handle type="source" position="right" style={{ width: 10, height: 10, backgroundColor: '#3b82f6' }} />
        <Handle type="source" position="bottom" style={{ width: 10, height: 10, backgroundColor: '#3b82f6', top: '85%' }} />
      </div>
    );
  };

  const DbNode = ({ data }) => {
    const IconComp = data.Icon || Database;
    return (
      <div>
        <div className="p-3 rounded-lg bg-gray-800 border border-gray-600 text-white flex items-center gap-2 min-w-[160px] shadow-lg">
          <IconComp size={18} style={{ color: data.color || '#10b981' }} />
          <div className="font-medium text-sm">{data.label}</div>
        </div>
        <Handle type="target" position="left" style={{ width: 10, height: 10, backgroundColor: '#10b981' }} />
        <Handle type="source" position="right" style={{ width: 10, height: 10, backgroundColor: '#10b981' }} />
      </div>
    );
  };

  const ToolNode = ({ data }) => {
    const IconComp = data.Icon || Globe;
    return (
      <div>
        <div className="w-14 h-14 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center shadow-lg">
          <IconComp size={20} style={{ color: data.color || '#06b6d4' }} />
        </div>
        <div className="text-white text-xs text-center mt-2 font-medium">{data.label}</div>
        <Handle type="target" position="top" style={{ width: 10, height: 10, backgroundColor: '#6b7280' }} />
      </div>
    );
  };

  const nodeTypes = { triggerNode: TriggerNode, agentNode: AgentNode, dbNode: DbNode, toolNode: ToolNode };

  return (
    <div className="w-full h-full bg-[#0f181f] flex">
      <div className="w-64 bg-gray-900/70 backdrop-blur-sm p-4 border-r border-gray-700">
        <h3 className="text-white font-bold mb-4">Components</h3>
        <div className="space-y-2">
          {componentTypes.map((component) => (
            <div
              key={component.id}
              draggable
              onDragStart={() => handleDragStart(component)}
              className="flex items-center gap-3 p-3 bg-gray-800/80 border border-gray-700 rounded-lg cursor-move hover:bg-gray-800 transition-colors shadow-sm hover:shadow-md"
            >
              <component.icon size={20} style={{ color: component.color }} />
              <span className="text-white font-medium">{component.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div 
        className="flex-1 relative"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="absolute inset-4 border border-gray-700 rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm shadow-xl">
          <ReactFlow 
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            style={{ backgroundColor: '#0f181f' }}
          >
            <Background variant="dots" color="#fff" gap={20} size={1}/>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}


