import React from 'react';
import { Users, Zap, Heart, Github, ArrowRight, Sparkles } from 'lucide-react';
import right_arrow from "../../assets/right_arrow.svg";
export default function CommunitySection() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 md:px-24 lg:px-24">
            <div className="relative mt-20">
                {/* Main Header */}
                <div className="text-center mb-12">
                    <h1 className='text-4xl md:text-5xl font-bold mb-4 text-center leading-[60px]'>
                        Smarter Workflows, Stronger Teams
                    </h1>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Built for Builders Card */}
                    <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform ">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 bg-blue-500/20 rounded-2xl">
                                <Users className="w-6 h-6 text-blue-300" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">Built for Builders, Teams, and Businesses</h2>
                            </div>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                            Tvara began with a frustration every builder knows: agentic workflows were too complex and too slow to set up. Today, we're solving that for developers, startups, and enterprises alike, giving everyone the ability to launch agents and workflows with speed and clarity.
                        </p>
                        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="w-5 h-5 text-blue-300" />
                        </div>
                    </div>

                    {/* Early Access Card */}
                    <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform ">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 bg-primary/20 rounded-2xl">
                                <Zap className="w-6 h-6 text-primary/80" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">Early Access</h2>
                            </div>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                            Join our waitlist today and get into the Canvas beta before anyone else. Whether you're an individual tinkerer or a startup looking to plug the "missing teammate" into your team, Tvara gets you there faster.
                        </p>
                        <div className="mt-6">
                            <button className="w-full sm:w-auto px-4 py-2.5 sm:px-3.5 sm:py-2 bg-primary/40 text-white font-bold rounded-[10px] hover:bg-primary/60 transition cursor-pointer text-sm sm:text-base">
                                <span className="flex items-center justify-center">
                                    Join Waitlist
                                    <img
                                        src={right_arrow}
                                        alt="Right Arrow"
                                        className="inline h-2 ml-2.5"
                                    />
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Your Missing Teammate Card */}
                    <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform ">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 bg-green-500/20 rounded-2xl">
                                <Heart className="w-6 h-6 text-green-300" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">Your Missing Teammate</h2>
                            </div>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                            Think of Tvara agents as the colleague you've always needed. Automate repetitive tasks, connect your tools, and scale your output, without needing to hire more people.
                        </p>
                        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="w-5 h-5 text-green-300" />
                        </div>
                    </div>

                    {/* Open Source Spirit Card */}
                    <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform ">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 bg-orange-500/20 rounded-2xl">
                                <Github className="w-6 h-6 text-orange-300" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">Open Source Spirit</h2>
                            </div>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                            We're open-source at heart. Explore our GitHub, share feedback, or contribute to the SDK. Every improvement comes from the community, and together we're building the future of automation.
                        </p>
                        <div className="mt-6">
                            <button className="bg-white/10 text-white w-full sm:w-auto px-4 py-2.5 sm:px-3.5 sm:py-2 rounded-[10px] font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2 border border-white/20">
                                <Github className="w-4 h-4" />
                                Explore GitHub
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10">
                        <h3 className="text-3xl font-bold text-white mb-4">Ready to Build the Future?</h3>
                        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of builders who are already automating their workflows with Tvara.
                            The future of work is here, and it starts with you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="w-full sm:w-auto px-4 py-2.5 sm:px-3.5 sm:py-2 bg-primary/70 text-white font-bold rounded-[10px] hover:bg-primary/60 transition cursor-pointer text-sm sm:text-base flex gap-3">
                                <span>Get Early Access</span>
                                <span><Sparkles className="w-5 h-5" /></span>
                            </button>
                            <button className="bg-white/10 text-white w-full sm:w-auto px-4 py-2.5 sm:px-3.5 sm:py-2 rounded-[10px] font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2 border border-white/20">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}