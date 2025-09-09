import React, { useRef } from 'react';
import "../../styles/tools.css";
import CircularToolsVisualization from "./IntegratedTool.jsx/CircularToolsVisualization"
import MobileIntegrationsGrid from './IntegratedTool.jsx/MobileIntegrationsGrid';
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const IntegratedToolsSection = () => {
    const navigate = useNavigate();
    const ref = useRef(null);

    // Track scroll progress for scaling effect
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Scale down and fade as the next section approaches
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.8, 0.6]);

    return (
        <motion.div
            ref={ref}
            style={{ scale, opacity }}
            className="sticky top-0 h-screen w-full bg-transparent pl-4 md:pl-24 lg:pl-18 z-10"
        >
            <div className="flex flex-col items-center lg:flex-row min-h-screen relative">
                <div className="flex-1 flex justify-center px-6">
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
                            <button
                                onClick={() => navigate('/integrations')}
                                className="w-full sm:w-auto px-4 py-2.5 sm:px-3.5 sm:py-2 bg-primary/80 text-white font-bold rounded-[10px] hover:bg-primary/60 transition cursor-pointer text-sm sm:text-base relative group"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Explore Integrations
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-150 blur-md pointer-events-none" />
                            </button>

                            <button
                                onClick={() => navigate('/docs')}
                                className="z-20 px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-2xl hover:border-gray-500 hover:text-white transition-all duration-300 hover:bg-gray-800/50 cursor-pointer"
                            >
                                View Documentation
                            </button>
                        </div>
                    </div>
                </div>

                <CircularToolsVisualization />
                <MobileIntegrationsGrid />
            </div>
        </motion.div>
    );
};

export default IntegratedToolsSection;