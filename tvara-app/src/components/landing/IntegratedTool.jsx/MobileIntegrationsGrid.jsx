import React from 'react';
import tools from "../../../utils/tools";
import "../../../styles/mobile_integrate.css"
const MobileIntegrationsGrid = () => {
    const displayTools = tools.slice(0, 30);
    return (
        <div className="min-h-screen block md:hidden w-full relative overflow-hidden px-4 py-8">
            <div className="relative z-10 h-[600px]">
 
                <div className="mb-12">
                    <div className="row-container mb-8 overflow-hidden">
                        <div className="animate-slide-right flex gap-4 w-max">
                            {[...Array(3)].map((_, setIndex) => 
                                displayTools.slice(0, 15).map((tool, index) => (
                                    <div
                                        key={`row1-set${setIndex}-${index}`}
                                        className="group cursor-pointer flex-shrink-0 relative"
                                    >
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white border border-gray-200/20 group-hover:border-purple-400/50 group-hover:shadow-purple-400/25">
                                            <div className="transition-all duration-300 group-hover:scale-110">
                                                {React.cloneElement(tool.logo, {
                                                    className: "w-6 h-6 sm:w-7 sm:h-7"
                                                })}
                                            </div>
                                        </div>
                                        
                                        {/* Tooltip */}
                                        <div className="absolute mt-2 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 pointer-events-none shadow-xl">
                                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45"></div>
                                            {tool.name}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Second Row - Moving Left */}
                    <div className="row-container overflow-hidden">
                        <div className="animate-slide-left flex gap-4 w-max">
                            {/* Duplicate the tools multiple times for seamless loop */}
                            {[...Array(3)].map((_, setIndex) => 
                                displayTools.slice(15, 30).map((tool, index) => (
                                    <div
                                        key={`row2-set${setIndex}-${index}`}
                                        className="group cursor-pointer flex-shrink-0 relative"
                                    >
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white border border-gray-200/20 group-hover:border-purple-400/50 group-hover:shadow-purple-400/25">
                                            <div className="transition-all duration-300 group-hover:scale-110">
                                                {React.cloneElement(tool.logo, {
                                                    className: "w-6 h-6 sm:w-7 sm:h-7"
                                                })}
                                            </div>
                                        </div>
                                        
                                        {/* Tooltip */}
                                        <div className="absolute mt-2 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 pointer-events-none shadow-xl">
                                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45"></div>
                                            {tool.name}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400/50 rounded-full animate-pulse"
                    style={{
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                        animationDelay: Math.random() * 3 + 's',
                        animationDuration: (Math.random() * 2 + 3) + 's'
                    }}
                />
            ))}
        </div>
    );
};

export default MobileIntegrationsGrid;