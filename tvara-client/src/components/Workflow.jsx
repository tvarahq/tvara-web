import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function Workflow() {
    const timelineData = [
        {
            time: "Step 1",
            title: "Create an Agent",
            description: "Pick a model, give it a name, and define its personality with a prompt.",
        },
        {
            time: "Step 2",
            title: "Add Tools & Connectors",
            description: "Equip your agent with tools and connect it to your favorite platforms.",
        },
        {
            time: "Step 3",
            title: "Design Workflows",
            description: "(Coming soon) Orchestrate agents and tools into powerful, automated flows.",
        },
        {
            time: "Step 4",
            title: "Deploy Anywhere",
            description: "Run agents in the cloud, on-prem, or embed them in your apps.",
        },
    ];

    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const lineColor = useTransform(scrollYProgress, [0, 1], ["#D1D5DB", "#8B5CF6"]);

    return (
        <div className="relative flex flex-col items-center min-h-screen dark:text-gray-300 text-gray-800 py-8 sm:py-16 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-16 text-blue-600 text-center">
                How It Works
            </h1>
            
            {/* Mobile Layout - Vertical Cards */}
            <div className="block md:hidden w-full max-w-md">
                {timelineData.map((item, index) => (
                    <motion.div
                        key={index}
                        className="relative mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4">
                                {index + 1}
                            </div>
                            <h2 className="text-lg font-semibold text-blue-600">{item.time}</h2>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </motion.div>
                ))}
            </div>

            {/* Desktop Layout - Timeline */}
            <div className="hidden md:flex relative w-full max-w-5xl translate-x-10">
                <div className="relative w-1 bg-gray-800 dark:bg-gray-300">
                    <motion.div
                        className="absolute top-0 left-0 w-1 origin-top"
                        style={{
                            scaleY,
                            backgroundColor: lineColor,
                        }}
                    ></motion.div>

                    {timelineData.map((_, index) => (
                        <motion.div
                            key={index}
                            className="absolute w-6 h-6 bg-white rounded-full border-4 border-violet-800"
                            style={{
                                top: `${index * 140}px`,
                                left: "-11px",
                            }}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        ></motion.div>
                    ))}
                </div>

                <div className="flex flex-col w-full pl-16">
                    {timelineData.map((item, index) => (
                        <motion.div
                            key={index}
                            className="relative flex items-start mb-16"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="flex gap-50">
                                <h2 className="text-4xl font-semibold w-[150px]">{item.time}</h2>
                                <div>
                                    <h3 className="text-4xl font-bold">{item.title}</h3>
                                    <p className="text-sm">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
