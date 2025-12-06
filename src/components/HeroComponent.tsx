"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  textVariants,
  buttonVariants,
  imageVariants,
} from "@/animation/variants";

const HeroComponent = () => {
  return (
    <div className="hero-bg rounded-[30px] overflow-hidden w-full mt-20">
      <div className="relative h-[500px] md:h-[650px] bg-[#00000080] p-6 md:p-10 flex items-start  lg:items-center">
        {/* Left content */}
        <motion.div
          className="text-white flex flex-col gap-3 max-w-xl "
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <span className="uppercase text-xl md:text-2xl">
            Sale up to 20% off
          </span>
          <h1 className="font-extrabold text-[35px] md:text-[50px] leading-tight">
            Apple Watch Ultra 2
          </h1>
          <p className="text-sm sm:text-xl lg:text-md max-w-md">
            The most rugged and capable Apple Watch pushes the limits again.
            Featuring the all-new S9 SiP.
          </p>

          <div className="flex gap-4 mt-5">
            <motion.button
              className="bg-orange-500 text-white px-5 py-3 rounded-full"
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop now
            </motion.button>

            <motion.button
              className="bg-white text-black px-5 py-3 rounded-full"
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Watch Images */}
        <motion.div
          className="absolute right-[180px] md:right-[350px] lg:right-[250px] md:bottom-[-10] bottom-[-5] w-[40%] md:w-[30%] lg:bottom-[50]"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <Image
            src="/hero_w1.png"
            alt="watch image"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </motion.div>

        <motion.div
          className="absolute right-[20px] sm:right-[20px]  md:right-0 lg:right-[0px] md:bottom-[-10] bottom-[-5] w-[22%] md:w-[17%] lg:bottom-[50]"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <Image
            src="/hero_w2.png"
            alt="watch image"
            width={300}
            height={300}
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroComponent;
