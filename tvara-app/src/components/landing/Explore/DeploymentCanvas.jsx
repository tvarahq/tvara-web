import React, { useState } from 'react';
import { Rocket, Upload, Monitor, CheckCircle, Clock, AlertCircle, Play, Pause, GitBranch, Settings } from 'lucide-react';

export default function DeploymentCanvas() {
  const [deployments] = useState([
    { id: 1, name: 'User Onboarding', status: 'deployed', version: 'v1.2.3', uptime: '99.9%', requests: '1.2K' },
    { id: 2, name: 'Payment Processing', status: 'deploying', version: 'v2.1.0', uptime: '-', requests: '-' },
    { id: 3, name: 'Email Automation', status: 'failed', version: 'v1.0.1', uptime: '95.2%', requests: '845' },
    { id: 4, name: 'Data Sync', status: 'deployed', version: 'v1.5.2', uptime: '99.7%', requests: '3.1K' }
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
    <div className="w-full h-full bg-[#0f181f] p-6">
      <div className="grid grid-cols-2 gap-6 h-full">
        <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Rocket className="text-cyan-500" size={20} />
              Deployments
            </h3>
            <button className="bg-primary/80 hover:bg-primary/60 text-white px-3 py-1 rounded text-sm flex items-center gap-2 cursor-pointer">
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
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors border ${
                    selectedDeployment?.id === deployment.id 
                      ? 'bg-gray-800/80 border-primary' 
                      : 'bg-gray-800/70 hover:bg-gray-800 border-gray-700'
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

        <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-xl">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Monitor className="text-cyan-500" size={20} />
            {selectedDeployment.name}
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-3">
                <div className="text-gray-400 text-sm">Version</div>
                <div className="text-white font-bold text-lg">{selectedDeployment.version}</div>
              </div>
              <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-3">
                <div className="text-gray-400 text-sm">Uptime</div>
                <div className="text-green-400 font-bold text-lg">{selectedDeployment.uptime}</div>
              </div>
              <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-3">
                <div className="text-gray-400 text-sm">Requests</div>
                <div className="text-blue-400 font-bold text-lg">{selectedDeployment.requests}</div>
              </div>
              <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-3">
                <div className="text-gray-400 text-sm">Status</div>
                <div className={`font-bold text-lg capitalize ${getStatusColor(selectedDeployment.status).split(' ')[0]}`}>
                  {selectedDeployment.status}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <button className="w-full bg-primary/80 hover:bg-primary/60 text-white py-2 rounded flex items-center justify-center gap-2 cursor-pointer">
                <Play size={16} />
                Start
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded flex items-center justify-center gap-2 cursor-pointer">
                <Pause size={16} />
                Stop
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded flex items-center justify-center gap-2 cursor-pointer">
                <GitBranch size={16} />
                Rollback
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded flex items-center justify-center gap-2 cursor-pointer">
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


