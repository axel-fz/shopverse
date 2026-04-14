"use client";

import { Minus, Plus, X } from "lucide-react";
import { useAddtoCard } from "@/store/addToCard.store";

interface CartItemProps {
  id: number;
  image: string;
  title: string;
  price: number;
}

export default function CartItem({ id, image, title, price }: CartItemProps) {
  const { quantities, increase, decrease, removeFromCart } = useAddtoCard();

  const qty = quantities[id] || 1;

  return (
    <div className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl p-4 shadow-sm transition-colors duration-300">
      {/* Product */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <img
          src={image}
          alt={title}
          className="w-16 h-16 object-contain flex-shrink-0"
        />
        <p className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
          {title}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2 mx-4">
        <button
          onClick={() => decrease(id)}
          className="w-8 h-8 border border-gray-300 dark:border-zinc-600 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
        >
          <Minus size={14} />
        </button>
        <span className="text-gray-900 dark:text-white font-medium w-6 text-center">
          {qty}
        </span>
        <button
          onClick={() => increase(id)}
          className="w-8 h-8 border border-gray-300 dark:border-zinc-600 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Price (per item × qty) */}
      <p className="font-semibold text-amber-600 dark:text-amber-400 w-24 text-right">
        ${(price * qty).toFixed(2)}
      </p>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(id)}
        className="ml-4 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition"
      >
        <X size={20} />
      </button>
    </div>
  );
}