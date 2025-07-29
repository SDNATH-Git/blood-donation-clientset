import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const DonationRequests = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { data: requests = [], isLoading, error } = useQuery({
        queryKey: ["pendingDonationRequests"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/donations/pending");
            return res.data;
        },
    });

    const handleViewDetails = (id) => {
        if (!user) {
            navigate("/login");
        } else {
            navigate(`/donation-details/${id}`);
        }
    };

    if (isLoading) return <div className="text-center py-10 text-red-500 font-semibold">Loading...</div>;
    if (error) return <div className="text-center text-red-600 font-semibold">Error loading requests</div>;

    return (
        <div className="min-h-screen bg-gradient-to-r from-red-50 via-white to-gray-100 py-12 px-4">
            <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-10 text-red-600 drop-shadow-sm">
                Pending Blood Donation Requests
            </h2>

            <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {requests.length === 0 && (
                    <p className="text-center text-gray-600 text-lg col-span-full">
                        No pending donation requests found.
                    </p>
                )}

                {requests.map((req) => (
                    <div
                        key={req._id}
                        className="bg-white rounded-xl border border-red-200 shadow-sm p-6 hover:shadow-md hover:border-red-300 transition cursor-pointer"
                        onClick={() => handleViewDetails(req._id)}
                    >
                        <h3 className="text-2xl font-semibold text-red-700 mb-3">{req.recipientName}</h3>
                        <p className="text-gray-700 mb-1">
                            <span className="font-medium text-red-600">Location:</span> {req.recipientDistrict}, {req.recipientupazila}
                        </p>
                        <p className="text-gray-700 mb-1">
                            <span className="font-medium text-red-600">Blood Group:</span>{" "}
                            <span className="font-bold text-red-800">{req.bloodGroup}</span>
                        </p>
                        <p className="text-gray-600 mb-1">
                            <span className="font-medium text-red-600">Date:</span> {req.donationDate}
                        </p>
                        <p className="text-gray-600 mb-4">
                            <span className="font-medium text-red-600">Time:</span> {req.donationTime}
                        </p>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleViewDetails(req._id);
                            }}
                            className="w-full bg-red-100 text-red-700 font-semibold rounded-md py-2 shadow-sm hover:shadow-md hover:bg-red-200 transition"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonationRequests;
