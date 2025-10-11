import React from 'react';

const AILoader = ({ message = "Generating workflow..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      {/* Animated dots */}
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      
      {/* Loading text with typing animation */}
      <div className="text-center">
        <p className="text-gray-600 text-sm font-medium">{message}</p>
        <div className="flex items-center justify-center mt-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse ml-1" style={{ animationDelay: '200ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse ml-1" style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-64 bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default AILoader;
