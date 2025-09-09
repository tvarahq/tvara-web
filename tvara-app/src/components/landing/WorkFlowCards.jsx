import React, { useRef } from 'react'
import { motion, useTransform, useScroll } from 'framer-motion'
import Card1 from '../../assets/why_us_card1.png'
import Card2 from '../../assets/why_us_card2.png'
import Card3 from '../../assets/why_us_card3.png'
export default function WorkFlowCards({ cardData, scrollYProgress }) {

    const card1Y = useTransform(scrollYProgress, [0.33, 0.33], ["0%", "0%"]);
    const card2Y = useTransform(scrollYProgress, [0.33, 0.66], ["100%", "0%"]);
    const card3Y = useTransform(scrollYProgress, [0.66, 0.95], ["100%", "0%"]);

    return (
        <div className="relative w-full h-[100vh] flex">
            <div className="w-full h-[88vh] md:h-[90vh] relative overflow-hidden mt-[16px] md:mt-[30px]">

                {/* Card 1 (base card) - Muted blue/slate gradient */}
                <motion.div
                    style={{ y: card1Y }}
                    className="absolute inset-0 bg-gradient-to-br from-slate-800 to-neutral-900 backdrop-blur-sm rounded-2xl flex flex-col items-start justify-center p-6 md:p-8 lg:p-16 gap-6 md:gap-8 overflow-hidden"
                >
                    <div className="p-4 bg-slate-600/30 rounded-3xl backdrop-blur-sm border border-slate-500">
                        {React.createElement(cardData[0].icon, { className: "w-8 h-8 text-slate-300" })}
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white font-bold leading-tight">
                        {cardData[0].title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-xl text-gray-300 leading-relaxed max-w-4xl">
                        {cardData[0].description}
                    </p>
                    <img src={Card1} alt="Card 1 Visual" className="hidden md:block absolute md:h-[400px] lg:h-[600px] mt-4 left-1/2 rotate-100 top-0 opacity-15" />
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                    </div>
                </motion.div>

                {/* Card 2 (slides over card 1) - Muted green/emerald gradient */}
                <motion.div
                    style={{ y: card2Y }}
                    className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-slate-800 backdrop-blur-sm rounded-2xl flex flex-col items-start justify-center p-6 md:p-8 lg:p-16 gap-6 md:gap-8 overflow-hidden"
                >
                    <div className="p-4 bg-emerald-700/30 rounded-3xl backdrop-blur-sm border border-emerald-600/20">
                        {React.createElement(cardData[1].icon, { className: "w-8 h-8 text-emerald-300" })}
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white font-bold leading-tight">
                        {cardData[1].title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-xl text-gray-300 leading-relaxed max-w-4xl">
                        {cardData[1].description}
                    </p>
                    <img src={Card2} alt="Card 1 Visual" className="hidden md:block absolute md:h-[400px] lg:h-[600px] mt-4 left-1/2 rotate-45 top-0 opacity-30" />
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                    </div>
                </motion.div>

                {/* Card 3 (slides over card 2) - Muted amber/stone gradient */}
                <motion.div
                    style={{ y: card3Y }}
                    className="absolute inset-0 bg-gradient-to-br from-[#2e5d70] to-gray-800 backdrop-blur-sm rounded-2xl flex flex-col items-start justify-center p-6 md:p-8 lg:p-16 gap-6 md:gap-8 overflow-hidden"
                >
                    <div className="p-4 bg-[#2e5d70]/10 rounded-3xl backdrop-blur-sm border border-gray-500">
                        {React.createElement(cardData[2].icon, { className: "w-8 h-8 text-gray-500" })}
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white font-bold leading-tight">
                        {cardData[2].title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-xl text-gray-300 leading-relaxed max-w-4xl">
                        {cardData[2].description}
                    </p>
                    <img src={Card3} alt="Card 1 Visual" className="hidden md:block absolute md:h-[500px] lg:h-[800px] mt-4 left-[55%]  top-[40%] rotate-45 opacity-15" />
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        <div className="w-3 h-3 bg-[#2e5d70] rounded-full"></div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}