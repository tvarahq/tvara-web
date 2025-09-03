// import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge, MiniMap, Handle } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import { useState, useCallback } from 'react';
// import { User } from 'lucide-react';

// export function CustomNode(props) {
//   return (
//     <div>
//       <div className="p-2 rounded bg-white text-xs flex flex-col items-center justify-center min-w-[60px] min-h-[50px]">
//         <div className="font-bold text-[10px] mb-1">AGENT</div>
//         <User size={16} />
//       </div>
//       <Handle type="source" position="top" style={{ width: 8, height: 8 }} />
//       <Handle type="target" position="bottom" style={{ width: 8, height: 8 }} />
//     </div>
//   );
// }

// export function DefaultNode({ data }) {
//   return (
//     <div className="p-2 bg-white rounded shadow text-xs min-w-[60px] min-h-[30px] flex items-center justify-center">
//       {data.label}
//       <Handle type="source" position="bottom" style={{ width: 8, height: 8 }} />
//       <Handle type="target" position="left" style={{ width: 8, height: 8 }} />
//     </div>
//   );
// }

// const nodeTypes = {
//   agentNode: CustomNode,
//   default: DefaultNode,
// };

// const initialNodes = [
//   {
//     id: 'n1',
//     position: { x: 200, y: 0 },
//     data: { label: 'Node 1' },
//     type: 'default'
//   },
//   {
//     id: 'n2',
//     position: { x: 100, y: 100 },
//     data: { label: 'Node 2' },
//     type: 'default'
//   },
//   {
//     id: 'n3',
//     position: { x: 200, y: 200 },
//     data: { label: 'Node 3' },
//     type: 'agentNode',
//   },
// ];

// const initialEdges = [
//   {
//     id: 'n1-n2',
//     source: 'n1',
//     target: 'n2',
//     animated: true,
//   },
//   {
//     id: 'n3-n2',
//     source: 'n3',
//     target: 'n2',
//   },
// ];

// export default function Canvas() {
//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);
//   const [selectedNodes, setSelectedNodes] = useState([]);

//   const onNodesChange = useCallback(
//     (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
//     [],
//   );
//   const onEdgesChange = useCallback(
//     (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
//     [],
//   );

//   const onConnect = useCallback(
//     (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
//     [],
//   );

//   return (
//     <div className='w-full h-full'>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         nodeTypes={nodeTypes}
//         style={{ backgroundColor: '#0f181f' }} 
//         fitView
//         fitViewOptions={{
//           padding: 0.9,
//           minZoom: 0.1,
//           maxZoom: 1.5
//         }}
//         defaultViewport={{ x: 0, y: 0, zoom: 0.3}}
//         minZoom={0.1}
//         maxZoom={2}
//         onSelectionChange={({ nodes }) => setSelectedNodes(nodes)}
//       >
//         <Background variant="dots" color="#fff" gap={20}/>
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// }


import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge, Handle } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState, useCallback } from 'react';
import { Zap, Bot, GitBranch, Plus, Database, Brain, Users } from 'lucide-react';

export function TriggerNode({ data }) {
  return (
    <div>
      <div className="p-4 rounded-lg bg-gray-800 border border-gray-600 text-white flex flex-col items-center justify-center min-w-[160px] min-h-[80px] shadow-lg">
        <Zap size={20} className="text-orange-500 mb-2" />
        <div className="font-semibold text-sm text-center">{data.title}</div>
        <div className="text-xs text-gray-400 text-center mt-1">{data.description}</div>
      </div>
      <Handle type="source" position="right" style={{ width: 12, height: 12, backgroundColor: '#f97316' }} />
    </div>
  );
}

export function AgentNode({ data }) {
  return (
    <div>
      <div className="p-4 rounded-lg bg-gray-800 border border-gray-600 text-white flex flex-col items-center justify-center min-w-[200px] min-h-[100px] shadow-lg relative">
        <Bot size={24} className="text-blue-500 mb-2" />
        <div className="font-semibold text-sm">{data.title}</div>
        <div className="text-xs text-gray-400 mb-3">{data.subtitle}</div>
        
        {/* Configuration indicators */}
        <div className="flex gap-2 text-xs">
          <span className="bg-gray-700 px-2 py-1 rounded flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Chat Model
          </span>
          <span className="bg-gray-700 px-2 py-1 rounded flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Memory
          </span>
          <span className="bg-gray-700 px-2 py-1 rounded flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Tool
          </span>
        </div>
        
        {/* Plus button for adding tools */}
        <div className="absolute -bottom-2 bg-gray-600 rounded-full p-1">
          <Plus size={12} className="text-white" />
        </div>
      </div>
      <Handle type="target" position="left" style={{ width: 12, height: 12, backgroundColor: '#3b82f6' }} />
      <Handle type="source" position="right" style={{ width: 12, height: 12, backgroundColor: '#3b82f6' }} />
      <Handle type="source" position="bottom" style={{ width: 12, height: 12, backgroundColor: '#3b82f6', top: '85%' }} />
    </div>
  );
}

