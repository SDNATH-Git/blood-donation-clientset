// src/pages/AllBloodDonationRequests.jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AllBloodDonationRequests = () => {
    const [token, setToken] = useState("");
    const [role, setRole] = useState("");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 10;

    useEffect(() => {
        const savedToken = localStorage.getItem("access-token");
        const savedRole = localStorage.getItem("role");

        if (!savedToken) {
            toast.error("Access token not found. Please login again.");
        } else {
            setToken(savedToken);
            setRole(savedRole);
        }
    }, []);

    const { data: requests = [], refetch, isLoading, error } = useQuery({
        queryKey: ["allRequests", token],
        queryFn: async () => {
            if (!token) return [];
            const axiosSecure = axios.create({
                baseURL: "https://blood-donation-serverset.vercel.app",
                headers: { Authorization: `Bearer ${token}` },
            });
            const res = await axiosSecure.get("/all-requests");
            return res.data;
        },
        enabled: !!token,
    });

    // Pagination logic
    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);
    const totalPages = Math.ceil(requests.length / requestsPerPage);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const axiosSecure = axios.create({
                baseURL: "https://blood-donation-serverset.vercel.app",
                headers: { Authorization: `Bearer ${token}` },
            });
            await axiosSecure.patch(`/requests/${id}`, { status: newStatus });
            toast.success("Status updated successfully.");
            refetch();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update status.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this request?")) return;
        try {
            const axiosSecure = axios.create({
                baseURL: "https://blood-donation-serverset.vercel.app",
                headers: { Authorization: `Bearer ${token}` },
            });
            await axiosSecure.delete(`/requests/${id}`);
            toast.success("Request deleted.");
            refetch();
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete request.");
        }
    };

    if (isLoading) return <div className="text-center py-10">Loading Requests...</div>;
    if (error) return <div className="text-center py-10 text-red-600">Failed to load requests.</div>;

    return (
        <div className=" py-8 max-w-7xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-red-600">All Blood Donation Requests</h2>

            {requests.length === 0 ? (
                <p className="text-center text-gray-500">No donation requests found.</p>
            ) : (
                <>
                    {/* Table for desktop & tablet */}
                    <div className="overflow-x-auto hidden sm:block">
                        <table className="min-w-full bg-white rounded-lg shadow">
                            <thead className="bg-red-100 text-red-700">
                                <tr>
                                    <th className="p-3 text-left">Requester Email</th>
                                    <th className="p-3 text-left">Blood Group</th>
                                    <th className="p-3 text-left">District</th>
                                    <th className="p-3 text-left">Upazila</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Requested At</th>
                                    {(role === "admin" || role === "volunteer") && <th className="p-3 text-left">Update Status</th>}
                                    {role === "admin" && <th className="p-3 text-left">Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {currentRequests.map((req) => (
                                    <tr key={req._id} className="border-t hover:bg-red-50">
                                        <td className="p-3">{req.requesterEmail || "N/A"}</td>
                                        <td className="p-3">{req.bloodGroup || "N/A"}</td>
                                        <td className="p-3">{req.recipientDistrict || "N/A"}</td>
                                        <td className="p-3">{req.recipientUpazila || "N/A"}</td>
                                        <td className={`p-3 font-semibold ${req.status === "pending" ? "text-yellow-600" :
                                            req.status === "done" ? "text-green-600" :
                                                "text-red-600"
                                            }`}>{req.status}</td>
                                        <td className="p-3">{new Date(req.createdAt).toLocaleString()}</td>
                                        {(role === "admin" || role === "volunteer") && (
                                            <td className="p-3">
                                                <select
                                                    value={req.status}
                                                    onChange={(e) => handleStatusChange(req._id, e.target.value)}
                                                    className="border px-2 py-1 rounded"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="done">Done</option>
                                                    <option value="canceled">Canceled</option>
                                                </select>
                                            </td>
                                        )}
                                        {role === "admin" && (
                                            <td className="p-3">
                                                <button onClick={() => handleDelete(req._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                                                    Delete
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="sm:hidden space-y-4">
                        {currentRequests.map((req) => (
                            <div key={req._id} className="bg-white rounded-lg shadow p-4 space-y-2 border">
                                <p><span className="font-semibold text-red-600">Requester:</span> {req.requesterEmail || "N/A"}</p>
                                <p><span className="font-semibold text-red-600">Blood Group:</span> {req.bloodGroup || "N/A"}</p>
                                <p><span className="font-semibold text-red-600">District:</span> {req.recipientDistrict || "N/A"}</p>
                                <p><span className="font-semibold text-red-600">Upazila:</span> {req.recipientUpazila || "N/A"}</p>
                                <p className={`font-semibold ${req.status === "pending" ? "text-yellow-600" :
                                    req.status === "done" ? "text-green-600" :
                                        "text-red-600"
                                    }`}>Status: {req.status}</p>
                                <p><span className="font-semibold text-red-600">Requested At:</span> {new Date(req.createdAt).toLocaleString()}</p>
                                {(role === "admin" || role === "volunteer") && (
                                    <select
                                        value={req.status}
                                        onChange={(e) => handleStatusChange(req._id, e.target.value)}
                                        className="border px-2 py-1 rounded w-full"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="done">Done</option>
                                        <option value="canceled">Canceled</option>
                                    </select>
                                )}
                                {role === "admin" && (
                                    <button
                                        onClick={() => handleDelete(req._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded w-full"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex flex-wrap justify-center mt-6 gap-2">
                            {[...Array(totalPages).keys()].map((n) => (
                                <button
                                    key={n}
                                    onClick={() => setCurrentPage(n + 1)}
                                    className={`px-4 py-2 rounded ${currentPage === n + 1 ? "bg-red-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                                >
                                    {n + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllBloodDonationRequests;







