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
        setToken(savedToken);
    }, []);

    const axiosSecure = axios.create({
        baseURL: "http://localhost:5000",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        enabled: !!token,
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    });

    const filteredUsers = filter === "all" ? users : users.filter(u => u.status === filter);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

    const handleAction = async (id, action) => {
        try {
            const res = await axiosSecure.patch(`/users/${action}/${id}`);
            if (res.data.modifiedCount > 0) {
                toast.success(`User ${action} successfully`);
                refetch();
            }
        } catch (err) {
            toast.error(`Failed to ${action} user`);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">All Users</h2>

            {/* Filter Buttons */}
            <div className="mb-4 space-x-2">
                {["all", "active", "blocked"].map(stat => (
                    <button
                        key={stat}
                        onClick={() => setFilter(stat)}
                        className={`px-4 py-2 rounded-full border ${filter === stat ? "bg-red-500 text-white" : "bg-white text-red-500 border-red-500"}`}
                    >
                        {stat.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Table */}
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
                        {currentUsers.map(user => (
                            <tr key={user._id} className="hover:bg-red-50">
                                <td className="p-4">
                                    <img src={user.photo || "/avatar.png"} className="w-10 h-10 rounded-full" alt="avatar" />
                                </td>
                                <td className="p-4">{user.name}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4 capitalize">{user.role}</td>
                                <td className={`p-4 capitalize ${user.status === "blocked" ? "text-red-500" : "text-green-600"}`}>
                                    {user.status}
                                </td>
                                <td className="p-4 text-center">
                                    <Menu as="div" className="relative inline-block text-left">
                                        <Menu.Button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                                            <FaEllipsisV />
                                        </Menu.Button>
                                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-10">
                                            {user.status === "active" && (
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`w-full px-4 py-2 text-left ${active && "bg-gray-100"}`}
                                                            onClick={() => handleAction(user._id, "block")}
                                                        >
                                                            Block
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            )}
                                            {user.status === "blocked" && (
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`w-full px-4 py-2 text-left ${active && "bg-gray-100"}`}
                                                            onClick={() => handleAction(user._id, "unblock")}
                                                        >
                                                            Unblock
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            )}
                                            {user.role !== "volunteer" && (
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`w-full px-4 py-2 text-left ${active && "bg-gray-100"}`}
                                                            onClick={() => handleAction(user._id, "make-volunteer")}
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
                                                            className={`w-full px-4 py-2 text-left ${active && "bg-gray-100"}`}
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
                <div className="flex justify-center mt-4 space-x-2">
                    {[...Array(totalPages).keys()].map(n => (
                        <button
                            key={n}
                            onClick={() => setCurrentPage(n + 1)}
                            className={`px-4 py-2 rounded ${currentPage === n + 1 ? "bg-red-500 text-white" : "bg-gray-200"}`}
                        >
                            {n + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
