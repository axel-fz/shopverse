"use client";

import { Minus, Plus, X } from "lucide-react";
import { useAddtoCard } from "@/store/addToCard.store";

interface CartItemProps {
  id: number;
  image: string;
  title: string;
  price: number;
}

export default function CartItem({
  id,
  image,
  title,
  price,
}: CartItemProps) {
  const { toggleCard } = useAddtoCard();

  return (
    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
      {/* Product */}
      <div className="flex items-center gap-4">
        <img src={image} alt={title} className="w-16 h-16 object-contain" />
        <p className="font-medium">{title}</p>
      </div>

      {/* Quantity (static for now) */}
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 border rounded-full">
          <Minus size={14} />
        </button>
        <span>1</span>
        <button className="w-8 h-8 border rounded-full">
          <Plus size={14} />
        </button>
      </div>

      {/* Price */}
      <p className="font-semibold">${price}</p>

      {/* Remove */}
      <button
        onClick={() => toggleCard(id)}
        className="text-red-500"
      >
        <X />
      </button>
    </div>
  );
}
