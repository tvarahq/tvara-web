import React from "react";

function About() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                AI Workflows for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Everyone
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Tvara Studios bridges the gap between powerful AI capabilities and ease of use. 
                Whether you're a developer building custom solutions or a business user automating 
                workflows, we've got you covered.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-blue-100 hover:border-blue-200 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">For Business Teams</h3>
                <p className="text-gray-600">
                  Create AI workflows without writing code using our intuitive drag-and-drop interface.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-purple-100 hover:border-purple-200 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">For Developers</h3>
                <p className="text-gray-600">
                  Build sophisticated AI agents with our comprehensive SDK and extensive customization options.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-blue-100 hover:border-blue-200 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">For Startups & Enterprises</h3>
                <p className="text-gray-600">
                  Scale your operations efficiently with AI-powered automation that grows with your business.
                </p>
              </div>
            </div>
          </div>

          {/* SVG Illustration */}
          <div className="flex justify-center">
            <svg
              width="500"
              height="400"
              viewBox="0 0 500 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-lg"
            >
              {/* Background circles */}
              <circle cx="250" cy="200" r="180" fill="url(#gradient1)" opacity="0.1"/>
              <circle cx="250" cy="200" r="120" fill="url(#gradient2)" opacity="0.1"/>
              
              {/* Main elements */}
              <rect x="180" y="120" width="140" height="100" rx="12" fill="white" stroke="url(#gradient3)" strokeWidth="2"/>
              <rect x="200" y="140" width="100" height="8" rx="4" fill="url(#gradient3)"/>
              <rect x="200" y="160" width="80" height="6" rx="3" fill="#e5e7eb"/>
              <rect x="200" y="175" width="60" height="6" rx="3" fill="#e5e7eb"/>
              
              {/* Connecting lines */}
              <path d="M250 120 L250 80 L350 80 L350 120" stroke="url(#gradient3)" strokeWidth="2" fill="none"/>
              <path d="M250 220 L250 260 L350 260 L350 220" stroke="url(#gradient3)" strokeWidth="2" fill="none"/>
              <path d="M180 170 L120 170 L120 120 L150 120" stroke="url(#gradient3)" strokeWidth="2" fill="none"/>
              
              {/* Small nodes */}
              <circle cx="350" cy="120" r="8" fill="url(#gradient3)"/>
              <circle cx="350" cy="220" r="8" fill="url(#gradient3)"/>
              <circle cx="150" cy="120" r="8" fill="url(#gradient3)"/>
              
              {/* Gradients */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6"/>
                  <stop offset="100%" stopColor="#8b5cf6"/>
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6"/>
                  <stop offset="100%" stopColor="#3b82f6"/>
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6"/>
                  <stop offset="100%" stopColor="#8b5cf6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
