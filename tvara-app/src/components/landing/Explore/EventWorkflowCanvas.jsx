import React, { useState, useEffect } from 'react';
import { Activity, Clock, Users, Database, Globe, CheckCircle, AlertCircle } from 'lucide-react';

export default function EventWorkflowCanvas() {
  const [activeEvents, setActiveEvents] = useState([]);
  const [eventHistory, setEventHistory] = useState([]);

  const eventTypes = [
    { id: 'webhook', name: 'Webhook Received', icon: Globe, color: '#3b82f6', frequency: 3000 },
    { id: 'timer', name: 'Scheduled Task', icon: Clock, color: '#10b981', frequency: 5000 },
    { id: 'user', name: 'User Action', icon: Users, color: '#f97316', frequency: 4000 },
    { id: 'database', name: 'Database Change', icon: Database, color: '#8b5cf6', frequency: 6000 }
  ];

  useEffect(() => {
    const seedNow = () => {
      eventTypes.forEach((eventType) => {
        const seeded = {
          ...eventType,
          id: Date.now() + Math.random(),
          timestamp: new Date(),
          status: 'success'
        };
        setActiveEvents(prev => [...prev.slice(-4), seeded]);
        setEventHistory(prev => [seeded, ...prev.slice(0, 19)]);
      });
    };
    seedNow();

    const intervals = eventTypes.map((eventType) => {
      return setInterval(() => {
        const newEvent = {
          ...eventType,
          id: Date.now() + Math.random(),
          timestamp: new Date(),
          status: Math.random() > 0.7 ? 'error' : 'success'
        };
        setActiveEvents(prev => [...prev.slice(-4), newEvent]);
        setEventHistory(prev => [newEvent, ...prev.slice(0, 19)]);
      }, eventType.frequency);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="w-full h-full bg-[#0f181f] p-6">
      <div className="grid grid-cols-2 gap-6 h-full">
        <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-xl">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Activity className="text-green-500" size={20} />
            Live Events
          </h3>
          <div className="space-y-2">
            {activeEvents.slice(-5).map((event) => {
              const IconComponent = event.icon;
              return (
                <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-800/70 border border-gray-700 rounded-lg">
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

        <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-xl">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Clock className="text-blue-500" size={20} />
            Event History
          </h3>
          <div className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar">
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


