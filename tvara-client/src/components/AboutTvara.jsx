import React, { useState, useEffect } from "react";
import { RiDragDropLine } from "react-icons/ri";

export default function AboutTvara() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [dots, setDots] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMouseMove = (event) => {
        if (isMobile) return; // Disable mouse effects on mobile
        
        const { clientX, clientY } = event;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const x = (clientX / windowWidth) * 2 - 1;
        const y = (clientY / windowHeight) * 2 - 1;

        setMousePosition({ x, y });
    };

    useEffect(() => {
        const generateDots = () => {
            const totalDots = isMobile ? 25 : 50; // Fewer dots on mobile
            const tempDots = [];
            for (let i = 0; i < totalDots; i++) {
                const size = Math.random() * 5;
                const top = Math.random() * 100;
                const left = Math.random() * 100;
                tempDots.push({ size, top, left });
            }
            setDots(tempDots);
        };
        generateDots();
    }, [isMobile]);

    return (
        <div
            className="min-h-screen mt-6 sm:mt-10 flex items-center justify-center relative flex-col overflow-hidden px-4"
            onMouseMove={handleMouseMove}
        >
            {/* Render Random Dots */}
            {dots.map((dot, index) => (
                <span
                    key={index}
                    className="absolute rounded-full dark:bg-white bg-gray-900 opacity-60 sm:opacity-80"
                    style={{
                        width: `${dot.size}px`,
                        height: `${dot.size}px`,
                        top: `${dot.top}%`,
                        left: `${dot.left}%`,
                    }}
                ></span>
            ))}

            {/* Gradient Background Behind h1 */}
            <h1 className="relative text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-gray-300 mb-6 w-full max-w-4xl px-4">
                <span
                    className="absolute inset-0 opacity-0 dark:opacity-5 h-[200px] sm:h-[250px] bg-gradient-to-r from-pink-300 via-blue-300 to-purple-300 rounded-full blur-3xl -translate-y-10 transition-transform duration-500 ease-out"
                    style={{
                        transform: isMobile 
                            ? 'translate(0px, 0px)' 
                            : `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                    }}
                ></span>
                Tvara is an open-source platform for building, connecting, and orchestrating AI agents.
            </h1>

            {/* Card Container */}
            <div className="h-full absolute w-full">
                {/* Card 1 */}
                <div
                    className="absolute bottom-10 right-4 sm:right-10 max-w-[280px] sm:max-w-[530px] z-10 transition-transform duration-500 ease-out"
                    style={{
                        transform: isMobile 
                            ? 'translate(0px, 0px)' 
                            : `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                    }}
                >
                    <div className="inline-block px-3 sm:px-4 py-2 sm:py-3 bg-white/30 backdrop-blur-lg bg-gradient-to-r from-blue-200/40 via-gray-300/40 to-blue-300/40 shadow-lg rounded-lg border border-white/20 text-gray-700 dark:text-gray-200">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="p-1.5 sm:p-2 bg-white/40 rounded-full">
                                <RiDragDropLine className="text-blue-900 text-lg sm:text-2xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm sm:text-md">Custom AI Agents</h3>
                                <p className="text-xs sm:text-sm">
                                    Create custom AI agents with your choice of LLMs
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div
                    className="absolute top-20 sm:top-32 left-4 sm:left-1/2 max-w-[280px] sm:max-w-[530px] z-10 transition-transform duration-500 ease-out"
                    style={{
                        transform: isMobile 
                            ? 'translate(0px, 0px)' 
                            : `translate(${-mousePosition.x * 40}px, ${-mousePosition.y * 40}px)`,
                    }}
                >
                    <div className="inline-block px-3 sm:px-4 py-2 sm:py-3 bg-white/30 backdrop-blur-lg bg-gradient-to-r from-blue-200/40 via-gray-300/40 to-blue-300/40 shadow-lg rounded-lg border border-white/20 text-gray-700 dark:text-gray-200">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="p-1.5 sm:p-2 bg-white/40 rounded-full">
                                <RiDragDropLine className="text-blue-900 text-lg sm:text-2xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm sm:text-md">Automation</h3>
                                <p className="text-xs sm:text-sm">
                                    Automate complex tasks with end-to-end workflows
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div
                    className="absolute bottom-20 left-4 sm:left-[20%] sm:transform sm:-translate-x-1/2 max-w-[280px] sm:max-w-[530px] z-10 transition-transform duration-500 ease-out"
                    style={{
                        transform: isMobile 
                            ? 'translate(0px, 0px)' 
                            : `translate(${mousePosition.x * 30}px, ${-mousePosition.y * 30}px)`,
                    }}
                >
                    <div className="inline-block px-3 sm:px-4 py-2 sm:py-3 bg-white/30 backdrop-blur-lg bg-gradient-to-r from-blue-200/40 via-gray-300/40 to-blue-300/40 shadow-lg rounded-lg border border-white/20 text-gray-700 dark:text-gray-200">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="p-1.5 sm:p-2 bg-white/40 rounded-full">
                                <RiDragDropLine className="text-blue-900 text-lg sm:text-2xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm sm:text-md">Easy Integration</h3>
                                <p className="text-xs sm:text-sm">
                                    Integrate tools and APIs, from web search to databases
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
