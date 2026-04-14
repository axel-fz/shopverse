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
  const { selectedCardIds, quantities, clearAll } = useAddtoCard();

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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cartProducts = products.filter((product) =>
    selectedCardIds.includes(product._id)
  );

  const totalItems = cartProducts.reduce(
    (acc, item) => acc + (quantities[item._id] || 1),
    0
  );

  const totalPrice = cartProducts
    .reduce(
      (acc, item) => acc + item.price * (quantities[item._id] || 1),
      0
    )
    .toFixed(2);

  return (
    <>
      <Navbar />

      <div className="p-10 mt-20 min-h-screen bg-white dark:bg-black transition-colors duration-300">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            My Cart
          </h1>

          <button
            onClick={clearAll}
            className="text-amber-600 font-bold flex items-center gap-1 hover:text-amber-700 transition cursor-pointer"
          >
            <RiDeleteBin5Line />
            Clear All
          </button>
        </div>

        {/* Main Layout */}
        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT — Cart Items */}
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
              <p className="text-gray-500 dark:text-gray-400">
                No products in cart.
              </p>
            )}
          </div>

          {/* RIGHT — Order Summary */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm h-fit transition-colors duration-300">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
              Summary
            </h2>

            <div className="flex justify-between mb-2 text-gray-600 dark:text-gray-400 text-sm">
              <span>Total items</span>
              <span>{totalItems}</span>
            </div>

            <div className="border-t border-gray-200 dark:border-zinc-700 my-3" />

            <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
              <span>Total</span>
              <span className="text-amber-600">
                ${totalPrice}
              </span>
            </div>

            <button className="mt-6 w-full py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:opacity-80 transition">
              Continue to checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}