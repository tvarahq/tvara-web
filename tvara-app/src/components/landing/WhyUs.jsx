import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { Users, Github, Zap } from "lucide-react";
import WorkFlowCards from "./WorkFlowCards";
// WorkFlowCards component with text focus

// Main WhyUs component
export default function WhyUs() {
  const container = useRef();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const cardData = [
    {
      id: "1",
      title: "For Builders, Teams, and Businesses",
      description:
        "Tvara began with a frustration every builder knows. Agentic workflows were too complex and too slow to set up. Today we are solving that for developers, non-coders, startups, and enterprises alike. Everyone gets the ability to launch agents and workflows with speed, clarity, and ease.",
      icon: Users,
    },
    {
      id: "2",
      title: "Open Source at the Core",
      description:
        "We are open source at heart. Explore our GitHub, share feedback, or contribute to the SDK that powers the platform. Every improvement comes from the community, and together we are building the future of automation.",
      icon: Github,
    },
    {
      id: "3",
      title: "Fast Development and Flexible Deployment",
      description:
        "From idea to deployment in minutes. Our intuitive interface and automation tools let you build sophisticated workflows without complexity. Deploy on your own servers for full control or let Tvara handle the infrastructure. Speed meets simplicity in every feature we create.",
      icon: Zap,
    },
  ];

  return (
    <div className="text-white mt-30 ">
      {/* Smooth Parallax Section */}
      <div
        ref={container}
        className="relative h-[300vh] md:pb-18 z-10 px-4 md:px-24 lg:px-36"
      >
        <div className="sticky top-0 h-screen">
          <WorkFlowCards
            cardData={cardData}
            scrollYProgress={scrollYProgress}
          />
        </div>
      </div>
    </div>
  );
}
