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
    <div className="text-white px-6 md:py-16 relative md:mt-10 overflow-x-hidden">
      <div className='w-full flex flex-col items-center justify-center text-center gap-6'>
        <h1 className='text-4xl md:text-5xl font-bold mb-16 align-middle'>A Simpler Path to Scale with AI</h1>
      </div>
      <div className="absolute inset-0 overflow-x-hidden">
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="border border-gray-600 rounded-2xl p-8 hover:border-gray-500 transition-colors duration-300"
            >
              {/* Number Circle */}
              <div className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-sm font-medium">{feature.number}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4 leading-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}