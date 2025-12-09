"use client";

import React, { useEffect, useState } from "react";
import { Linkedin, Instagram } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
/* import Link from "next/link";
 */import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";
import { toast, ToastContainer } from "react-toastify";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const { isSignedIn, user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);

  // Prefill form data if user is signed in
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const nameParts = (user.fullName || "").split(" ");
      setFormData({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        message: "",
      });
    }
  }, [isLoaded, isSignedIn, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form submitted:", formData);
    setTimeout(() => setLoading(false), 2000);
    toast.success("Message sent successfully!")
  };

  return (
    <div className="min-h-screen dark:bg-black bg-white">
      {/* NAVIGATION */}
      <Navbar />

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 pt-40 sm:pt-52 lg:pt-60 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT SECTION */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold dark:text-white text-gray-900 leading-tight">
              Get in — <br /> touch with us
            </h1>

            <p className="text-gray-600 dark:text-white  mt-6 mb-8 leading-relaxed">
              We&apos;re here to help! Whether you have a question about our
              services or need assistance, our team is ready to assist you.
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <p className="text-gray-600 dark:text-white  text-sm mb-1">Email:</p>
                <a className="text-gray-900 dark:text-white  font-semibold text-lg hover:text-blue-600">
                  hello@finpro.com
                </a>
              </div>

              <div>
                <p className="text-gray-600 dark:text-white  text-sm mb-1">Phone:</p>
                <a className="text-gray-900 font-semibold text-lg hover:text-blue-600">
                  +1 234 567 78
                </a>
                <p className="text-gray-500 dark:text-white dark:bg-gray- text-sm mt-1">
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

          {/* FORM SECTION */}
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-black shadow-lg rounded-2xl p-6 sm:p-8"
          >
            <ToastContainer position={"top-center"} />
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
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-gray-900 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-3 hover:bg-gray-800 disabled:opacity-50"
              >
                <span>{loading ? "Sending..." : "Send Message"}</span>
                <span className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full">
                  <FaArrowRight />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-black  border-t mt-16">
        <div className="max-w-7xl mx-auto px-4  py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <h3 className="font-bold dark:text-white text-gray-900 mb-3">Finpro</h3>
              <p className="text-gray-600  dark:text-white text-sm">
                Download the Finpro mobile app on App Store or Google Play.
              </p>
            </div>

            <div>
              <h4 className="font-semibold  dark:text-whitetext-gray-900 mb-3">Services</h4>
              <ul className="space-y-2 dark:text-white text-sm text-gray-600">
                <li>Digital Wallet Management</li>
                <li>Investment & Trading</li>
                <li>Money Transfer</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold dark:text-white text-gray-900 mb-3">Company</h4>
              <ul className="space-y-2 dark:text-white text-sm text-gray-600">
                <li>About</li>
                <li>Contact</li>
                <li>FAQs</li>
                <li>Blog</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold dark:text-white text-gray-900 mb-3">Social Media</h4>
              <div className="flex space-x-4">
                <Linkedin size={20} className="text-gray-600 dark:text-white" />
                <Instagram size={20} className="text-gray-600 dark:text-white" />
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
