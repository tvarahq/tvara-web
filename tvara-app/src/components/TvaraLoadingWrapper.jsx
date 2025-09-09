import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import navbar_logo from "../assets/tvara_logo.png";

const TvaraLoadingWrapper = ({ children }) => {
  const [animationStage, setAnimationStage] = useState("center"); 
  const [showContent, setShowContent] = useState(false);
  const [revealDone, setRevealDone] = useState(false);

  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setRevealDone(true);
    }, 3200); // mask reveal duration

    const moveTimer = setTimeout(() => {
      setAnimationStage("moving");
      setShowContent(true);
    }, 1000);

    const completeTimer = setTimeout(() => {
      setAnimationStage("complete");
    }, 4000);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(moveTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  // Logo animation stages
  const logoVariants = {
    center: {
      x: "50vw",
      y: "50vh",
      scale: 12,
      opacity: 1,
      transition: { duration: 0.1, ease: "easeOut" }
    },
    moving: {
      x: window.innerWidth < 768 ? "32px" : window.innerWidth < 1024 ? "136px" : "160px",
      y: "58px",
      scale: 1,
      opacity: 1,
      transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1], type: "tween" }
    },
    complete: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Mask animation
  const maskVariants = {
    initial: { x: "0%" },
    reveal: {
      x: "100%",
      transition: { duration: 1.2, ease: "easeInOut" }
    }
  };

  // Content animation
  const contentVariants = {
    hidden: { opacity: 0, y: 20, transition: { duration: 0.5 } },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut", delay: 0.3 } }
  };

  const overlayVariants = {
    visible: { opacity: 1, transition: { duration: 0.3 } },
    hidden: { opacity: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <>
      <AnimatePresence>
        {animationStage !== "complete" && (
          <motion.div
            className="fixed inset-0 bg-background z-50"
            variants={overlayVariants}
            initial="visible"
            animate={showContent ? "hidden" : "visible"}
            exit="hidden"
          >
            {/* Animated Logo */}
            <motion.div
              className="fixed top-0 left-0"
              style={{ transformOrigin: "center center", x: "-50%", y: "-50%" }}
              variants={logoVariants}
              initial="center"
              animate={animationStage}
            >
              <div className="relative inline-block overflow-hidden">
                {/* Logo */}
                <motion.img
                  src={navbar_logo}
                  alt="Tvara Logo"
                  className="h-6 md:h-8"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    filter:
                      animationStage === "moving"
                        ? "drop-shadow(0 4px 20px rgba(6, 182, 212, 0.3))"
                        : "none"
                  }}
                />
                {/* Black Mask */}
                {!revealDone && (
                  <motion.div
                    className="absolute inset-0 bg-black"
                    variants={maskVariants}
                    initial="initial"
                    animate="reveal"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={showContent ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </>
  );
};

export default TvaraLoadingWrapper;
