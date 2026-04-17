"use client";

import Navbar from "@/components/Navbar";
import CartItem from "@/components/cartItem";
import { useAddtoCard } from "@/store/addToCard.store";
import { useAuth, useUser, SignInButton } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Product } from "@/components/PopularProducts";

// Extract a readable name from email
// e.g. "john.doe@gmail.com" → "John Doe"
function nameFromEmail(email: string): string {
  const local = email.split("@")[0];
  return local
    .split(/[._-]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function CartPage() {
  const [visited, setVisited] = useState(false);
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  const [products, setProducts] = useState<Product[]>([]);
  const { selectedCardIds, quantities, clearAll } = useAddtoCard();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const name = user?.fullName || (email ? nameFromEmail(email) : "");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cartProducts = products.filter((product) =>
    selectedCardIds.includes(product._id)
  );

  const totalItems = cartProducts.reduce(
    (acc, item) => acc + (quantities[item._id] || 1),
    0
  );

  const totalPriceNumber = cartProducts.reduce(
    (acc, item) => acc + item.price * (quantities[item._id] || 1),
    0
  );

  const totalPrice = totalPriceNumber.toFixed(2);

  const payUnitItems = cartProducts.map((product) => ({
    price_description: {
      unit_amount: product.price * (quantities[product._id] || 1),
    },
    product_description: {
      name: product.title,
      image_url: product.image,
      about_product: product.title,
    },
    quantity: quantities[product._id] || 1,
  }));

  const handleSubmit = async () => {
    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=${encodeURIComponent("/cart")}`);
      return;
    }

    if (!phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    if (cartProducts.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        amount: totalPriceNumber,
        phone: phone.trim(),
        email,
        name,
        items: payUnitItems,
      };

      const res = await axios.post("/api/payments/checkout", payload);

      if (!res.data?.success) {
        console.error("Checkout error:", res.data?.error);
        alert("Failed to start payment. Please try again.");
        return;
      }

      const redirectUrl = res.data?.checkoutId?.redirect;

      if (!redirectUrl) {
        console.error("No redirect URL in response:", res.data);
        alert("Payment URL not received. Please try again.");
        return;
      }

      window.location.href = redirectUrl;
    } catch (err) {
      console.error("Error during checkout:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Rotating light border keyframes */}
      <style>{`
        @keyframes spin-border {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes rotate-light {
          0%   { --angle: 0deg; }
          100% { --angle: 360deg; }
        }

        .glow-border {
          position: relative;
          border-radius: 0.5rem;
          z-index: 0;
        }

        .glow-border::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 0.6rem;
          z-index: -1;
          background: conic-gradient(
            from var(--angle, 0deg),
            #f59e0b,
            #fcd34d,
            #ffffff,
            #fcd34d,
            #f5460bff
          );
          animation: border-spin 2.5s linear infinite;
        }

        @property --angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes border-spin {
          to {
            --angle: 360deg;
          }
        }

        .glow-border::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 0.5rem;
          z-index: -1;
          background: inherit;
        }
      `}</style>

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

            <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white mb-4">
              <span>Total</span>
              <span className="text-amber-600">${totalPrice}</span>
            </div>

            {/* Show user info fields only when signed in */}
            {isLoaded && isSignedIn && (
              <div className="mb-4 space-y-3">
                {/* Email — read only from Clerk */}
                <div className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-sm text-gray-500 dark:text-gray-400">
                  {email}
                </div>

                {/* Name — read only, derived from Clerk */}
                <div className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-sm text-gray-500 dark:text-gray-400">
                  {name}
                </div>

                {/* Phone — user fills this in */}
                <input
                  type="tel"
                  placeholder="Phone number (e.g. 699123456)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/70"
                />
              </div>
            )}

            {/* Not signed in — glowing sign in prompt */}
            {isLoaded && !isSignedIn && (
              <div className="glow-border mb-4">
                <div className="relative p-3 rounded-lg bg-amber-50 dark:bg-zinc-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You need to{" "}
                    <SignInButton
                      mode="redirect"
                      redirectUrl="/cart"
                    >
                      <span
                        onClick={() => setVisited(true)}
                        className="text-amber-600 underline cursor-pointer font-semibold"
                      >
                        sign in
                      </span>
                    </SignInButton>{" "}
                    before you can checkout.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading && !visited}
              className="mt-2 w-full py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Redirecting..." : "Continue to checkout"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}