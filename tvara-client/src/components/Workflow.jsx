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

    // Track scroll progress
    const { scrollYProgress } = useScroll();

    // Smooth animation for the line fill
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // Interpolate the color from gray to violet based on scroll progress
    const lineColor = useTransform(scrollYProgress, [0, 1], ["#D1D5DB", "#8B5CF6"]); // Gray to Violet

    return (
        <div className="relative flex flex-col items-center min-h-screen dark:text-gray-300 text-gray-800 py-16">
            <h1 className="text-4xl font-bold mb-16 text-blue-600">How It Works</h1>
            <div className="relative flex w-full max-w-5xl translate-x-10">
                {/* Timeline Line */}
                <div className="relative w-1 bg-gray-800 dark:bg-gray-300">
                    {/* Line that fills with color as you scroll */}
                    <motion.div
                        className="absolute top-0 left-0 w-1 origin-top"
                        style={{
                            scaleY,
                            backgroundColor: lineColor, // Dynamically change the color
                        }}
                    ></motion.div>

                    {/* Dots */}
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

                {/* Timeline Content */}
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
