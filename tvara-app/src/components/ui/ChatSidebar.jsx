import React, { useState, useRef, useEffect } from 'react';
import AILoader from './AILoader';

const ChatSidebar = ({ isOpen, onClose, onGenerateWorkflow, isLoading, error, response, initialQuery }) => {
  const [userQuery, setUserQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        setShowScrollButton(!isNearBottom && messages.length > 3);
      };
      
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [messages.length]);

  const handleSendMessage = async () => {
    if (!userQuery.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: userQuery,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentQuery = userQuery;
    setUserQuery('');

    // Call the parent's generate function
    await onGenerateWorkflow(currentQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const addAIMessage = (content) => {
    const aiMessage = {
      id: Date.now(),
      type: 'ai',
      content: content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, aiMessage]);
  };

  // Add AI response to messages when it arrives
  useEffect(() => {
    if (response && !isLoading) {
      addAIMessage(response);
    }
  }, [response, isLoading]);

  // Handle initial query from main form
  useEffect(() => {
    if (initialQuery && initialQuery.trim() && messages.length === 0) {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: initialQuery,
        timestamp: new Date()
      };
      setMessages([userMessage]);
    }
  }, [initialQuery, messages.length]);

  return (
    <div className={`w-96 h-full bg-gray-900 border-l border-gray-700 flex flex-col ${isOpen ? 'block' : 'hidden'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50">
        <h2 className="text-lg font-semibold text-white">AI Assistant</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 relative"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {messages.length === 0 && !isLoading && (
          <div className="text-center text-gray-400 mt-8">
            <p>Start a conversation with the AI</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl shadow-sm ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                  : 'bg-gray-800/80 text-gray-100 border border-gray-700/50'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              <p className="text-xs opacity-60 mt-2">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800/80 border border-gray-700/50 rounded-xl p-4 max-w-xs shadow-sm">
              <AILoader />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-start">
            <div className="bg-red-900/30 border border-red-500/60 rounded-xl p-4 max-w-xs shadow-sm">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
        
        {/* Scroll to Bottom Button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 z-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-700/50 p-4 bg-gray-800/30">
        <div className="flex space-x-3">
          <textarea
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask the AI anything..."
            className="flex-1 px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none transition-all duration-200"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !userQuery.trim()}
            className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100 shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
