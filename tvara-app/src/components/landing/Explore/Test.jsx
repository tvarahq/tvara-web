import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Cpu, 
  Zap, 
  Clock, 
  Users, 
  Shield, 
  Key, 
  Lock, 
  UserPlus, 
  MessageSquare, 
  Share2, 
  Rocket, 
  Server, 
  CheckCircle, 
  AlertCircle,
  Play,
  Pause,
  Settings,
  Monitor,
  Activity,
  Globe,
  GitBranch,
  Upload,
  Download
} from 'lucide-react';

// Component 2: Drag & Drop Interface
export function DragDropCanvas() {
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItems, setDroppedItems] = useState([]);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const componentTypes = [
    { id: 'trigger', name: 'Trigger', icon: Zap, color: '#f97316' },
    { id: 'agent', name: 'AI Agent', icon: Cpu, color: '#3b82f6' },
    { id: 'database', name: 'Database', icon: Database, color: '#10b981' },
    { id: 'api', name: 'API Call', icon: Globe, color: '#8b5cf6' },
    { id: 'webhook', name: 'Webhook', icon: Share2, color: '#06b6d4' },
  ];

  const handleDragStart = (item, e) => {
    setDraggedItem(item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItem) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setDroppedItems([...droppedItems, {
        ...draggedItem,
        id: Date.now(),
        x: x - 50,
        y: y - 25
      }]);
      setDraggedItem(null);
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-purple-600/20 flex">
      {/* Component Palette */}
      <div className="w-64 bg-gray-900/90 p-4 border-r border-gray-700">
        <h3 className="text-white font-bold mb-4">Components</h3>
        <div className="space-y-2">
          {componentTypes.map((component) => (
            <div
              key={component.id}
              draggable
              onDragStart={(e) => handleDragStart(component, e)}
              className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-move hover:bg-gray-700 transition-colors"
            >
              <component.icon size={20} style={{ color: component.color }} />
              <span className="text-white font-medium">{component.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Drop Area */}
      <div 
        className="flex-1 relative"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="absolute inset-4 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center">
          {droppedItems.length === 0 ? (
            <div className="text-center text-gray-400">
              <Upload size={48} className="mx-auto mb-2" />
              <p className="text-lg">Drag components here to build your workflow</p>
            </div>
          ) : null}
          
          {droppedItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="absolute bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-600"
                style={{ left: item.x, top: item.y }}
              >
                <div className="flex items-center gap-2">
                  <IconComponent size={16} style={{ color: item.color }} />
                  <span className="text-white text-sm">{item.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Component 3: Event-Driven Workflows
export function EventWorkflowCanvas() {
  const [activeEvents, setActiveEvents] = useState([]);
  const [eventHistory, setEventHistory] = useState([]);

  const eventTypes = [
    { id: 'webhook', name: 'Webhook Received', icon: Globe, color: '#3b82f6', frequency: 3000 },
    { id: 'timer', name: 'Scheduled Task', icon: Clock, color: '#10b981', frequency: 5000 },
    { id: 'user', name: 'User Action', icon: Users, color: '#f97316', frequency: 4000 },
    { id: 'database', name: 'Database Change', icon: Database, color: '#8b5cf6', frequency: 6000 },
  ];

  useEffect(() => {
    const intervals = eventTypes.map((eventType) => {
      return setInterval(() => {
        const newEvent = {
          ...eventType,
          id: Date.now() + Math.random(),
          timestamp: new Date(),
          status: Math.random() > 0.8 ? 'error' : 'success'
        };
        
        setActiveEvents(prev => [...prev.slice(-4), newEvent]);
        setEventHistory(prev => [newEvent, ...prev.slice(0, 19)]);
      }, eventType.frequency);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-red-900/20 to-red-600/20 p-6">
      <div className="grid grid-cols-2 gap-6 h-full">
        {/* Live Events */}
        <div className="bg-gray-900/90 rounded-lg p-4">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Activity className="text-green-500" size={20} />
            Live Events
          </h3>
          <div className="space-y-2">
            {activeEvents.slice(-5).map((event) => {
              const IconComponent = event.icon;
              return (
                <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg animate-pulse">
                  <IconComponent size={16} style={{ color: event.color }} />
                  <span className="text-white flex-1">{event.name}</span>
                  {event.status === 'success' ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : (
                    <AlertCircle size={16} className="text-red-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Event History */}
        <div className="bg-gray-900/90 rounded-lg p-4">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Clock className="text-blue-500" size={20} />
            Event History
          </h3>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {eventHistory.map((event) => {
              const IconComponent = event.icon;
              return (
                <div key={event.id} className="flex items-center gap-2 p-2 text-sm">
                  <IconComponent size={14} style={{ color: event.color }} />
                  <span className="text-gray-300 flex-1">{event.name}</span>
                  <span className="text-gray-500 text-xs">
                    {event.timestamp.toLocaleTimeString()}
                  </span>
                  {event.status === 'success' ? (
                    <CheckCircle size={12} className="text-green-500" />
                  ) : (
                    <AlertCircle size={12} className="text-red-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Component 4: Credential Management
export function CredentialVaultCanvas() {
  const [credentials, setCredentials] = useState([
    { id: 1, name: 'GitHub API', type: 'OAuth', status: 'active', lastUsed: '2 hours ago' },
    { id: 2, name: 'AWS S3', type: 'Access Key', status: 'active', lastUsed: '1 day ago' },
    { id: 3, name: 'Slack Webhook', type: 'API Key', status: 'expired', lastUsed: '5 days ago' },
    { id: 4, name: 'Database', type: 'Username/Password', status: 'active', lastUsed: '30 minutes ago' },
    { id: 5, name: 'Email Service', type: 'OAuth', status: 'inactive', lastUsed: '1 week ago' },
  ]);

  const [selectedCredential, setSelectedCredential] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'expired': return 'text-red-500';
      case 'inactive': return 'text-gray-500';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'OAuth': return Shield;
      case 'API Key': return Key;
      case 'Access Key': return Lock;
      case 'Username/Password': return Users;
      default: return Key;
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-900/20 to-green-600/20 p-6">
      <div className="grid grid-cols-3 gap-6 h-full">
        {/* Credentials List */}
        <div className="col-span-2 bg-gray-900/90 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Lock className="text-green-500" size={20} />
              Security Vault
            </h3>
            <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
              Add Credential
            </button>
          </div>
          <div className="space-y-2">
            {credentials.map((credential) => {
              const IconComponent = getTypeIcon(credential.type);
              return (
                <div 
                  key={credential.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedCredential?.id === credential.id 
                      ? 'bg-gray-700 border border-green-500' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedCredential(credential)}
                >
                  <IconComponent size={16} className="text-green-400" />
                  <div className="flex-1">
                    <div className="text-white font-medium">{credential.name}</div>
                    <div className="text-gray-400 text-sm">{credential.type}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getStatusColor(credential.status)}`}>
                      {credential.status}
                    </div>
                    <div className="text-gray-500 text-xs">{credential.lastUsed}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Credential Details */}
        <div className="bg-gray-900/90 rounded-lg p-4">
          <h3 className="text-white font-bold mb-4">Details</h3>
          {selectedCredential ? (
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Name</label>
                <div className="text-white font-medium">{selectedCredential.name}</div>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Type</label>
                <div className="text-white font-medium">{selectedCredential.type}</div>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Status</label>
                <div className={`font-medium ${getStatusColor(selectedCredential.status)}`}>
                  {selectedCredential.status}
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Last Used</label>
                <div className="text-white font-medium">{selectedCredential.lastUsed}</div>
              </div>
              <div className="pt-4 space-y-2">
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Edit
                </button>
                <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                  Revoke
                </button>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-center py-8">
              Select a credential to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Component 5: Team Collaboration
export function TeamCollaborationCanvas() {
  const [teamMembers] = useState([
    { id: 1, name: 'Alice Johnson', role: 'Admin', status: 'online', avatar: '👩‍💼', lastActive: 'now' },
    { id: 2, name: 'Bob Smith', role: 'Developer', status: 'online', avatar: '👨‍💻', lastActive: 'now' },
    { id: 3, name: 'Carol Davis', role: 'Designer', status: 'away', avatar: '👩‍🎨', lastActive: '5 min ago' },
    { id: 4, name: 'David Wilson', role: 'Developer', status: 'offline', avatar: '👨‍🔧', lastActive: '2 hours ago' },
  ]);

  const [messages] = useState([
    { id: 1, user: 'Alice Johnson', message: 'New workflow deployed successfully!', time: '10:30 AM', type: 'success' },
    { id: 2, user: 'Bob Smith', message: 'Working on the API integration', time: '10:25 AM', type: 'info' },
    { id: 3, user: 'Carol Davis', message: 'Updated the UI components', time: '10:20 AM', type: 'info' },
    { id: 4, user: 'System', message: 'Workflow "User Onboarding" failed', time: '10:15 AM', type: 'error' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-yellow-900/20 to-yellow-600/20 p-6">
      <div className="grid grid-cols-3 gap-6 h-full">
        {/* Team Members */}
        <div className="bg-gray-900/90 rounded-lg p-4">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Users className="text-yellow-500" size={20} />
            Team Members
          </h3>
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                <div className="relative">
                  <div className="text-2xl">{member.avatar}</div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusColor(member.status)}`}></div>
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{member.name}</div>
                  <div className="text-gray-400 text-sm">{member.role}</div>
                </div>
                <div className="text-gray-500 text-xs">{member.lastActive}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="col-span-2 bg-gray-900/90 rounded-lg p-4">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="text-yellow-500" size={20} />
            Activity Feed
          </h3>
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-3 p-3 bg-gray-800 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  msg.type === 'success' ? 'bg-green-500' : 
                  msg.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium">{msg.user}</span>
                    <span className="text-gray-500 text-sm">{msg.time}</span>
                  </div>
                  <div className="text-gray-300">{msg.message}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick Actions */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex gap-2">
              <button className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded text-sm hover:bg-yellow-700 flex items-center justify-center gap-2">
                <UserPlus size={16} />
                Invite Member
              </button>
              <button className="flex-1 bg-gray-700 text-white py-2 px-4 rounded text-sm hover:bg-gray-600 flex items-center justify-center gap-2">
                <Share2 size={16} />
                Share Workflow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component 6: One-Click Deployment
export function DeploymentCanvas() {
  const [deployments] = useState([
    { id: 1, name: 'User Onboarding', status: 'deployed', version: 'v1.2.3', uptime: '99.9%', requests: '1.2K' },
    { id: 2, name: 'Payment Processing', status: 'deploying', version: 'v2.1.0', uptime: '-', requests: '-' },
    { id: 3, name: 'Email Automation', status: 'failed', version: 'v1.0.1', uptime: '95.2%', requests: '845' },
    { id: 4, name: 'Data Sync', status: 'deployed', version: 'v1.5.2', uptime: '99.7%', requests: '3.1K' },
  ]);

  const [selectedDeployment, setSelectedDeployment] = useState(deployments[0]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'deployed': return 'text-green-500 bg-green-500/20';
      case 'deploying': return 'text-yellow-500 bg-yellow-500/20';
      case 'failed': return 'text-red-500 bg-red-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'deployed': return CheckCircle;
      case 'deploying': return Clock;
      case 'failed': return AlertCircle;
      default: return Monitor;
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-cyan-900/20 to-cyan-600/20 p-6">
      <div className="grid grid-cols-2 gap-6 h-full">
        {/* Deployments List */}
        <div className="bg-gray-900/90 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Rocket className="text-cyan-500" size={20} />
              Deployments
            </h3>
            <button className="bg-cyan-600 text-white px-3 py-1 rounded text-sm hover:bg-cyan-700 flex items-center gap-2">
              <Upload size={14} />
              Deploy
            </button>
          </div>
          <div className="space-y-2">
            {deployments.map((deployment) => {
              const StatusIcon = getStatusIcon(deployment.status);
              return (
                <div 
                  key={deployment.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedDeployment?.id === deployment.id 
                      ? 'bg-gray-700 border border-cyan-500' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedDeployment(deployment)}
                >
                  <StatusIcon size={16} className="text-cyan-400" />
                  <div className="flex-1">
                    <div className="text-white font-medium">{deployment.name}</div>
                    <div className="text-gray-400 text-sm">{deployment.version}</div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deployment.status)}`}>
                    {deployment.status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deployment Details */}
        <div className="bg-gray-900/90 rounded-lg p-4">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Monitor className="text-cyan-500" size={20} />
            {selectedDeployment.name}
          </h3>
          
          <div className="space-y-4">
            {/* Status Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="text-gray-400 text-sm">Version</div>
                <div className="text-white font-bold text-lg">{selectedDeployment.version}</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="text-gray-400 text-sm">Uptime</div>
                <div className="text-green-400 font-bold text-lg">{selectedDeployment.uptime}</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="text-gray-400 text-sm">Requests</div>
                <div className="text-blue-400 font-bold text-lg">{selectedDeployment.requests}</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="text-gray-400 text-sm">Status</div>
                <div className={`font-bold text-lg capitalize ${getStatusColor(selectedDeployment.status).split(' ')[0]}`}>
                  {selectedDeployment.status}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4">
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2">
                <Play size={16} />
                Start
              </button>
              <button className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 flex items-center justify-center gap-2">
                <Pause size={16} />
                Stop
              </button>
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2">
                <GitBranch size={16} />
                Rollback
              </button>
              <button className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 flex items-center justify-center gap-2">
                <Settings size={16} />
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component that exports all canvases
export default function AdditionalCanvases() {
  return {
    DragDropCanvas,
    EventWorkflowCanvas,
    CredentialVaultCanvas,
    TeamCollaborationCanvas,
    DeploymentCanvas
  };
}