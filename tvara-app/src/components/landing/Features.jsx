import React, { useState } from 'react';
import { features } from "../../utils/landing";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  className = "", 
  index, 
  mousePosition, 
  handleMouseMove, 
  handleMouseLeave 
}) => {
  return (
    <div
      onMouseMove={(e) => handleMouseMove(e, index)}
      onMouseLeave={() => handleMouseLeave(index)}
      className={`bg-[#e9f0ee] p-8 flex flex-col items-center text-center transition-all duration-300 ease-in-out ${className}`}
      style={{
        background: mousePosition[index]?.visible
          ? `radial-gradient(circle at ${mousePosition[index].x}px ${mousePosition[index].y}px, rgba(59, 130, 246, 0.3) 0%, transparent 90%)`
          : mousePosition[index]
            ? `radial-gradient(circle at ${mousePosition[index].x}px ${mousePosition[index].y}px, rgba(59, 130, 246, 0.0) 0%, transparent 70%)`
            : '#e9f0ee',
        transition: mousePosition[index]?.visible
          ? 'background 0.2s ease-out'
          : 'background 0.2s ease-out'
      }}
    >
      <div className="mb-6">
        <Icon className="w-16 h-16 text-[#8A8787] mt-2" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
      <p className="text-gray-800 leading-relaxed">{description}</p>
    </div>
  );
};

const Features = () => {
  const [mousePosition, setMousePosition] = useState({});

  const handleMouseMove = (e, index) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setMousePosition(prev => ({
      ...prev,
      [index]: { x, y, visible: true }
    }));
  };

  const handleMouseLeave = (index) => {
    setMousePosition(prev => ({
      ...prev,
      [index]: { ...prev[index], visible: false }
    }));
    setTimeout(() => {
      setMousePosition(prev => {
        const newPos = { ...prev };
        delete newPos[index];
        return newPos;
      });
    }, 500);
  };

  return (
    <div className="mt-30 px-4 md:px-24 lg:px-24">
      <div className="bg-[#c7e2dd] rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            let borderClasses = "";

            if (index < 3) {
              borderClasses += "border-b border-gray-200 ";
            }
            if (index % 3 !== 2) {
              borderClasses += "border-r border-gray-200 ";
            }

            return (
              <FeatureCard
                key={index}
                index={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className={borderClasses}
                mousePosition={mousePosition}
                handleMouseMove={handleMouseMove}
                handleMouseLeave={handleMouseLeave}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;
