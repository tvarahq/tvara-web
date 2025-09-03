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
    <div className="min-h-screen text-white px-6 py-16 relative mt-10 overflow-x-hidden">
      <div className='w-full flex flex-col items-center justify-center text-center gap-6'>
        <h1 className='text-4xl md:text-5xl font-bold mb-16 align-middle'>A Simpler Path to Scale with AI</h1>
      </div>
      {/* Colorful Background Blobs */}
      <div className="absolute inset-0 overflow-x-hidden">
        {/* Purple blob - top left */}
        <div className="absolute top-20 left-80 w-[25rem] h-[35rem] bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full blur-[120px] opacity-15"></div>

        {/* Green blob - middle left */}
        <div className="absolute top-20 -left-20 w-[30rem] h-[40rem] bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full blur-[120px] opacity-15"></div>

        {/* Orange blob - bottom center */}
        <div className="absolute top-20 right-25 transform -translate-x-1/2 w-[25rem] h-[40rem] bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full blur-[120px] opacity-10"></div>

        {/* Pink blob - bottom right */}
        <div className="absolute top-20 -right-16 w-[25rem] h-[35rem] bg-gradient-to-br from-pink-500 to-rose-600 rounded-full blur-[120px] opacity-15"></div>
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

        {/* Connect Everything Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Connect Everything
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Seamlessly integrate with your favorite tools and platforms. From
            Composio to Slack, bring your AI agents into your existing workflows.
          </p>
        </div>
      </div>
    </div>
  );
}