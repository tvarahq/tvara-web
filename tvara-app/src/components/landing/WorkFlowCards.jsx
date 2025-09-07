import React from 'react'
import { motion, useTransform } from 'framer-motion'

export default function WorkFlowCards({ cardData, scrollYProgress }) {
    // Opacity for texts
    const textOpacity1 = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0])
    const textOpacity2 = useTransform(scrollYProgress, [0.33, 0.5, 0.66], [0, 1, 0])
    const textOpacity3 = useTransform(scrollYProgress, [0.66, 0.8, 1], [0, 1, 1])

    // Slide-in effect for images
    const image1Y = useTransform(scrollYProgress, [0.33, 0.33], ["0%", "0%"]); // move fully out
    const image2Y = useTransform(scrollYProgress, [0.33, 0.66], ["100%", "0%"]); // comes fully in
    const image3Y = useTransform(scrollYProgress, [0.66, 1], ["100%", "0%"]); // comes fully in
    // slides up over img2

    return (
        <div className="relative w-full h-[90vh] flex rounded-full">
            {/* Left: Text content */}
            <div className="bg-background w-[55%] h-[100vh] p-10 flex flex-col justify-center relative overflow-hidden">
                {/* Card 1 text */}
                <motion.div
                    style={{ opacity: textOpacity1 }}
                    className="absolute inset-0 flex flex-col items-start justify-center p-10 gap-6"
                >
                    <div className="p-3 bg-blue-500/20 rounded-2xl">
                        {React.createElement(cardData[0].icon, { className: "w-6 h-6 text-blue-300" })}
                    </div>
                    <h1 className="text-4xl text-primary/80 font-semibold">{cardData[0].title}</h1>
                    <p className="text-gray-300">{cardData[0].description}</p>
                </motion.div>

                {/* Card 2 text */}
                <motion.div
                    style={{ opacity: textOpacity2 }}
                    className="absolute inset-0 flex flex-col items-start justify-center p-10 gap-6"
                >
                    <div className="p-3 bg-blue-500/20 rounded-2xl">
                        {React.createElement(cardData[1].icon, { className: "w-6 h-6 text-blue-300" })}
                    </div>
                    <h1 className="text-4xl text-primary/80 font-semibold">{cardData[1].title}</h1>
                    <p className="text-gray-300">{cardData[1].description}</p>
                </motion.div>

                {/* Card 3 text */}
                <motion.div
                    style={{ opacity: textOpacity3 }}
                    className="absolute inset-0 flex flex-col items-start justify-center p-10 gap-6"
                >
                    <div className="p-3 bg-blue-500/20 rounded-2xl">
                        {React.createElement(cardData[2].icon, { className: "w-6 h-6 text-blue-300" })}
                    </div>
                    <h1 className="text-4xl text-primary/80 font-semibold">{cardData[2].title}</h1>
                    <p className="text-gray-300">{cardData[2].description}</p>
                </motion.div>
            </div>

            {/* Right: Sliding images */}
            <div className="w-[45%] h-[80vh] relative overflow-hidden pt-20">
                {/* Image 1 (base) */}
                <motion.img
                    src={cardData[0].image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover top-30 rounded-xl"
                    style={{ y: image1Y }}
                />

                {/* Image 2 (slides in over 1) */}
                <motion.img
                    src={cardData[1].image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover top-30 rounded-xl"
                    style={{ y: image2Y }}
                />

                {/* Image 3 (slides in over 2) */}
                <motion.img
                    src={cardData[2].image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover top-30 rounded-xl"
                    style={{ y: image3Y }}
                />
            </div>
        </div>
    )
}
