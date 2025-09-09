import React, { useState } from 'react';
import { Lock, Key } from 'lucide-react';

export default function CredentialVaultCanvas() {
  const [credentials, setCredentials] = useState([
    { id: 1, name: 'OpenAI', type: 'API Key', status: 'active', lastUsed: '2 hours ago' },
    { id: 2, name: 'Google Gemini', type: 'API Key', status: 'active', lastUsed: '1 day ago' },
    { id: 3, name: 'Anthropic Claude', type: 'API Key', status: 'expired', lastUsed: '5 days ago' },
    { id: 4, name: 'Composio', type: 'API Key', status: 'active', lastUsed: '30 minutes ago' }
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

  return (
    <div className="w-full h-full bg-[#0f181f] p-6">
      <div className="grid grid-cols-3 gap-6 h-full">
        <div className="col-span-2 bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Lock className="text-green-500" size={20} />
              Security Vault
            </h3>
            <button className="bg-primary/80 hover:bg-primary/60 text-white px-3 py-1 rounded text-sm cursor-pointer">
              Add Credential
            </button>
          </div>
          <div className="space-y-2">
            {credentials.map((credential) => (
              <div 
                key={credential.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors border ${
                  selectedCredential?.id === credential.id 
                    ? 'bg-gray-800/80 border-primary' 
                    : 'bg-gray-800/70 hover:bg-gray-800 border-gray-700'
                }`}
                onClick={() => setSelectedCredential(credential)}
              >
                <Key size={16} className="text-green-400" />
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
            ))}
          </div>
        </div>

        <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-xl">
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
                <button className="w-full bg-primary/80 hover:bg-primary/60 text-white py-2 rounded cursor-pointer">
                  Edit
                </button>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded cursor-pointer">
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


