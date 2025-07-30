import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";

const MyDonationRequests = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 5;

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`https://blood-donation-serverset.vercel.app/requests?email=${user.email}`)
                .then((res) => setRequests(res.data))
                .catch((err) => console.error(err));
        }
    }, [user]);

    // Filter by status
    const filteredRequests = statusFilter === "all"
        ? requests
        : requests.filter((r) => r.status === statusFilter);

    // Pagination logic
    const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);
    const paginatedRequests = filteredRequests.slice(
        (currentPage - 1) * requestsPerPage,
        currentPage * requestsPerPage
    );

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.patch(`https://blood-donation-serverset.vercel.app/requests/${id}`, { status: newStatus });
            const updated = requests.map((r) => r._id === id ? { ...r, status: newStatus } : r);
            setRequests(updated);
        } catch (err) {
            console.error("Status update failed", err);
        }
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete?");
        if (!confirm) return;

        try {
            await axios.delete(`https://blood-donation-serverset.vercel.app/requests/${id}`);
            setRequests((prev) => prev.filter((r) => r._id !== id));
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-red-600">My Donation Requests</h2>

            {/* Filter */}
            <div className="mb-4">
                <label className="font-medium mr-2">Filter by Status:</label>
                {["all", "pending", "inprogress", "done", "canceled"].map((s) => (
                    <button
                        key={s}
                        className={`px-3 py-1 rounded mx-1 text-sm ${statusFilter === s ? "bg-red-600 text-white" : "bg-gray-200"}`}
                        onClick={() => setStatusFilter(s)}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg shadow">
                    <thead className="bg-red-600 text-white">
                        <tr>
                            <th className="p-2">Recipient</th>
                            <th className="p-2">Location</th>
                            <th className="p-2">Date</th>
                            <th className="p-2">Time</th>
                            <th className="p-2">Blood</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRequests.map((r) => (
                            <tr key={r._id} className="text-center border-t">
                                <td className="p-2">{r.recipientName}</td>
                                <td className="p-2">{r.recipientDistrict}, {r.recipientUpazila}</td>
                                <td className="p-2">{r.donationDate}</td>
                                <td className="p-2">{r.donationTime}</td>
                                <td className="p-2 font-bold text-red-600">{r.bloodGroup}</td>
                                <td className="p-2 capitalize">{r.status}</td>
                                <td className="p-2 flex gap-1 justify-center flex-wrap">
                                    {r.status === "inprogress" && (
                                        <>
                                            <button onClick={() => handleStatusUpdate(r._id, "done")} className="px-2 py-1 bg-green-500 text-white rounded text-sm">Done</button>
                                            <button onClick={() => handleStatusUpdate(r._id, "canceled")} className="px-2 py-1 bg-yellow-500 text-white rounded text-sm">Cancel</button>
                                        </>
                                    )}
                                    <Link to={`/dashboard/requests/edit/${r._id}`}>
                                        <button className="px-2 py-1 bg-blue-500 text-white rounded text-sm">Edit</button>
                                    </Link>
                                    <button onClick={() => handleDelete(r._id)} className="px-2 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
                                    <Link to={`/dashboard/requests/${r._id}`}>
                                        <button className="px-2 py-1 bg-gray-500 text-white rounded text-sm">View</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-red-600 text-white" : "bg-gray-200"}`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyDonationRequests;