export function DecisionNode({ data }) {
  return (
    <div>
      <div className="p-4 rounded-lg bg-gray-800 border border-gray-600 text-white flex flex-col items-center justify-center min-w-[120px] min-h-[80px] shadow-lg">
        <GitBranch size={20} className="text-green-500 mb-2" />
        <div className="font-semibold text-sm text-center">{data.title}</div>
      </div>
      <Handle type="target" position="left" style={{ width: 12, height: 12, backgroundColor: '#10b981' }} />
      <Handle type="source" position="top" style={{ width: 12, height: 12, backgroundColor: '#10b981' }} />
      <Handle type="source" position="bottom" style={{ width: 12, height: 12, backgroundColor: '#10b981' }} />
    </div>
  );
}

export function ActionNode({ data }) {
  return (
    <div>
      <div className="p-4 rounded-lg bg-gray-800 border border-gray-600 text-white flex flex-col items-center justify-center min-w-[140px] min-h-[80px] shadow-lg">
        <Users size={20} className="text-cyan-500 mb-2" />
        <div className="font-semibold text-sm text-center">{data.title}</div>
        <div className="text-xs text-gray-400 text-center mt-1">{data.description}</div>
      </div>
      <Handle type="target" position="left" style={{ width: 12, height: 12, backgroundColor: '#06b6d4' }} />
      <Handle type="source" position="right" style={{ width: 12, height: 12, backgroundColor: '#06b6d4' }} />
    </div>
  );
}

export function ToolNode({ data }) {
  return (
    <div>
      <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center shadow-lg">
        <div className="text-2xl">{data.icon}</div>
      </div>
      <div className="text-white text-xs text-center mt-2 font-medium">{data.title}</div>
      <div className="text-gray-400 text-xs text-center">{data.description}</div>
      <Handle type="target" position="top" style={{ width: 10, height: 10, backgroundColor: '#6b7280' }} />
    </div>
  );
}

const nodeTypes = {
  triggerNode: TriggerNode,
  agentNode: AgentNode,
  decisionNode: DecisionNode,
  actionNode: ActionNode,
  toolNode: ToolNode,
};

const initialNodes = [
  {
    id: 'trigger',
    position: { x: 50, y: 150 },
    data: { 
      title: "On 'Create User' form",
      description: "submission"
    },
    type: 'triggerNode'
  },
  {
    id: 'agent',
    position: { x: 300, y: 120 },
    data: { 
      title: 'AI Agent',
      subtitle: 'Tools Agent'
    },
    type: 'agentNode'
  },
  {
    id: 'decision',
    position: { x: 600, y: 150 },
    data: { 
      title: 'Github Connector'
    },
    type: 'decisionNode'
  },
  {
    id: 'action2',
    position: { x: 800, y: 130 },
    data: { 
      title: 'Update profile',
      description: 'updateProfile: user'
    },
    type: 'actionNode'
  },
  // Tool nodes
  {
    id: 'tool1',
    position: { x: 300, y: 320 },
    data: { 
      title: 'OpenAI GPT-4',
      description: 'Model',
      icon: '🤖'
    },
    type: 'toolNode'
  },
  {
    id: 'tool2',
    position: { x: 500, y: 320 },
    data: { 
      title: 'Database Connector',
      description: 'Memory',
      icon: '🧠'
    },
    type: 'toolNode'
  },
];

const initialEdges = [
  {
    id: 'trigger-agent',
    source: 'trigger',
    target: 'agent',
    animated: false,
    style: { stroke: '#6b7280', strokeWidth: 2 }
  },
  {
    id: 'agent-decision',
    source: 'agent',
    target: 'decision',
    animated: false,
    style: { stroke: '#6b7280', strokeWidth: 2 }
  },
  {
    id: 'decision-action1',
    source: 'decision',
    target: 'action1',
    sourceHandle: 'top',
    label: 'true',
    animated: false,
    style: { stroke: '#10b981', strokeWidth: 2 },
    labelStyle: { fill: '#10b981', fontWeight: 600, fontSize: 12 }
  },
  {
    id: 'decision-action2',
    source: 'decision',
    target: 'action2',
    sourceHandle: 'bottom',
    label: 'false',
    animated: false,
    style: { stroke: '#ef4444', strokeWidth: 2 },
    labelStyle: { fill: '#ef4444', fontWeight: 600, fontSize: 12 }
  },
  // Tool connections (dashed lines)
  {
    id: 'agent-tool1',
    source: 'agent',
    target: 'tool1',
    animated: false,
    style: { stroke: '#6b7280', strokeWidth: 1, strokeDasharray: '5,5' }
  },
  {
    id: 'agent-tool2',
    source: 'agent',
    target: 'tool2',
    animated: false,
    style: { stroke: '#6b7280', strokeWidth: 1, strokeDasharray: '5,5' }
  },
];

export default function Canvas() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
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

  return (
    <div className='w-full h-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        style={{ backgroundColor: '#0f181f' }} 
        fitView
        fitViewOptions={{
          padding: 0.2,
          minZoom: 0.5,
          maxZoom: 1.2
        }}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8}}
        minZoom={0.3}
        maxZoom={2}
        onSelectionChange={({ nodes }) => setSelectedNodes(nodes)}
        zoomOnScroll={false}
        panOnScroll={false}
      >
        <Background variant="dots" color="#fff" gap={20} size={1}/>
      </ReactFlow>
    </div>
  );
}