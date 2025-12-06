"use client"
import React from "react";
import { motion } from "framer-motion";
import {
  buttonVariants,
} from "@/animation/variants";

type ArticleType = {
  id: number;
  title: string;
  imageUrl: string;
  discount: string;
};

const MainArticles = () => {
  const mainArticles: ArticleType[] = [
    {
      id: 1,
      title: "Nike, Adidas",
      imageUrl: "/mainarticles/1.png",
      discount: "MIN 40% OFF",
    },
    {
      id: 2,
      title: "PlayStation 5",
      imageUrl: "/mainarticles/2.png",
      discount: "MIN 25% OFF",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-5 md:gap-5 mt-10">
      {mainArticles.map((article) => (
        <motion.div
        initial = 'hidden'
        whileInView = 'visible'
        viewport={{once: true, amount: 0.1}}
        variants = {buttonVariants}
          key={article.id}
          className="w-full md:w-[48%] h-[350px] md:h-[400px] ring ring-gray-200 rounded-[40px] flex flex-col gap-4 l p-5 justify-between items-center relative group cursor-pointer"
        >
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            {article.title}
          </h1>

          <span className="text-lg md:text-xl">{article.discount}</span>

          <img
            src={article.imageUrl}
            alt="image"
            className={`${
              article.id === 1 ? "w-[50%] md:w-[40%]" : "w-[70%] md:w-[80%]"
            } max-h-[250px] md:max-h-[300px]`}
          />

          <button className="bg-orange-500 text-white px-5 py-3 rounded-full absolute bottom-5 transition-all opacity-0 duration-300 group-hover:translate-y-0 translate-y-5 group-hover:opacity-100">
            Shop Now
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default MainArticles;
