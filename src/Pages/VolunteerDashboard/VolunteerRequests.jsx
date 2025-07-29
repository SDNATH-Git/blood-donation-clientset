import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";

const VolunteerRequests = () => {
    const { user } = useContext(AuthContext);
    const [token, setToken] = useState("");

    useEffect(() => {
        const savedToken = localStorage.getItem("access-token");
        if (!savedToken) {
            toast.error("Access token not found. Please login again.");
        } else {
            setToken(savedToken);
        }
    }, []);

    const { data: requests = [], isLoading, error } = useQuery({
        queryKey: ["volunteer-requests"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/volunteer-requests", {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        },
        enabled: !!token && !!user?.email,
    });

    if (isLoading) {
        return <div className="text-center py-10">Loading assigned requests...</div>;
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-600">
                Failed to load requests: {error.message}
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-red-600">Assigned Donation Requests</h2>

            {requests.length === 0 ? (
                <p className="text-center text-gray-500">No assigned donation requests found.</p>
            ) : (
                <table className="min-w-full bg-white rounded shadow">
                    <thead className="bg-red-100 text-red-700">
                        <tr>
                            <th className="p-3 text-left">Requester Email</th>
                            <th className="p-3 text-left">Blood Group</th>
                            <th className="p-3 text-left">District</th>
                            <th className="p-3 text-left">Upazila</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Requested At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id} className="border-t hover:bg-red-50">
                                <td className="p-3">{req.requesterEmail || "N/A"}</td>
                                <td className="p-3">{req.bloodGroup}</td>
                                <td className="p-3">{req.recipientDistrict}</td>
                                <td className="p-3">{req.recipientUpazila}</td>
                                <td
                                    className={`p-3 font-semibold ${req.status === "pending"
                                        ? "text-yellow-600"
                                        : req.status === "approved"
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    {req.status}
                                </td>
                                <td className="p-3">{new Date(req.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default VolunteerRequests;
