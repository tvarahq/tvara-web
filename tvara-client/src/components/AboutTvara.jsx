import React, { useState, useEffect } from "react";
import { RiDragDropLine } from "react-icons/ri";

export default function AboutTvara() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [dots, setDots] = useState([]);

    // Handle mouse move to update position
    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Normalize mouse position to a range of -1 to 1
        const x = (clientX / windowWidth) * 2 - 1;
        const y = (clientY / windowHeight) * 2 - 1;

        setMousePosition({ x, y });
    };

    // Generate random dots
    useEffect(() => {
        const generateDots = () => {
            const totalDots = 50; // Number of dots
            const tempDots = [];
            const dot_size = ['2px', '4px', '10px', '8px']
            for (let i = 0; i < totalDots; i++) {
                const size = Math.random() * 5; 
                const top = Math.random() * 100; // Random position (percentage)
                const left = Math.random() * 100; // Random position (percentage)
                tempDots.push({ size, top, left });
            }
            setDots(tempDots);
        };
        generateDots();
    }, []);

    return (
        <div
            className="h-screen mt-10 flex items-center justify-center relative flex-col overflow-hidden"
            onMouseMove={handleMouseMove} // Track mouse movement
        >
            {/* Render Random Dots */}
            {dots.map((dot, index) => (
                <span
                    key={index}
                    className="absolute rounded-full dark:bg-white bg-gray-900 opacity-80"
                    style={{
                        width: `${dot.size}px`,
                        height: `${dot.size}px`,
                        top: `${dot.top}%`,
                        left: `${dot.left}%`,
                    }}
                ></span>
            ))}

            {/* Gradient Background Behind h1 */}
            <h1 className="relative text-center text-3xl md:text-5xl font-bold text-black dark:text-gray-300 mb-6 w-[80%]">
                <span
                    className="absolute inset-0 opacity-0 dark:opacity-5 h-[250px] bg-gradient-to-r from-pink-300 via-blue-300 to-purple-300 rounded-full blur-3xl -translate-y-10 transition-transform duration-500 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                    }}
                ></span>
                Tvara is an open-source platform for building, connecting, and orchestrating AI agents.
            </h1>

            {/* Card Container */}
            <div className="h-full absolute w-full">
                {/* Card 1 */}
                <div
                    className="absolute gap-2 bottom-10 right-10 max-w-[530px] z-10 transition-transform duration-500 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                    }}
                >
                    <div className="inline-block px-4 py-3 bg-white/30 backdrop-blur-lg bg-gradient-to-r from-blue-200/40 via-gray-300/40 to-blue-300/40 shadow-lg rounded-lg border border-white/20 text-gray-700 dark:text-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/40 rounded-full">
                                <RiDragDropLine className="text-blue-900 text-2xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-md">Custom AI Agents</h3>
                                <p className="text-sm">
                                    Create custom AI agents with your choice of LLMs
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div
                    className="absolute gap-2 top-32 left-1/2 max-w-[530px] z-10 transition-transform duration-500 ease-out"
                    style={{
                        transform: `translate(${-mousePosition.x * 40}px, ${-mousePosition.y * 40}px)`,
                    }}
                >
                    <div className="inline-block px-4 py-3 bg-white/30 backdrop-blur-lg bg-gradient-to-r from-blue-200/40 via-gray-300/40 to-blue-300/40 shadow-lg rounded-lg border border-white/20 text-gray-700 dark:text-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/40 rounded-full">
                                <RiDragDropLine className="text-blue-900 text-2xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-md">Automation</h3>
                                <p className="text-sm">
                                    Automate complex tasks with end-to-end workflows
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div
                    className="absolute gap-2 bottom-20 left-[20%] transform -translate-x-1/2 max-w-[530px] z-10 transition-transform duration-500 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 30}px, ${-mousePosition.y * 30}px)`,
                    }}
                >
                    <div className="inline-block px-4 py-3 bg-white/30 backdrop-blur-lg bg-gradient-to-r from-blue-200/40 via-gray-300/40 to-blue-300/40 shadow-lg rounded-lg border border-white/20 text-gray-700 dark:text-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/40 rounded-full">
                                <RiDragDropLine className="text-blue-900 text-2xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-md">Easy Integration</h3>
                                <p className="text-sm">
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
