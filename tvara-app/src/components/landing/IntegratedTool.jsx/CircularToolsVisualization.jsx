import React from 'react';
import tools from "../../../utils/tools";
const CircularToolsVisualization = () => {
    const innerTools = [...tools.slice(0, 16)];
    const extraOutTools = [...tools.slice(0, 16), ...tools.slice(16, 30)];
    const outerTools = [...tools.slice(6, 64)];

    return (
        <div className="flex-1 items-center justify-center hidden md:flex px-6 py-12 lg:py-0 translate-x-[20rem]">
            <div className="relative w-full max-w-2xl h-96 md:h-[500px] lg:h-[600px]">
                {/* Connecting circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Inner circle */}
                    <div className="absolute w-64 h-64 md:w-[40rem] md:h-[40rem] lg:w-96 lg:h-96 border-2 border-purple-500/20 rounded-full animate-spin-slow" />
                    
                    <div className="absolute w-64 h-64 md:w-[40rem] md:h-[40rem] lg:w-[52rem] lg:h-[52rem] border-2 border-purple-500/20 rounded-full animate-spin-slow" />
                    
                    {/* Outer circle */}
                    <div className="absolute w-80 h-80 md:w-96 md:h-96 lg:w-[38rem] lg:h-[38rem] border-2 border-blue-500/20 rounded-full animate-spin-reverse" />
                    
                    {/* Center glow */}
                    <div className="absolute w-32 h-32 bg-gradient-to-r from-primary/10 to-primary/30 rounded-full blur-xl animate-pulse" />
                </div>

                {/* Inner circle tools */}
                <div className="absolute inset-0 animate-spin-slow">
                    {innerTools.map((tool, index) => {
                        const angle = (360 / innerTools.length) * index;
                        const radius = window.innerWidth < 768 ? 100 : window.innerWidth < 1024 ? 120 : 150;

                        return (
                            <div
                                key={`inner-${index}`}
                                className="absolute group cursor-pointer"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius + 30}px) rotate(-${angle}deg)`,
                                }}
                            >
                                <div className={`w-12 h-12 md:w-16 md:h-16 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-125 hover:bg-white border-20 group-hover:rotate-12`}>
                                    <div className="transition-all duration-300 group-hover:scale-110">
                                        {tool.logo}
                                    </div>
                                </div>

                                {/* Tooltip */}
                                <div className="absolute rounded-full -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                                    {tool.name}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Outer circle tools */}
                <div className="absolute inset-0 animate-spin-reverse">
                    {outerTools.map((tool, index) => {
                        const angle = (360 / outerTools.length) * index;
                        const radius = window.innerWidth < 768 ? 200 : window.innerWidth < 1024 ? 250 : 290;

                        return (
                            <div
                                key={`outer-${index}`}
                                className="absolute group cursor-pointer"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius + 10}px) rotate(${angle}deg)`,
                                }}
                            >
                                <div className={`w-10 h-10 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-125 hover:bg-white border-2 group-hover:rotate-12`}>
                                    <div className="transition-all duration-300 group-hover:scale-110">
                                        {React.cloneElement(tool.logo, {
                                            className: "w-5 h-5 md:w-7 md:h-7"
                                        })}
                                    </div>
                                </div>

                                {/* Tooltip */}
                                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                                    {tool.name}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Extra outer circle tools */}
                <div className="absolute inset-0 animate-spin-slow">
                    {extraOutTools.map((tool, index) => {
                        const angle = (360 / extraOutTools.length) * index;
                        const radius = window.innerWidth < 768 ? 100 : window.innerWidth < 1024 ? 120 : 390;

                        return (
                            <div
                                key={`extra-${index}`}
                                className="absolute group cursor-pointer"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius + 30}px) rotate(-${angle}deg)`,
                                }}
                            >
                                <div className={`w-12 h-12 md:w-16 md:h-16 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-125 hover:bg-white border-20 group-hover:rotate-12`}>
                                    <div className="transition-all duration-300 group-hover:scale-110">
                                        {tool.logo}
                                    </div>
                                </div>

                                {/* Tooltip */}
                                <div className="absolute rounded-full -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                                    {tool.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Floating particles */}
            {[...Array(40)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                    style={{
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                        animationDelay: Math.random() * 3 + 's',
                        animationDuration: (Math.random() * 2 + 2) + 's'
                    }}
                />
            ))}
        </div>
    );
};

export default CircularToolsVisualization;