import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Terminal, GitBranch, Zap, Settings, Layers } from 'lucide-react';

const SDKSection = () => {
    const targetRef = useRef(null);
    
    // Track scroll progress for slide-up animation
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "start start"]
    });

    // Slide up from below
    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    const features = [
        {
            icon: <Code className="w-6 h-6" />,
            title: "Simple RAG Applications",
            description: "Build intelligent document retrieval systems with just a few lines of code"
        },
        {
            icon: <Layers className="w-6 h-6" />,
            title: "Multi-Agent Systems",
            description: "Create complex orchestrated AI workflows for enterprise-scale solutions"
        },
        {
            icon: <Settings className="w-6 h-6" />,
            title: "Industrial Use Cases",
            description: "Deploy robust AI solutions for manufacturing, logistics, and automation"
        }
    ];

    // Animation variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.section 
            ref={targetRef}
            style={{ y, opacity }}
            className="min-h-screen py-20 px-6 relative overflow-hidden z-20"
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-100 rounded-full blur-3xl"></div>
            </div>

            <motion.div 
                className="max-w-7xl mx-auto relative"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div
                    variants={itemVariants}
                    className="text-center mb-16"
                >
                    <motion.div 
                        variants={itemVariants}
                        className="inline-flex items-center gap-3 mb-6"
                    >
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <Terminal className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <GitBranch className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <Zap className="w-8 h-8 text-blue-600" />
                        </div>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-5xl font-bold text-gray-400 mb-6 leading-tight"
                    >
                        Beyond No-Code:
                        <br />
                        <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                            Full SDK Control
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        While our no-code platform gets you started quickly, our comprehensive SDK gives you
                        <span className="font-semibold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent"> unlimited creative freedom</span>.
                        Build exactly what you envision with complete control over your code.
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="grid lg:grid-cols-2 gap-12 mb-16 items-end"
                >
                    {/* Left side - Code example */}
                    <motion.div 
                        variants={itemVariants}
                        className="space-y-6"
                    >
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-blue-100/50">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                <span className="text-sm text-gray-500 ml-3">main.py</span>
                            </div>

                            <div className="font-mono text-sm space-y-2">
                                <div className="text-blue-600">from</div> <div className="text-green-600">ai_platform</div> <div className="text-blue-600">import</div> <div className="text-purple-600">SDK</div>
                                <div className="text-gray-400"># Initialize with full control</div>
                                <div><span className="text-purple-600">agent</span> = <span className="text-blue-600">SDK</span>.<span className="text-green-600">create_agent</span>()</div>
                                <div><span className="text-purple-600">agent</span>.<span className="text-green-600">add_memory</span>(<span className="text-orange-600">"vector_store"</span>)</div>
                                <div><span className="text-purple-600">agent</span>.<span className="text-green-600">deploy</span>(<span className="text-orange-600">"production"</span>)</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right side - Benefits */}
                    <motion.div 
                        variants={itemVariants}
                        className="space-y-6"
                    >
                        <h3 className="text-3xl font-bold text-gray-300 mb-8">
                            Create Whatever You Imagine
                        </h3>

                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ 
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-blue-100/30 hover:shadow-lg transition-all cursor-pointer"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-blue-100/60 rounded-lg text-blue-600 flex-shrink-0">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-2">{feature.title}</h4>
                                            <p className="text-gray-600 text-sm">{feature.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default SDKSection;