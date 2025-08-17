// src/components/ui/card.jsx
import React from "react";
import { motion } from "framer-motion";

export const Card = ({ children, className }) => (
    <motion.div
        whileHover={{ scale: 1.03 }}
        className={`rounded-xl border border-red-400 bg-white shadow-md p-4 ${className}`}
    >
        {children}
    </motion.div>
);

export const CardContent = ({ children, className }) => (
    <div className={`mt-2 ${className}`}>{children}</div>
);
