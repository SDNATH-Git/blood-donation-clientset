import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DonateModal from "./DonateModal";
import { AuthContext } from "../../Provider/AuthProvider";

const DonationRequestDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);

    const { data: request, isLoading, error } = useQuery({
        queryKey: ["donationRequest", id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/donations/${id}`);
            return res.data;
        },
    });

    if (isLoading) return (
        <div className="flex justify-center items-center h-60">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
    );

    if (error || !request) return (
        <div className="text-red-600 text-center mt-10 text-lg font-semibold">
            Failed to load donation request.
        </div>
    );

    const {
        recipientName,
        bloodGroup,
        hospitalName,
        address,
        recipientDistrict,
        recipientUpazila,
        donationDate,
        donationTime,
        requestMessage,
        status,
    } = request;

    return (
        <div className="md:max-w-2xl mb-6 mx-4  md:mx-auto p-8 bg-gradient-to-r from-red-50 via-white to-red-50 rounded-xl shadow-lg mt-12 relative overflow-hidden">
            {/* Background animated gradient circles */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-300 rounded-full opacity-30 animate-pulse mix-blend-multiply"></div>
            <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-red-400 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>

            <h2 className="text-2xl md:text-4xl font-extrabold text-red-700 mb-8 text-center drop-shadow-lg">
                Donation Request Details
            </h2>

            {/* এখানে space-y-5 থেকে space-y-2 কমানো হয়েছে */}
            <div className=" text-gray-800 ">
                <DetailRow label="Recipient Name" value={recipientName} />
                <DetailRow label="Blood Group" value={bloodGroup} highlight />
                <DetailRow label="Hospital" value={hospitalName} />
                <DetailRow label="Address" value={`${address}, ${recipientUpazila}, ${recipientDistrict}`} />
                <DetailRow label="Date & Time" value={`${donationDate} at ${donationTime}`} />
                <DetailRow label="Status" value={status} status />
                <DetailRow label="Message" value={requestMessage} />
            </div>

            {/* Donate Button */}
            {status === "pending" && (
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-red-600 text-white px-10 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105 active:scale-95"
                    >
                        Donate Now
                    </button>
                </div>
            )}

            {showModal && (
                <DonateModal
                    requestId={id}
                    donorName={user?.displayName}
                    donorEmail={user?.email}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

const DetailRow = ({ label, value, highlight, status }) => {
    return (
        <div className="flex gap-3 border-b border-gray-300 pb-2">
            <span className="font-semibold text-gray-700">{label}:</span>
            {highlight ? (
                <span className="text-red-600 font-extrabold">{value}</span>
            ) : status ? (
                <span className={`capitalize font-bold ${value === "pending" ? "text-yellow-500" : value === "inprogress" ? "text-blue-600" : value === "done" ? "text-green-600" : "text-gray-700"}`}>
                    {value}
                </span>
            ) : (
                <span>{value}</span>
            )}
        </div>
    );
};

export default DonationRequestDetails;
