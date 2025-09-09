import React from 'react';

const AnimatedBackground = ({ 
  children, 
  className = "",
  particleCount = 30,
  rounded = true 
}) => {
  return (
    <div className={`relative overflow-hidden ${rounded ? 'rounded-t-[3rem]' : ''} bg-transparent ${className}`}>
      {/* Unified Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-blue-900/5 to-purple-900/10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Additional animated elements for more visual interest */}
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-indigo-400/15 to-purple-500/15 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-gradient-to-r from-teal-400/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute top-3/4 right-1/3 w-40 h-40 bg-gradient-to-r from-rose-400/10 to-pink-500/10 rounded-full blur-2xl animate-pulse delay-900"></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        ></div>
        
        {/* Floating Particles */}
        {[...Array(particleCount)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Content with relative positioning */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;