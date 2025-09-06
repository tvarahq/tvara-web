import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

function Installation() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('pip install tvara');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 mt-30">
      <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
        Installation
      </h1>
      
      <p className="text-2xl md:text-2xl text-white font-light mb-12">
        Install Tvara here!
      </p>
      
      <div className="relative">
        <div className="bg-black border-3 border-primary rounded-xl px-8 py-4 flex items-center gap-4 min-w-[300px] md:min-w-[400px]">
          <code className="text-white font-mono text-lg flex-1">
            pip install tvara
          </code>
          <button
            onClick={handleCopy}
            className="text-white hover:text-blue-300 transition-colors duration-200 p-1 cursor-pointer"
            title={copied ? "Copied!" : "Copy to clipboard"}
          >
            {copied ? (
              <Check size={20} className="text-green-400" />
            ) : (
              <Copy size={20} />
            )}
          </button>
        </div>
      </div>
      
      <p className="text-gray-300 text-lg mt-12">
        Watch this{' '}
        <a 
          href="#" 
          className="text-white underline hover:text-primary transition-colors duration-200"
        >
          Demo Video
        </a>
        {' '}to learn more about Tvara
      </p>
    </div>
  );
}

export default Installation;