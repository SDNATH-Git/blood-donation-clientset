// src/pages/admin/AdminDashboard.jsx
import { useQuery } from "@tanstack/react-query";
import { FaUser, FaHandHoldingHeart, FaTint } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardHome from "../DashboardHome";

const AdminDashboard = () => {
    const [token, setToken] = useState("");

    useEffect(() => {
        const savedToken = localStorage.getItem("access-token");
        if (!savedToken) {
            toast.error("Token not found. Please login again.");
        } else {
            setToken(savedToken);
        }
    }, []);

    const axiosSecure = axios.create({
        baseURL: "https://blood-donation-serverset.vercel.app",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const { data: users = [], isLoading: loadingUsers } = useQuery({
        queryKey: ['users'],
        enabled: !!token,
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    });

    const { data: requests = [], isLoading: loadingRequests } = useQuery({
        queryKey: ['all-requests'],
        enabled: !!token,
        queryFn: async () => {
            const res = await axiosSecure.get("/all-requests");
            return res.data;
        }
    });

    const { data: funds = [], isLoading: loadingFunds } = useQuery({
        queryKey: ['funds'],
        enabled: !!token,
        queryFn: async () => {
            const res = await axiosSecure.get("/funds");
            return res.data;
        }
    });

    if (loadingUsers || loadingRequests || loadingFunds) {
        return <div className="text-center py-20 text-lg font-semibold text-gray-600">Loading Admin Dashboard...</div>;
    }

    const cardStyle = "rounded-2xl p-6 shadow-lg border hover:shadow-xl transition duration-300";

    return (
        <div className="px-6 py-10 max-w-7xl mx-auto bg-white rounded-3xl shadow-xs">
            <DashboardHome></DashboardHome>
            {/* <h2 className="text-4xl font-bold text-center text-red-600 mb-10">🛡️ Admin Dashboard</h2> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
                {/* Total Users */}
                <div className={`${cardStyle} bg-gradient-to-r from-red-100 to-red-200`}>
                    <div className="flex items-center justify-between">
                        <FaUser className="text-5xl text-red-600" />
                        <div className="text-right">
                            <h3 className="text-xl font-medium">Total Users</h3>
                            <p className="text-4xl font-bold">{users.length}</p>
                        </div>
                    </div>
                </div>

                {/* Total Requests */}
                <div className={`${cardStyle} bg-gradient-to-r from-pink-100 to-pink-200`}>
                    <div className="flex items-center justify-between">
                        <FaHandHoldingHeart className="text-5xl text-pink-600" />
                        <div className="text-right">
                            <h3 className="text-xl font-medium">Total Requests</h3>
                            <p className="text-4xl font-bold">{requests.length}</p>
                        </div>
                    </div>
                </div>

                {/* Total Funds */}
                <div className={`${cardStyle} bg-gradient-to-r from-blue-100 to-blue-200`}>
                    <div className="flex items-center justify-between">
                        <FaTint className="text-5xl text-blue-600" />
                        <div className="text-right">
                            <h3 className="text-xl font-medium">Total Funds</h3>
                            <p className="text-3xl font-bold">
                                ${funds.reduce((total, fund) => total + fund.amount, 0).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default AdminDashboard;
