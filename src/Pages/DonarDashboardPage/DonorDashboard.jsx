import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardHome from "../DashboardHome";

const DonorDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [donationRequests, setDonationRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`https://blood-donation-serverset.vercel.app/requests?email=${user.email}`)
                .then((res) => {
                    setDonationRequests(res.data || []);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch donations", err);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.patch(`https://blood-donation-serverset.vercel.app/requests/${id}`, { status: newStatus });
            setDonationRequests((prev) =>
                prev.map((req) => (req._id === id ? { ...req, status: newStatus } : req))
            );
            alert("Status updated");
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this request?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://blood-donation-serverset.vercel.app/requests/${id}`);
            setDonationRequests((prev) => prev.filter((req) => req._id !== id));
            alert("Deleted successfully");
        } catch (err) {
            alert("Failed to delete");
        }
    };

    if (!user) {
        return <div>Loading user info...</div>;
    }

    if (loading) {
        return <div>Loading donation requests...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white rounded shadow">
            <DashboardHome></DashboardHome>
            {/* <h1 className="text-2xl md:text-3xl font-bold mb-4 text-red-700">Welcome, {user.name}</h1> */}

            {donationRequests.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead className="bg-red-100 text-red-700">
                            <tr>
                                <th className="border border-gray-300 p-2 text-left whitespace-nowrap">Recipient Name</th>
                                <th className="border border-gray-300 p-2 text-left whitespace-nowrap hidden sm:table-cell">Location</th>
                                <th className="border border-gray-300 p-2 text-left whitespace-nowrap hidden md:table-cell">Date</th>
                                <th className="border border-gray-300 p-2 text-left whitespace-nowrap hidden md:table-cell">Time</th>
                                <th className="border border-gray-300 p-2 text-left whitespace-nowrap">Blood Group</th>
                                <th className="border border-gray-300 p-2 text-left whitespace-nowrap">Status</th>
                                <th className="border border-gray-300 p-2 text-left whitespace-nowrap hidden lg:table-cell">Donor Info</th>
                                <th className="border border-gray-300 p-2 text-left whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donationRequests.map((req) => (
                                <tr key={req._id} className="border border-gray-300 text-sm md:text-base">
                                    <td className="border p-2 whitespace-nowrap">{req.recipientName}</td>
                                    <td className="border p-2 whitespace-nowrap hidden sm:table-cell">
                                        {req.recipientDistrict}, {req.recipientUpazila}
                                    </td>
                                    <td className="border p-2 whitespace-nowrap hidden md:table-cell">{req.donationDate}</td>
                                    <td className="border p-2 whitespace-nowrap hidden md:table-cell">{req.donationTime}</td>
                                    <td className="border p-2 whitespace-nowrap">{req.bloodGroup}</td>
                                    <td className="border p-2 whitespace-nowrap capitalize">{req.status}</td>
                                    <td className="border p-2 whitespace-nowrap hidden lg:table-cell">
                                        {req.status === "inprogress" && (
                                            <>
                                                <div>{user.name}</div>
                                                <div>{user.email}</div>
                                            </>
                                        )}
                                    </td>
                                    <td className="border p-2 whitespace-nowrap space-x-1 flex flex-wrap justify-center">

                                        <button
                                            onClick={() => navigate(`/dashboard/requests/edit/${req._id}`)}
                                            className={`px-2 py-1 rounded text-white text-xs md:text-sm ${req.status === "inprogress" ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                                                }`}
                                            disabled={req.status !== "inprogress"}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(req._id)}
                                            className="px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => navigate(`/dashboard/requests/${req._id}`)}
                                            className="px-2 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-xs md:text-sm"
                                        >
                                            View
                                        </button>

                                        {req.status === "inprogress" && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusChange(req._id, "done")}
                                                    className="px-2 py-1 rounded bg-green-800 hover:bg-green-900 text-white text-xs md:text-sm"
                                                >
                                                    Done
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(req._id, "canceled")}
                                                    className="px-2 py-1 rounded bg-gray-600 hover:bg-gray-700 text-white text-xs md:text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No donation requests found.</p>
            )}

            <div className="mt-6 flex justify-end">
                <button
                    onClick={() => navigate("/dashboard/my-donation-requests")}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
                >
                    View My All Requests
                </button>
            </div>
        </div>
    );
};

export default DonorDashboard;
