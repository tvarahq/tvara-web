import React, { useRef } from 'react';
import Card1 from "../../assets/essentials_card1.png"
import Card2 from "../../assets/essentials_card2.png"
import { motion, useScroll, useTransform } from "framer-motion";
export default function Essentials() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.75]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.8, 0.6]);

  const features = [
    {
      number: "1",
      title: "From Chaos to Clarity",
      description: "Stop fighting with scattered scripts and disconnected services. Tvara gives you one clean view of your entire automation system."
    },
    {
      number: "2",
      title: "Scale Without Stress",
      description: "Whether it's a single agent or a complex orchestration, the Canvas grows with you. Add new tools and flows without introducing new headaches."
    },
    {
      number: "4",
      title: "No-Code Meets Pro-Code",
      description: "Drag and drop when you want speed, dive into code when you need control. Tvara is built for both makers and engineers."
    },
    {
      number: "3",
      title: "Your Missing Teammate",
      description: "Think of Tvara agents as the colleague you've always needed. Automate repetitive tasks, connect your tools, and scale your output, without needing to hire more people."
    }
  ];

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity
      }} 
      className="text-white px-6 md:py-16 relative md:mt-10 overflow-hidden rounded-t-[3rem] bg-transparent">

      <div className='w-full flex flex-col items-center justify-center text-center gap-6'>
        <h1 className='text-4xl md:text-5xl font-bold mb-16 align-middle bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent'>
          A Simpler Path to Scale with AI
        </h1>
      </div>



      <div className="relative md:pb-18 z-10 px-4 md:px-24 lg:px-36">
        {/* Feature Cards with Custom Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-1 md:grid-rows-2 gap-4 mb-20 h-auto md:h-[600px]">
          {/* Card 1 - Left Vertical */}
          <div
            className="group relative overflow-hidden rounded-2xl p-8 hover:scale-105 transition-all duration-500 cursor-pointer md:row-span-2"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Inner Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-between">
              {/* Number Circle with Glassmorphism */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: 'rgba(6, 182, 212, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  boxShadow: '0 4px 16px rgba(6, 182, 212, 0.2)'
                }}
              >
                <span className="text-sm font-bold text-cyan-300">{features[0].number}</span>
              </div>

              {/* Title with Gradient */}
              <h3 className="text-2xl font-bold mb-4 leading-tight bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-white transition-all duration-300">
                {features[0].title}
              </h3>

              <img src={Card1} alt="" className='fixed opacity-50 bottom-0 left-0 w-[400px]' />

              {/* Description */}
              <p className="mt-6 text-gray-300 text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300 flex-grow">
                {features[0].description}
              </p>
            </div>

            {/* Bottom Border Accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
          </div>

          {/* Card 2 - Top Middle Horizontal */}
          <div
            className="group relative overflow-hidden rounded-2xl p-8 hover:scale-105 transition-all duration-500 cursor-pointer md:col-span-2"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Inner Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Number Circle with Glassmorphism */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: 'rgba(6, 182, 212, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  boxShadow: '0 4px 16px rgba(6, 182, 212, 0.2)'
                }}
              >
                <span className="text-sm font-bold text-cyan-300">{features[1].number}</span>
              </div>

              {/* Title with Gradient */}
              <h3 className="text-2xl font-bold mb-4 leading-tight bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-white transition-all duration-300">
                {features[1].title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300 flex-grow">
                {features[1].description}
              </p>
            </div>

            {/* Bottom Border Accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
          </div>

          {/* Card 4 - Right Vertical */}
          <div
            className="group relative overflow-hidden rounded-2xl p-8 hover:scale-105 transition-all duration-500 cursor-pointer md:row-span-2"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Inner Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Number Circle with Glassmorphism */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: 'rgba(6, 182, 212, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  boxShadow: '0 4px 16px rgba(6, 182, 212, 0.2)'
                }}
              >
                <span className="text-sm font-bold text-cyan-300">{features[3].number}</span>
              </div>

              {/* Title with Gradient */}
              <h3 className="text-2xl font-bold mb-4 leading-tight bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-white transition-all duration-300">
                {features[3].title}
              </h3>

              <img
                src={Card2}
                alt=""
                className="-translate-y-4 opacity-40"

              />

              {/* Description */}
              <p className="text-gray-300 text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300 flex-grow">
                {features[3].description}
              </p>
            </div>

            {/* Bottom Border Accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
          </div>

          {/* Card 3 - Bottom Middle Horizontal */}
          <div
            className="group relative overflow-hidden rounded-2xl p-8 hover:scale-105 transition-all duration-500 cursor-pointer md:col-span-2"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Inner Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Number Circle with Glassmorphism */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: 'rgba(6, 182, 212, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  boxShadow: '0 4px 16px rgba(6, 182, 212, 0.2)'
                }}
              >
                <span className="text-sm font-bold text-cyan-300">{features[2].number}</span>
              </div>

              {/* Title with Gradient */}
              <h3 className="text-2xl font-bold mb-4 leading-tight bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-white transition-all duration-300">
                {features[2].title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300 flex-grow">
                {features[2].description}
              </p>
            </div>

            {/* Bottom Border Accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}