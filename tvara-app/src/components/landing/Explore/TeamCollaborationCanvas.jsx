import React, { useState } from 'react';
import { Users, MessageSquare, Share2, UserPlus } from 'lucide-react';

export default function TeamCollaborationCanvas() {
  const [teamMembers] = useState([
    { id: 1, name: 'Alice Johnson', role: 'Admin', status: 'online', avatar: '👩‍💼', lastActive: 'now' },
    { id: 2, name: 'Bob Smith', role: 'Developer', status: 'online', avatar: '👨‍💻', lastActive: 'now' },
    { id: 3, name: 'Carol Davis', role: 'Designer', status: 'away', avatar: '👩‍🎨', lastActive: '5 min ago' },
    { id: 4, name: 'David Wilson', role: 'Developer', status: 'offline', avatar: '👨‍🔧', lastActive: '2 hours ago' }
  ]);

  const [messages] = useState([
    { id: 1, user: 'Alice Johnson', message: 'New workflow deployed successfully!', time: '10:30 AM', type: 'success' },
    { id: 2, user: 'Bob Smith', message: 'Working on the API integration', time: '10:25 AM', type: 'info' },
    { id: 3, user: 'Carol Davis', message: 'Updated the UI components', time: '10:20 AM', type: 'info' },
    { id: 4, user: 'System', message: 'Workflow "User Onboarding" failed', time: '10:15 AM', type: 'error' }
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
    <div className="w-full h-full bg-[#0f181f] p-6">
      <div className="grid grid-cols-3 gap-6 h-full">
        <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-xl">
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

        <div className="col-span-2 bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-xl">
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

          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex gap-2">
              <button className="flex-1 bg-primary/80 hover:bg-primary/60 text-white py-2 px-4 rounded text-sm flex items-center justify-center gap-2 cursor-pointer">
                <UserPlus size={16} />
                Invite Member
              </button>
              <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded text-sm flex items-center justify-center gap-2 cursor-pointer">
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


