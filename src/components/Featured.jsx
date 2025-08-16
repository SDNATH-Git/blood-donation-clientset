import React from "react";
import { motion } from "framer-motion";
import { FaTint } from "react-icons/fa";

const featuredDonors = [
    { id: 1, name: "Rahim Uddin", location: "Dhaka", bloodGroup: "A+", donations: 15 },
    { id: 2, name: "Karim Ali", location: "Chattogram", bloodGroup: "B+", donations: 12 },
    { id: 3, name: "Fatema Khatun", location: "Rajshahi", bloodGroup: "O-", donations: 18 },
];

const highDemandGroups = [
    { group: "O+", demand: 75 },
    { group: "B+", demand: 60 },
    { group: "A-", demand: 40 },
];

const Featured = () => {
    return (
        <section className="my-20 px-5 md:px-5 lg:px-10 scroll-smooth">
            {/* Section Heading */}
            <motion.h2
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-2xl md:text-4xl lg:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-black to-red-600"
            >
                Featured: High Demand Blood Groups 🩸
            </motion.h2>

            {/* High Demand Blood Groups */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
                {highDemandGroups.map(({ group, demand }) => (
                    <motion.div
                        key={group}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        className="p-6 rounded-xl bg-gradient-to-br from-white via-red-50 to-red-100 shadow-lg border border-red-300 hover:border-red-600 transition-all duration-300"
                    >
                        <h3 className="text-4xl font-extrabold text-red-700 mb-2">{group}</h3>
                        <p className="text-gray-800 mb-2">
                            Demand: <span className="font-semibold text-black">{demand}%</span>
                        </p>
                        <div className="w-full bg-red-200 h-3 rounded-full overflow-hidden">
                            <motion.div
                                className="bg-gradient-to-r from-red-600 to-black h-3 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${demand}%` }}
                                transition={{ duration: 1.2 }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Top Donors */}
            {/* <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-2xl md:text-3xl font-bold mb-8 text-center text-red-700"
            >
                🏆 Top Donors
            </motion.h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {featuredDonors.map(({ id, name, location, bloodGroup, donations }) => (
                    <motion.div
                        key={id}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-white via-red-50 to-red-100 p-6 rounded-xl border border-red-300 shadow-lg hover:shadow-2xl hover:border-red-600 transition-all duration-300"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <FaTint className="text-red-600 text-2xl" />
                            <h4 className="text-xl font-bold text-gray-900">{name}</h4>
                        </div>
                        <p className="text-gray-800">📍 {location}</p>
                        <p className="text-red-700 font-semibold">🩸 Blood Group: {bloodGroup}</p>
                        <p className="text-gray-600 mb-4">❤️ Donations: {donations}</p>
                        <button className="w-full bg-gradient-to-r from-red-600 to-black text-white py-2 rounded-lg font-medium hover:opacity-90 transition">
                            View Profile
                        </button>
                    </motion.div>
                ))}
            </div> */}


        </section>
    );
};

export default Featured;
