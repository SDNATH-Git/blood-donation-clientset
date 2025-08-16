import React, { useState } from "react";
import { motion } from "framer-motion";

const bloodCompatibility = {
    "A+": ["A+", "AB+"],
    "A-": ["A+", "A-", "AB+", "AB-"],
    "B+": ["B+", "AB+"],
    "B-": ["B+", "B-", "AB+", "AB-"],
    "AB+": ["AB+"],
    "AB-": ["AB+", "AB-"],
    "O+": ["A+", "B+", "O+", "AB+"],
    "O-": ["Everyone"],
};

const BloodCompatibility = () => {
    const [bloodGroup, setBloodGroup] = useState("");
    const [compatible, setCompatible] = useState([]);

    const handleCheck = () => {
        if (bloodGroup in bloodCompatibility) {
            setCompatible(bloodCompatibility[bloodGroup]);
        } else {
            setCompatible([]);
        }
    };

    return (
        <div className=" my-16 px-5 md:px-5 lg:px-10">
            {/* Gradient Background Section */}
            <motion.div
                className="p-8 rounded-3xl shadow-xl bg-gradient-to-br from-red-600 via-base-200 to-black"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Section Heading */}
                <motion.h2
                    className="text-2xl md:text-4xl font-bold mb-8 text-center text-gray-800 drop-shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Blood Compatibility Checker Tool 🔍
                </motion.h2>

                {/* Input & Button */}
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <select
                        className="border-2 border-red-400 rounded-lg px-4 py-2 w-full md:w-48 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                    >
                        <option value="">Select Blood Group</option>
                        {Object.keys(bloodCompatibility).map((bg) => (
                            <option key={bg} value={bg}>
                                {bg}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleCheck}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors w-full md:w-auto"
                    >
                        Check Compatibility
                    </button>
                </motion.div>

                {/* Compatible Blood Groups */}
                {compatible.length > 0 && (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 "
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.2 }}
                    >
                        {compatible.map((bg, index) => (
                            <motion.div
                                key={index}
                                className="bg-red-50 border-2 border-red-400 rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                            >
                                <p className="text-black text-xl font-bold mb-2">{bg}</p>
                                <p className="text-red-600 font-medium text-sm">
                                    Compatible with {bloodGroup}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* No compatibility message */}
                {bloodGroup && compatible.length === 0 && (
                    <motion.p
                        className="text-red-200 font-semibold text-center mt-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        No compatibility found.
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
};

export default BloodCompatibility;
