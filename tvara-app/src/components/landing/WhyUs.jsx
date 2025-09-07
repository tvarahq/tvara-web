import React, { useRef } from 'react'
import WorkFlowCards from './WorkFlowCards'
import Card1 from "../../assets/card 1.png"
import Card2 from "../../assets/workflow_card2.png"
import { Users, Github, Zap } from 'lucide-react'
import { useScroll } from 'framer-motion'

export default function WhyUs() {
    const container = useRef();

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    });

    const cardData = [
        {
            id: "1",
            title: "Built for Builders, Teams, and Businesses",
            description: "Tvara began with a frustration every builder knows: agentic workflows were too complex and too slow to set up. Today, we're solving that for developers, startups, and enterprises alike, giving everyone the ability to launch agents and workflows with speed and clarity.",
            icon: Users,
            image: Card1
        },
        {
            id: "2",
            title: "Open Source Spirit",
            description: "We're open-source at heart. Explore our GitHub, share feedback, or contribute to the SDK. Every improvement comes from the community, and together we're building the future of automation.",
            icon: Github,
            image: Card2
        },
        {
            id: "3",
            title: "Lightning Fast Development",
            description: "From idea to deployment in minutes, not hours. Our intuitive interface and powerful automation tools help you build sophisticated workflows without the complexity. Speed meets simplicity in every feature we create.",
            icon: Zap,
            image: Card1
        }
    ];

    return (
        <div className="text-white mt-30">
            {/* Header Section */}
            <div className="flex items-center justify-center mb-30">
                <div className="text-center px-4">
                    <h1 className='text-3xl md:text-5xl font-bold mb-6 text-gray-300 leading-tight'>
                        Smarter Workflows, Stronger Teams
                    </h1>
                </div>
            </div>

            {/* Smooth Parallax Section */}
            <div
                ref={container}
                className='relative h-[300vh] md:pb-18 z-10 px-4 md:px-24 lg:px-36 bg-background'
            >
                <div className="sticky top-0 h-screen">
                    <WorkFlowCards
                        cardData={cardData}
                        scrollYProgress={scrollYProgress}
                    />
                </div>
            </div>
        </div>
    )
}