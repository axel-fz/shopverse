"use client";

import React from "react";
import { Product } from "./PopularProducts";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";
import { motion } from "framer-motion";
import { buttonVariants } from "@/animation/variants";
import { useStoreFavorites } from "@/store/favorite.store";
import { useAddtoCard } from "@/store/addToCard.store";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { selectedFavoriteIds, toggleHeartIcon } = useStoreFavorites();
  const { selectedCardIds, toggleCard } = useAddtoCard();

  const isFav = selectedFavoriteIds.includes(product._id);
  const inCart = selectedCardIds.includes(product._id);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={buttonVariants}
      className="h-[400px] relative w-[300px] p-5 ring ring-gray-200 rounded-[50px] flex items-center group flex-col gap-2 justify-center overflow-hidden bg-white dark:bg-zinc-900 transition-colors duration-300"
    >
      <img src={product.image} alt={product.title} className="w-[70%]" />

      <div className="flex gap-3 mt-2">
        <FaStar color="gold" />
        <FaStar color="gold" />
        <FaStar color="gold" />
        <FaStarHalfAlt color="gold" />
      </div>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {product.title.slice(0, 10)}
      </h1>

      <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
        <h2 className="font-semibold">${product.price}</h2>
        {product.oldPrice && (
          <span className="line-through text-gray-400">${product.oldPrice}</span>
        )}
      </div>

      {/* Add to Cart */}
      <button
        onClick={() => toggleCard(product._id)}
        className={`${
          !inCart ? "bg-orange-500" : "bg-gray-400"
        } text-white px-5 font-bold py-3 rounded-full absolute bottom-2 transition-all opacity-0 duration-300 group-hover:translate-y-0 translate-y-5 group-hover:opacity-100`}
      >
        {inCart ? "In Cart" : "Add to Cart"}
      </button>

      {/* Favorite toggle */}
      <div
        className={`${
          !isFav ? "bg-[#ff6900]" : "bg-gray-400"
        } p-2 absolute rounded-full top-5 right-5 flex items-center justify-center transition-colors duration-300`}
      >
        <TiHeartFullOutline
          onClick={() => toggleHeartIcon(product._id)}
          size={30}
          color={!isFav ? "#fff" : "red"}
          className="transition-transform hover:scale-125 cursor-pointer"
        />
      </div>
    </motion.div>
  );
};

export default ProductCard;