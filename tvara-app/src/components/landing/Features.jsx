import React from 'react';
import { features } from "../../utils/landing";

const FeatureCard = ({ icon: Icon, title, description, className = "" }) => {
  return (
    <div className={`bg-[#e9f0ee] p-8 border-b border-r border-gray-700 flex flex-col items-center text-center ${className}`}>
      <div className="mb-6">
        <Icon className="w-16 h-16 text-[#8A8787] mt-2" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {title}
      </h3>
      <p className="text-gray-800 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const Features = () => {

  return (
    <div className="mt-30 px-4 md:px-24 lg:px-24">
      <div className="">
        <div className="bg-[#c7e2dd] rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              let borderClasses = "";
              
              // Add borders to create the grid effect
              if (index < 3) {
                borderClasses += "border-b border-gray-200";
              }
              if (index % 3 !== 2) {
                borderClasses += "border-b border-r border-gray-200";
              }
              
              return (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  className={borderClasses}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;