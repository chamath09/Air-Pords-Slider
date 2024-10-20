import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { HeadphoneData } from "../data/MockData";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { SlideRight } from "../utility/animation";

const Hero = () => {
  const [activeData, setActiveData] = useState(HeadphoneData[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HeadphoneData.length);
    }, 3000); //change every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    setActiveData(HeadphoneData[currentIndex]);
  }, [currentIndex]);

  return (
    <motion.section 
      initial={{
        backgroundImage: `radial-gradient(circle, ${activeData.bgColor} 0%, ${activeData.bgColor} 0%)`,
      }}
      animate={{
        backgroundImage: `radial-gradient(circle, ${activeData.bgColor}aa 0%, ${activeData.bgColor} 100%)`,
      }}
      transition={{ duration: 0.8 }}
      className="bg-red-400 text-gray-800"  // Changed text color to gray
    >
      <Navbar />
      <div className="container grid grid-cols-1 md:grid-cols-2 h-screen md:h-[600px] relative">
        {/* headphone info section */}
        <div className="flex flex-col justify-center py-14 md:py-0 xl:max-w-[500px] order-2 md:order-1">
          <div className="space-y-5 md:space-y-7 text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeData.id}
                variants={SlideRight(0.2)}
                initial="hidden"
                animate="show"
                exit="exit"
                className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white/90" // Adjusted text color
              >
                {activeData.title}
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeData.id}
                variants={SlideRight(0.4)}
                initial="hidden"
                animate="show"
                exit="exit"
                className="text-sm leading-loose text-gray-300" // Adjusted text color to light gray
              >
                {activeData.subtitle}
              </motion.p>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeData.id}
                variants={SlideRight(0.6)}
                initial="hidden"
                animate="show"
                exit="exit"
                className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white/90" // Adjusted text color
              >
                {activeData.price}
              </motion.p>
            </AnimatePresence>
            {/* social icon section */}
            <div className="flex items-center justify-center md:justify-start gap-4 text-3xl">
              <FaInstagram className="cursor-pointer border rounded-full p-[6px] text-gray-400 hover:text-white" />
              <FaFacebook className="cursor-pointer border rounded-full p-[6px] text-gray-400 hover:text-white" />
              <FaTwitter className="cursor-pointer border rounded-full p-[6px] text-gray-400 hover:text-white" />
            </div>
          </div>
        </div>
        {/* headphone img section */}
        <div className="flex flex-col items-center justify-center order-1 md:order-2 relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeData.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: easeInOut, delay: 0 }}
              exit={{ opacity: 0, x: -100 }}
              src={activeData.image}
              alt=""
              className="w-[300px] md:w-[500px] relative z-10"
            />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: easeInOut, delay: 0 }}
              exit={{ opacity: 0 }}
              className="text-[300px] absolute top-0 left-1/2 -translate-x-1/2 z-0 text-white/10 font-poppins font-extrabold"
            >
              {activeData.model}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* chat icon setting */}
        <div className="absolute bottom-10 right-10 z-[999]">
          <FaMessage className="text-2xl cursor-pointer text-gray-300 hover:text-white" />
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
