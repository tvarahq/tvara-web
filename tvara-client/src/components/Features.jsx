import React, { useState } from "react";
import { RiDragDropLine } from "react-icons/ri";
import { FaCode } from "react-icons/fa6";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { GrVirtualStorage } from "react-icons/gr";

function Features() {
  const features = [
    {
      title: "Drag-and-Drop Builder",
      description: "Create AI workflows visually with our intuitive no-code interface",
      category: "Non-Tech Users",
      icon: RiDragDropLine
    },
    {
      title: "Developer-Friendly SDK",
      description: "Build custom AI agents with our powerful, flexible development kit",
      category: "Developers",
      icon: FaCode
    },
    {
      title: "Knowledge Base Integration",
      description: "Connect your existing data sources and knowledge repositories seamlessly",
      category: "Everyone",
      icon: GrVirtualStorage
    },
    {
      title: "One-Click Deployment",
      description: "Deploy and scale your AI workflows instantly with zero configuration",
      category: "Everyone",
      icon: AiOutlineDeploymentUnit
    }
  ];

  const [mousePosition, setMousePosition] = useState({});

  const handleMouseMove = (e, index) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left; // X position within the element.
    const y = e.clientY - top;  // Y position within the element.
    
    setMousePosition(prev => ({
      ...prev,
      [index]: { x, y, visible: true } // Add a 'visible' flag
    }));
  };

  const handleMouseLeave = (index) => {
    // Set visible to false, but keep x,y for a short duration to allow fade out
    setMousePosition(prev => ({
      ...prev,
      [index]: { ...prev[index], visible: false }
    }));
    // Clean up after the fade out transition
    setTimeout(() => {
      setMousePosition(prev => {
        const newPos = { ...prev };
        delete newPos[index];
        return newPos;
      });
    }, 500); // This timeout should match your CSS transition duration
  };

  return (
    <section className="flex justify-center mt-20 relative">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative bg-white/20 backdrop-filter backdrop-blur-lg border-2 border-gray-400/80 rounded-xl p-8  transition-all duration-300 group dark:bg-gray-700/20 dark:border-gray-600/30 
                ${mousePosition[index]?.visible ? 'mouse-hover-active' : 'mouse-hover-inactive'}
              `}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                background: mousePosition[index]?.visible 
                  ? `radial-gradient(circle at ${mousePosition[index].x}px ${mousePosition[index].y}px, rgba(59, 130, 246, 0.3) 0%, transparent 90%)`
                  : mousePosition[index] // Keep background defined while fading out
                    ? `radial-gradient(circle at ${mousePosition[index].x}px ${mousePosition[index].y}px, rgba(59, 130, 246, 0.0) 0%, transparent 70%)` // Fade to transparent
                    : '',
                transition: mousePosition[index]?.visible 
                  ? 'background 0.2s ease-out' // Slightly slower when active
                  : 'background 0.5s ease-out' // Slower fade out
              }}
            >
              <div className="flex flex-col items-start space-y-4">
                <div className="flex-shrink-0 w-12 h-12 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center transition-transform duration-300">
                  <feature.icon size={40} />
                </div>
                <div className="gap-2 mt-4 max-w-[230px]">
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-3 dark:bg-blue-700/30 dark:text-blue-200">
                    {feature.category}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 h-[60px]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;