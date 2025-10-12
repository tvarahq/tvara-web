import React, { useState, useEffect } from 'react';

const AILoader = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  
  const loadingPhrases = [
    "Building the workspace for you...",
    "Crafting your perfect workflow...",
    "Assembling the magic behind the scenes...",
    "Weaving together your automation dreams...",
    "Engineering your digital symphony...",
    "Orchestrating the perfect solution...",
    "Casting spells in the code realm...",
    "Architecting your workflow masterpiece...",
    "Brewing the perfect automation potion...",
    "Sculpting your digital workflow...",
    "Conducting the automation orchestra...",
    "Painting your workflow canvas...",
    "Choreographing your process dance...",
    "Composing your automation symphony...",
    "Forging your digital toolkit..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => 
        (prevIndex + 1) % loadingPhrases.length
      );
    }, 4000); // Change phrase every 2 seconds

    return () => clearInterval(interval);
  }, []);

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
        <p className="text-gray-300 text-sm font-medium transition-all duration-500 ease-in-out">
          {loadingPhrases[currentPhraseIndex]}
        </p>
        {/* <div className="flex items-center justify-center mt-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse ml-1" style={{ animationDelay: '200ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse ml-1" style={{ animationDelay: '400ms' }}></div>
        </div> */}
      </div>
    </div>
  );
};

export default AILoader;
