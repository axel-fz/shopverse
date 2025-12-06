
import BouncyZero from "@/components/BouncyZero";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-10 text-black">
      <div className="relative max-w-2xl w-full flex flex-col items-center text-center">
        {/* Glow Circle */}
        <div className="absolute -top-24 -left-10 w-72 h-72 bg-black/10 rounded-full blur-3xl"></div>

        {/* Glow Circle 2 */}
        <div className="absolute -bottom-20 -right-10 w-64 h-64 bg-black/5 rounded-full blur-2xl"></div>

        {/* 404 Text */}
        <h1 className="text-8xl md:text-[10rem] font-extrabold tracking-tight drop-shadow-lg">
          4
          <BouncyZero />
          4
        </h1>

        {/* Sad Face Icon */}
        <div className="my-6">
          <svg
            width="110"
            height="110"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-90"
          >
            <circle cx="60" cy="60" r="56" stroke="#000" strokeWidth="2" />
            <circle cx="45" cy="48" r="4" fill="#000" />
            <circle cx="75" cy="48" r="4" fill="#000" />
            <path
              d="M38 80 Q60 60 82 80"
              stroke="#000"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">
          Oops! Page not found.
        </h2>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-600 max-w-md leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist, has been removed,
          renamed, or is temporarily unavailable.
        </p>

        {/* Button with hover effect */}
        <Link
          href={"/"}
          className="
            px-6 py-3 rounded-full 
            bg-black text-white 
            font-semibold shadow-lg 
            transition-all duration-300
            hover:bg-white hover:text-black hover:border-black hover:border
          "
        >
          Back to Shop
        </Link>
      </div>
    </div>
  );
}
