"use client"
import React from "react";
import Image from "next/image";
/* import { FaCircleArrowRight } from "react-icons/fa6";
 */import { motion } from "framer-motion";
import {scrollIntoViewVariant } from "@/animation/variants"
import HeaderComponent from "./HeaderComponent";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
}



const TrendingCategories = () => {
  const categories: Category[] = [
    { id: 1, name: "Mobiles", imageUrl: "/phonee.png" },
    { id: 2, name: "Laptops", imageUrl: "/laptopp.png" },
    { id: 3, name: "Headphones", imageUrl: "/headphonee.png" },
    { id: 4, name: "Monitor & TVs", imageUrl: "/tvv.png" },
    { id: 5, name: "Speakers", imageUrl: "/speakerr.png" },
  ];

  return (
    <div className="mt-10">
      {/* Title Row */}
      <HeaderComponent href = "" title="Trending Categories" />

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-5">
        {categories.map((category) => (
          <motion.div
          variants={scrollIntoViewVariant}
          initial = "hidden"
          whileInView = "visible"
          whileHover={{scale: 1.2}}
           viewport={{ once: true, amount: 0.3 }}
            key={category.id}
            className="cursor-pointer flex flex-col gap-3 items-center text-center"
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              width={200}
              height={200}
              className="w-full h-40 object-contain rounded-lg"
            />
            <h2 className="text-lg md:text-xl font-semibold">{category.name}</h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCategories;
