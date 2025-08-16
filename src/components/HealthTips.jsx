import React from "react";
import { motion } from "framer-motion";

const healthTips = [
    {
        id: 1,
        text: "Drink plenty of water before donating blood.",
        img: "https://i.ibb.co/Jw8fbdBk/image.png"
    },
    {
        id: 2,
        text: "Eat a healthy meal rich in iron 2-3 hours before donation.",
        img: "https://i.ibb.co/pvjQCB7M/image.png"
    },
    {
        id: 3,
        text: "Avoid alcohol and fatty foods before donation.",
        img: "https://i.ibb.co/LDQ2JHtc/image.png"
    },
    {
        id: 4,
        text: "After donation, rest for a few minutes and have a light snack.",
        img: "https://i.ibb.co/mVKhtZMj/image.png"
    },
    {
        id: 5,
        text: "Keep yourself hydrated and avoid strenuous activity for the rest of the day.",
        img: "https://i.ibb.co/Jj52g5Jh/image.png"
    },
    {
        id: 6,
        text: "Maintain a healthy diet to support regular blood donations.",
        img: "https://i.ibb.co.com/39p1dYZc/image.png"
    }
];

const HealthTips = () => {
    return (
        <div className="px-5 md:px-5 lg:px-10 my-18 md:my-36">
            {/* Section Heading */}
            <motion.h2
                className="text-2xl md:text-4xl font-extrabold text-red-600 mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Health Tips & Donation Guidelines 🥗
            </motion.h2>

            {/* Tips Grid */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {healthTips.map((tip) => (
                    <motion.div
                        key={tip.id}
                        className="bg-gradient-to-br from-red-50 to-white border-2 border-red-400 rounded-3xl shadow-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-28 h-28 mb-4 flex items-center justify-center rounded-full overflow-hidden shadow-lg">
                            <img
                                src={tip.img}
                                alt="Tip"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-black font-semibold text-base md:text-lg">{tip.text}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default HealthTips;
