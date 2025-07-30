// src/pages/admin/AllUsers.jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Menu } from "@headlessui/react";
import { toast } from "react-toastify";

const AllUsers = () => {
    const [token, setToken] = useState("");
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        const savedToken = localStorage.getItem("access-token");
        if (!savedToken) {
            toast.error("Access token not found. Please login again.");
        } else {
            setToken(savedToken);
        }
    }, []);

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ["users", token],
        queryFn: async () => {
            if (!token) return [];
            const axiosSecure = axios.create({
                baseURL: "https://blood-donation-serverset.vercel.app",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = await axiosSecure.get("/users");
            return res.data;
        },
        enabled: !!token,
    });

    const filteredUsers =
        filter === "all" ? users : users.filter((u) => u.status === filter);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

    const handleAction = async (id, action) => {
        try {
            const axiosSecure = axios.create({
                baseURL: "https://blood-donation-serverset.vercel.app",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const res = await axiosSecure.patch(`/users/${action}/${id}`);

            if (res.data.modifiedCount > 0) {
                toast.success(`User ${action.replace("-", " ")} successfully`);
                refetch(); // Force refresh
            } else {
                toast.warning("No changes made.");
            }
        } catch (err) {
            toast.error(`Failed to ${action.replace("-", " ")} user`);
            console.error(err);
        }
    };

    if (isLoading) {
        return (
            <div className="text-center py-20 text-lg font-semibold text-red-600">
                Loading Users...
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-6">All Users</h2>

            {/* Filter Buttons */}
            <div className="mb-6 space-x-3">
                {["all", "active", "blocked"].map((stat) => (
                    <button
                        key={stat}
                        onClick={() => {
                            setFilter(stat);
                            setCurrentPage(1);
                        }}
                        className={`px-5 py-2 rounded-full font-semibold border transition ${filter === stat
                            ? "bg-red-600 text-white border-red-600"
                            : "bg-white text-red-600 border-red-600 hover:bg-red-100"
                            }`}
                    >
                        {stat.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto bg-white shadow rounded-xl">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-red-100 text-red-700">
                        <tr>
                            <th className="p-4 text-left">Avatar</th>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Role</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center p-6 text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}

                        {currentUsers.map((user) => (
                            <tr
                                key={user._id}
                                className="hover:bg-red-50 transition-colors duration-200"
                            >
                                <td className="p-4">
                                    <img
                                        src={
                                            user.avatar
                                                ? user.avatar
                                                : "https://i.ibb.co/2WzY7kN/default-avatar.png"
                                        }
                                        alt="avatar"
                                        className="w-10 h-10 rounded-full object-cover"
                                        onError={(e) =>
                                        (e.target.src =
                                            "https://i.ibb.co/2WzY7kN/default-avatar.png")
                                        }
                                    />
                                </td>
                                <td className="p-4">{user.name || "No Name"}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4 capitalize">{user.role}</td>
                                <td
                                    className={`p-4 capitalize font-semibold ${user.status === "blocked"
                                        ? "text-red-600"
                                        : "text-green-600"
                                        }`}
                                >
                                    {user.status}
                                </td>
                                <td className="p-4 text-center">
                                    <Menu as="div" className="relative inline-block text-left">
                                        <Menu.Button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none">
                                            <FaEllipsisV />
                                        </Menu.Button>

                                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-20">
                                            {user.status === "active" && (
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 ${active ? "bg-red-50" : ""
                                                                }`}
                                                            onClick={() => handleAction(user._id, "block")}
                                                        >
                                                            Block User
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            )}

                                            {user.status === "blocked" && (
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`w-full px-4 py-2 text-left text-green-600 hover:bg-green-50 ${active ? "bg-green-50" : ""
                                                                }`}
                                                            onClick={() => handleAction(user._id, "unblock")}
                                                        >
                                                            Unblock User
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            )}

                                            {user.role !== "volunteer" && (
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${active ? "bg-gray-100" : ""
                                                                }`}
                                                            onClick={() =>
                                                                handleAction(user._id, "make-volunteer")
                                                            }
                                                        >
                                                            Make Volunteer
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            )}

                                            {user.role !== "admin" && (
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`w-full px-4 py-2 text-left text-red-700 hover:bg-red-50 ${active ? "bg-red-50" : ""
                                                                }`}
                                                            onClick={() => handleAction(user._id, "make-admin")}
                                                        >
                                                            Make Admin
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            )}
                                        </Menu.Items>
                                    </Menu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-6 space-x-3">
                        {[...Array(totalPages).keys()].map((n) => (
                            <button
                                key={n}
                                onClick={() => setCurrentPage(n + 1)}
                                className={`px-4 py-2 rounded font-semibold transition ${currentPage === n + 1
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                            >
                                {n + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllUsers;
