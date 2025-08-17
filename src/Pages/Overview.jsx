// src/pages/Overview.jsx
import React, { useEffect, useState } from "react";
import { FaUser, FaHandHoldingHeart, FaTint, FaHourglassHalf, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";

const COLORS = ["#ef4444", "#f59e0b", "#22c55e", "#3b82f6"];

const Overview = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axiosSecure.get("/dashboard-stats");
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };
        fetchStats();
    }, [axiosSecure]);

    if (!stats) {
        return (
            <div className="text-center py-20 font-semibold text-red-600">
                Loading Dashboard...
            </div>
        );
    }

    const statusData = [
        { name: "Pending", value: stats.pending ?? 0 },
        { name: "In Progress", value: stats.inprogress ?? 0 },
        { name: "Done", value: stats.done ?? 0 },
        { name: "Canceled", value: stats.canceled ?? 0 },
    ];

    const cardVariants = {
        hover: { scale: 1.05, transition: { duration: 0.3 } },
    };

    return (
        <div className="py-10 max-w-7xl mx-auto space-y-12">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-red-600 mb-12">
                📊 Dashboard Overview
            </h2>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                    className="bg-gradient-to-r from-red-400 to-red-200 rounded-3xl p-6 shadow-lg flex items-center justify-between hover:shadow-2xl transition duration-300"
                    whileHover="hover"
                    variants={cardVariants}
                >
                    <FaUser className="text-5xl text-white" />
                    <div className="text-right">
                        <h3 className="text-lg font-medium text-white">Total Users</h3>
                        <p className="text-4xl font-bold text-white">{stats.totalUsers}</p>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-pink-400 to-pink-200 rounded-3xl p-6 shadow-lg flex items-center justify-between hover:shadow-2xl transition duration-300"
                    whileHover="hover"
                    variants={cardVariants}
                >
                    <FaHandHoldingHeart className="text-5xl text-white" />
                    <div className="text-right">
                        <h3 className="text-lg font-medium text-white">Total Requests</h3>
                        <p className="text-4xl font-bold text-white">{stats.totalRequests}</p>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-blue-400 to-blue-200 rounded-3xl p-6 shadow-lg flex items-center justify-between hover:shadow-2xl transition duration-300"
                    whileHover="hover"
                    variants={cardVariants}
                >
                    <FaTint className="text-5xl text-white" />
                    <div className="text-right">
                        <h3 className="text-lg font-medium text-white">Total Funds</h3>
                        <p className="text-4xl font-bold text-white">${stats.totalFunds}</p>
                    </div>
                </motion.div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <motion.div
                    className="bg-yellow-100 rounded-3xl p-5 shadow-lg flex items-center justify-between hover:shadow-2xl transition duration-300"
                    whileHover="hover"
                    variants={cardVariants}
                >
                    <FaHourglassHalf className="text-4xl text-yellow-500" />
                    <div className="text-right">
                        <h4 className="font-medium text-gray-700">Pending</h4>
                        <p className="text-2xl font-bold">{stats.pending ?? 0}</p>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-blue-100 rounded-3xl p-5 shadow-lg flex items-center justify-between hover:shadow-2xl transition duration-300"
                    whileHover="hover"
                    variants={cardVariants}
                >
                    <FaHandHoldingHeart className="text-4xl text-blue-500" />
                    <div className="text-right">
                        <h4 className="font-medium text-gray-700">In Progress</h4>
                        <p className="text-2xl font-bold">{stats.inprogress ?? 0}</p>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-green-100 rounded-3xl p-5 shadow-lg flex items-center justify-between hover:shadow-2xl transition duration-300"
                    whileHover="hover"
                    variants={cardVariants}
                >
                    <FaCheckCircle className="text-4xl text-green-500" />
                    <div className="text-right">
                        <h4 className="font-medium text-gray-700">Done</h4>
                        <p className="text-2xl font-bold">{stats.done ?? 0}</p>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-red-100 rounded-3xl p-5 shadow-lg flex items-center justify-between hover:shadow-2xl transition duration-300"
                    whileHover="hover"
                    variants={cardVariants}
                >
                    <FaTimesCircle className="text-4xl text-red-500" />
                    <div className="text-right">
                        <h4 className="font-medium text-gray-700">Canceled</h4>
                        <p className="text-2xl font-bold">{stats.canceled ?? 0}</p>
                    </div>
                </motion.div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <motion.div
                    className="bg-gradient-to-r from-red-50 to-red-100 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
                    whileHover="hover"
                    variants={cardVariants}
                >
                    <h3 className="text-xl font-semibold text-center mb-6 text-red-700">
                        Donation Request Status
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                                label
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Bar Chart */}
                <motion.div
                    className="bg-gradient-to-r from-black to-gray-800 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
                    whileHover="hover"
                    variants={cardVariants}
                >
                    <h3 className="text-xl font-semibold text-center mb-6 text-white">
                        Users Role Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={[
                                { role: "Admin", count: stats.admins ?? 0 },
                                { role: "Volunteers", count: stats.volunteers ?? 0 },
                                { role: "Donors", count: stats.donors ?? 0 },
                            ]}
                        >
                            <XAxis dataKey="role" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#ef4444" />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
};

export default Overview;



