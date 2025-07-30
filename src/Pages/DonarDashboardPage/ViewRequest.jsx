import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ViewRequest = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://blood-donation-serverset.vercel.app/requests/${id}`)
            .then(res => {
                setRequest(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="text-center mt-10 text-lg font-semibold">Loading...</p>;
    if (!request) return <p className="text-center mt-10 text-red-600 font-semibold">Request not found</p>;

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-extrabold mb-6 text-red-600 text-center">Donation Request Details</h2>
            <div className="space-y-4 text-gray-700">
                <div>
                    <h3 className="text-lg font-semibold">Recipient Name:</h3>
                    <p className="text-gray-900">{request.recipientName}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Location:</h3>
                    <p className="text-gray-900">{request.recipientDistrict}, {request.recipientUpazila}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Donation Date:</h3>
                    <p className="text-gray-900">{request.donationDate}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Donation Time:</h3>
                    <p className="text-gray-900">{request.donationTime}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Blood Group:</h3>
                    <p className="inline-block px-3 py-1 rounded text-white bg-red-600 font-bold">{request.bloodGroup}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Status:</h3>
                    <p className={`inline-block px-3 py-1 rounded font-semibold ${request.status === "pending" ? "bg-yellow-300 text-yellow-800" :
                        request.status === "inprogress" ? "bg-blue-300 text-blue-800" :
                            request.status === "done" ? "bg-green-300 text-green-800" :
                                request.status === "canceled" ? "bg-red-300 text-red-800" :
                                    "bg-gray-300 text-gray-800"
                        }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </p>
                </div>


            </div>
        </div>
    );
};

export default ViewRequest;
