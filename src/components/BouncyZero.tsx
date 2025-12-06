"use client";
import { motion, easeInOut } from "framer-motion";

export default function BouncyZero() {
  return (
    <motion.span
      animate={{ y: [0, -50, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: easeInOut }}
    >
      0
    </motion.span>
  );
}
