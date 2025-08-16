import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiSolidDonateBlood } from "react-icons/bi";
import { MdBloodtype } from "react-icons/md";

const ImpactMeter = ({ livesSaved }) => {
    const [count, setCount] = useState(0);

    // Smooth animated counting
    useEffect(() => {
        let start = 0;
        const end = 1250;
        if (start === end) return;

        const duration = 2500; // 2.5 seconds
        const incrementTime = Math.max(Math.floor(duration / end), 1);

        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [livesSaved]);

    return (
        <motion.section
            className="relative my-20 px-5 md:px-5 lg:px-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="relative bg-gradient-to-br from-red-700 via-white to-black rounded-3xl shadow-2xl p-12 overflow-hidden text-center">
                {/* Background Glow */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-80 h-80 bg-red-300 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                />

                {/* Section Heading */}
                <motion.h2
                    className="text-2xl md:text-4xl font-extrabold text-white mb-6 drop-shadow-lg relative z-10"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Impact Meter ❤️‍🔥
                </motion.h2>

                {/* Animated Counter */}
                <motion.p
                    className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-400 to-black relative z-10"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}
                >
                    {count.toLocaleString()}
                </motion.p>

                {/* Subtext */}
                <motion.p
                    className="text-white text-xl md:text-2xl font-semibold drop-shadow-md relative z-10 mt-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    Lives Saved through our App
                </motion.p>

                {/* Floating Fire Emoji */}
                <motion.div
                    className="absolute top-6 right-6 text-4xl md:text-5xl"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                    <MdBloodtype className="text-red-600" />
                    <BiSolidDonateBlood className="text-red-600" />


                </motion.div>
            </div>
        </motion.section>
    );
};

export default ImpactMeter;
