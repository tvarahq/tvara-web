// import React from 'react';
// import "../../styles/tools.css";
// import CircularToolsVisualization from "./IntegratedTool.jsx/CircularToolsVisualization"
// import MobileIntegrationsGrid from './IntegratedTool.jsx/MobileIntegrationsGrid';
// import { useNavigate } from "react-router-dom";
// const IntegratedToolsSection = () => {
//     const navigate = useNavigate();
//     return (
//         <div className="h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 relative overflow-hidden pl-4 md:pl-24 lg:pl-18">
//             {/* Background elements */}
//             <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
//             <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-cyan-600/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />

//             {/* Grid pattern overlay */}
//             <div
//                 className="absolute inset-0 opacity-[0.02]"
//                 style={{
//                     backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
//                     backgroundSize: '20px 20px'
//                 }}
//             />

//             {/* Content Container */}
//             <div className="flex flex-col lg:flex-row min-h-screen">
//                 {/* Text Section */}
//                 <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-0">
//                     <div className="max-w-2xl text-center lg:text-left">
//                         <div className="mb-6">
//                             <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full text-purple-300 text-sm font-medium border border-purple-500/30">
//                                 ✨ 3000+ Integrations Available
//                             </span>
//                         </div>

//                         <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
//                             Connect Everything
//                         </h1>

//                         <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0">
//                             Seamlessly integrate with your favorite tools and platforms. From
//                             <span className="text-cyan-400 font-medium"> Slack</span> to
//                             <span className="text-purple-400 font-medium"> GitHub</span>, bring your AI agents into your existing workflows effortlessly.
//                         </p>

                        // <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        //     <button onClick={() =>console.log("clicked")} className="gw-full sm:w-auto px-4 py-2.5 sm:px-3.5 sm:py-2 bg-primary/80 text-white font-bold rounded-[10px] hover:bg-primary/60 transition cursor-pointer text-sm sm:text-base">
                        //         <span className="relative z-10 flex items-center justify-center gap-2">
                        //             Explore Integrations
                        //             <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        //             </svg>
                        //         </span>
                        //         <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                        //     </button>

                        //     <button onClick={() => navigate('/docs')} className="z-20 px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-2xl hover:border-gray-500 hover:text-white transition-all duration-300 hover:bg-gray-800/50">
                        //         View Documentation
                        //     </button>
                        // </div>
//                     </div>
//                 </div>

//                 <CircularToolsVisualization />
//                 <MobileIntegrationsGrid />
//             </div>
//         </div>
//     );
// };

// export default IntegratedToolsSection;


import React from 'react';
import "../../styles/tools.css";
import CircularToolsVisualization from "./IntegratedTool.jsx/CircularToolsVisualization"
import MobileIntegrationsGrid from './IntegratedTool.jsx/MobileIntegrationsGrid';
import { useNavigate } from "react-router-dom";

const IntegratedToolsSection = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen w-full bg-transparent relative overflow-hidden pl-4 md:pl-24 lg:pl-18">
            {/* Background Pattern/Image Container - Reversed Gradient */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Reversed Gradient Background - from bottom-left to top-right */}
                <div className="absolute inset-0 bg-gradient-to-tl from-cyan-900/10 via-blue-900/5 to-purple-900/10"></div>
                
                {/* Animated Background Elements - Repositioned */}
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                {/* <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div> */}
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

            {/* Content Container */}
            <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
                {/* Text Section */}
                <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-0">
                    <div className="max-w-2xl text-center lg:text-left">
                        <div className="mb-6">
                            <span className="inline-block px-4 py-2 bg-gradient-to-r from-primary/5 to-blue-500/20 rounded-full text-purple-300 text-sm font-medium border border-purple-500/30">
                                ✨ 10000+ Tools Available
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
                            Connect Everything
                        </h1>

                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0">
                            Seamlessly integrate with your favorite tools and platforms. From
                            <span className="text-cyan-400 font-medium"> Slack</span> to
                            <span className="text-purple-400 font-medium"> GitHub</span>, bring your AI agents into your existing workflows effortlessly.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button onClick={() =>console.log("clicked")} className="gw-full sm:w-auto px-4 py-2.5 sm:px-3.5 sm:py-2 bg-primary/80 text-white font-bold rounded-[10px] hover:bg-primary/60 transition cursor-pointer text-sm sm:text-base">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Explore Integrations
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                            </button>

                            <button onClick={() => navigate('/docs')} className="z-20 px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-2xl hover:border-gray-500 hover:text-white transition-all duration-300 hover:bg-gray-800/50">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </div>

                <CircularToolsVisualization />
                <MobileIntegrationsGrid />
            </div>
        </div>
    );
};

export default IntegratedToolsSection;