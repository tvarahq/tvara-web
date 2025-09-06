import React from 'react';

export default function Essentials() {
  const features = [
    {
      number: "1",
      title: "From Chaos to Clarity",
      description: "Stop fighting with scattered scripts and disconnected services. Tvara gives you one clean view of your entire automation system."
    },
    {
      number: "2",
      title: "Scale Without Stress",
      description: "Whether it's a single agent or a complex orchestration, the Canvas grows with you. Add new tools and flows without introducing new headaches."
    },
    {
      number: "3",
      title: "No-Code Meets Pro-Code",
      description: "Drag and drop when you want speed, dive into code when you need control. Tvara is built for both makers and engineers."
    }
  ];

  return (
    <div className="text-white px-6 md:py-16 relative md:mt-10 overflow-x-hidden rounded-[3rem] bg-transparent">

      <div className='w-full flex flex-col items-center justify-center text-center gap-6'>
        <h1 className='text-4xl md:text-5xl font-bold mb-16 align-middle bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent'>
          A Simpler Path to Scale with AI
        </h1>
      </div>
      
      {/* Background Pattern/Image Container */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-blue-900/5 to-purple-900/10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        ></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Feature Cards with Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.number}
              className="group relative overflow-hidden rounded-2xl p-8 hover:scale-105 transition-all duration-500 cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Inner Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Number Circle with Glassmorphism */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: 'rgba(6, 182, 212, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    boxShadow: '0 4px 16px rgba(6, 182, 212, 0.2)'
                  }}
                >
                  <span className="text-sm font-bold text-cyan-300">{feature.number}</span>
                </div>

                {/* Title with Gradient */}
                <h3 className="text-2xl font-bold mb-4 leading-tight bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-white transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
              
              {/* Bottom Border Accent */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}