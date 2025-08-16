// src/components/Badges.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaAward, FaMedal, FaStar } from "react-icons/fa";

const badges = [
    {
        id: 1,
        title: "First Donation",
        desc: "Congrats on your very first blood donation!",
        icon: <FaAward className="text-4xl text-red-600" />,
    },
    {
        id: 2,
        title: "5 Times Hero",
        desc: "Awarded for donating blood 5 times. You're a hero!",
        icon: <FaMedal className="text-4xl text-yellow-500" />,
    },
    {
        id: 3,
        title: "Life Saver",
        desc: "Given to donors who have saved 10+ lives!",
        icon: <FaStar className="text-4xl text-white" />,
    },
];

const Badges = () => {
    return (
        <div className="my-20 px-5 md:px-5 lg:px-10 ">
            <div
                id="badges"
                className=" flex flex-col items-center justify-center px-2 md:px-4 py-12 bg-gradient-to-br from-red-800 via-gray-400 to-black text-white rounded-3xl shadow-2xl"
            >
                <motion.h2
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl md:text-4xl font-extrabold mb-8 text-center"
                >
                    🎖️ Donor Achievement Badges
                </motion.h2>

                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
                    {badges.map((badge) => (
                        <motion.div
                            key={badge.id}
                            whileHover={{ scale: 1.1 }}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-black bg-opacity-70 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center border border-red-600"
                        >
                            {badge.icon}
                            <h3 className="text-2xl font-semibold mt-4">{badge.title}</h3>
                            <p className="text-sm text-gray-300 mt-2">{badge.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Badges;
