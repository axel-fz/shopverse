"use client";
import React, { useState } from "react";
import { Linkedin, Instagram } from "lucide-react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import Link from "next/link";

export default function ContactPage() {
  const [openMenu, setOpenMenu] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    alert("Message sent successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVIGATION */}

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-auto">
        {/* DESKTOP NAV */}
        <div className="hidden sm:flex items-center space-x-6 bg-black text-white rounded-xl shadow-lg px-6 py-3">
          <Link href={"/"}>
            <div className="w-8 h-8 bg-gradient-to-b from-yellow-200 to-orange-900 rounded-[100%_0%_66%_34%_/_65%_0%_100%_35%] rotate-315"></div>
          </Link>

          <button className="flex items-center space-x-1 hover:text-gray-300">
            <span>Features</span>
            <FaChevronDown size={12} />
          </button>
          <button className="flex items-center space-x-1 hover:text-gray-300">
            <span>Resources</span>
            <FaChevronDown size={12} />
          </button>
          <button className="flex items-center space-x-1 hover:text-gray-300">
            <span>Company</span>
            <FaChevronDown size={12} />
          </button>

          <button className="bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100">
            Contact us
          </button>
        </div>

        {/* MOBILE NAV */}
        <div className="sm:hidden bg-black text-white rounded-xl shadow-lg px-4 py-3 flex items-center justify-between">
          <Link href={"/"}>
            <div className="w-8 h-8 bg-gradient-to-b from-yellow-200 to-orange-900 rounded-[100%_0%_66%_34%_/_65%_0%_100%_35%] rotate-315"></div>
          </Link>
          {/* Hamburger Button */}
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {openMenu && (
          <div className="sm:hidden bg-black text-white mt-2 rounded-xl shadow-lg p-4 space-y-4">
            <button className="flex items-center space-x-1 w-full text-left hover:text-gray-300">
              <span>Features</span>
              <FaChevronDown size={12} />
            </button>
            <button className="flex items-center space-x-1 w-full text-left hover:text-gray-300">
              <span>Resources</span>
              <FaChevronDown size={12} />
            </button>
            <button className="flex items-center space-x-1 w-full text-left hover:text-gray-300">
              <span>Company</span>
              <FaChevronDown size={12} />
            </button>

            <button className="w-full bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100">
              Contact us
            </button>
          </div>
        )}
      </nav>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 pt-40 sm:pt-52 lg:pt-60 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT TEXT */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Get in — <br /> touch with us
            </h1>

            <p className="text-gray-600 mt-6 mb-8 leading-relaxed">
              We&apos;re here to help! Whether you have a question about our services
              or need assistance, our team is ready to assist you.
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <p className="text-gray-600 text-sm mb-1">Email:</p>
                <a className="text-gray-900 font-semibold text-lg hover:text-blue-600">
                  hello@finpro.com
                </a>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-1">Phone:</p>
                <a className="text-gray-900 font-semibold text-lg hover:text-blue-600">
                  +1 234 567 78
                </a>
                <p className="text-gray-500 text-sm mt-1">
                  Monday to Friday, 9 AM - 6 PM GMT
                </p>
              </div>
            </div>

            <button className="bg-gray-900 text-white px-5 py-3 rounded-full flex items-center space-x-3 hover:bg-gray-800 transition">
              <span>Live Chat</span>
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-black">
                <FaArrowRight />
              </span>
            </button>
          </div>

          {/* FORM */}
          <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Your first name"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Your last name"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Enter your message..."
                  className="w-full px-4 py-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto bg-gray-900 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-3 hover:bg-gray-800"
              >
                <span>Send Message</span>
                <span className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full">
                  <FaArrowRight />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Finpro</h3>
              <p className="text-gray-600 text-sm">
                Download the Finpro mobile app on App Store or Google Play.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Digital Wallet Management</li>
                <li>Investment & Trading</li>
                <li>Money Transfer</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>About</li>
                <li>Contact</li>
                <li>FAQs</li>
                <li>Blog</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Social Media</h4>
              <div className="flex space-x-4">
                <Linkedin size={20} className="text-gray-600" />
                <Instagram size={20} className="text-gray-600" />
              </div>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-10">
            © 2024 Finpro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
