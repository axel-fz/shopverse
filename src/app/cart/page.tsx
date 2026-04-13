"use client";

import Navbar from "@/components/Navbar";
import CartItem from "@/components/cartItem";
import { useAddtoCard } from "@/store/addToCard.store";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Product } from "@/components/PopularProducts";

export default function CartPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { selectedCardIds, clearAll } = useAddtoCard();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://fakestoreapiserver.reactbd.org/api/walmartproducts?page=1&perPage=20"
      );
      setProducts(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 SAME LOGIC AS FAVORITES
  const cartProducts = products.filter((product) =>
    selectedCardIds.includes(product._id)
  );

  return (
    <>
      <Navbar />

      <div className="p-10 mt-20">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">My Cart</h1>

          <button
            onClick={clearAll}
            className="text-amber-600 font-bold flex items-center gap-1"
          >
            <RiDeleteBin5Line />
            Clear All
          </button>
        </div>

        {/* Main Layout */}
        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-4">
            {cartProducts.length > 0 ? (
              cartProducts.map((product) => (
                <CartItem
                  key={product._id}
                  id={product._id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                />
              ))
            ) : (
              <p className="text-gray-500">No products in cart.</p>
            )}
          </div>

          {/* RIGHT SUMMARY */}
          <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
            <h2 className="font-semibold mb-4">Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Total items</span>
              <span>{cartProducts.length}</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>
                $
                {cartProducts
                  .reduce((acc, item) => acc + item.price, 0)
                  .toFixed(2)}
              </span>
            </div>

            <button className="mt-6 w-full py-3 rounded-full bg-black text-white">
              Continue to checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
