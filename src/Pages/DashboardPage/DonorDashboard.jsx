import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DonorDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [donationRequests, setDonationRequests] = useState([]);

    useEffect(() => {
        if (user?.email) {
            // Fetch donor's own donation requests (limit 3, sorted by recent)
            axios
                .get(`http://localhost:5000/donations?donorEmail=${user.email}&limit=3&sort=desc`)
                .then((res) => {
                    setDonationRequests(res.data);
                })
                .catch((err) => console.error("Failed to fetch donations", err));
        }
    }, [user]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:5000/donations/${id}`, { status: newStatus });
            setDonationRequests((prev) =>
                prev.map((req) =>
                    req._id === id ? { ...req, status: newStatus } : req
                )
            );
            alert("Status updated");
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this request?");
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:5000/donations/${id}`);
            setDonationRequests((prev) => prev.filter((req) => req._id !== id));
            alert("Deleted successfully");
        } catch (err) {
            alert("Failed to delete");
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-3xl font-bold mb-6 text-red-700">
                Welcome, {user.name}
            </h1>

            {donationRequests.length > 0 ? (
                <>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-red-100 text-red-700">
                                <th className="border border-gray-300 p-2">Recipient Name</th>
                                <th className="border border-gray-300 p-2">Location</th>
                                <th className="border border-gray-300 p-2">Date</th>
                                <th className="border border-gray-300 p-2">Time</th>
                                <th className="border border-gray-300 p-2">Blood Group</th>
                                <th className="border border-gray-300 p-2">Status</th>
                                <th className="border border-gray-300 p-2">Donor Info</th>
                                <th className="border border-gray-300 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donationRequests.map((req) => (
                                <tr key={req._id} className="text-center border border-gray-300">
                                    <td className="border p-2">{req.recipientName}</td>
                                    <td className="border p-2">{req.recipientDistrict}, {req.recipientUpazila}</td>
                                    <td className="border p-2">{req.donationDate}</td>
                                    <td className="border p-2">{req.donationTime}</td>
                                    <td className="border p-2">{req.bloodGroup}</td>
                                    <td className="border p-2 capitalize">{req.status}</td>
                                    <td className="border p-2">
                                        {req.status === "inprogress" && (
                                            <>
                                                <div>{user.name}</div>
                                                <div>{user.email}</div>
                                            </>
                                        )}
                                    </td>
                                    <td className="border p-2 space-x-2">
                                        <button
                                            onClick={() => navigate(`/donations/edit/${req._id}`)}
                                            className={`px-2 py-1 rounded text-white ${req.status === "inprogress" ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                                                }`}
                                            disabled={req.status !== "inprogress"}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(req._id)}
                                            className="px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            Delete
                                        </button>

                                        <button
                                            onClick={() => navigate(`/donations/view/${req._id}`)}
                                            className="px-2 py-1 rounded bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            View
                                        </button>

                                        {req.status === "inprogress" && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusChange(req._id, "done")}
                                                    className="px-2 py-1 rounded bg-green-800 hover:bg-green-900 text-white"
                                                >
                                                    Done
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(req._id, "canceled")}
                                                    className="px-2 py-1 rounded bg-gray-600 hover:bg-gray-700 text-white"
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

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={() => navigate("/donations/my-requests")}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
                        >
                            View My All Requests
                        </button>
                    </div>
                </>
            ) : (
                <p>No donation requests found.</p>
            )}
        </div>
    );
};

export default DonorDashboard;
