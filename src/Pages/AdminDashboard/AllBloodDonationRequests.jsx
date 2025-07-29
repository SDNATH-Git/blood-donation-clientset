// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const AllBloodDonationRequests = () => {
//     const [token, setToken] = useState("");

//     useEffect(() => {
//         const savedToken = localStorage.getItem("access-token");
//         if (!savedToken) {
//             toast.error("Access token not found. Please login again.");
//         } else {
//             setToken(savedToken);
//         }
//     }, []);

//     const { data: requests = [], refetch, isLoading } = useQuery({
//         queryKey: ["allRequests", token],
//         queryFn: async () => {
//             if (!token) return [];
//             const axiosSecure = axios.create({
//                 baseURL: "http://localhost:5000",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             const res = await axiosSecure.get("/all-requests");
//             return res.data;
//         },
//         enabled: !!token,
//     });

//     if (isLoading) {
//         return <div className="text-center py-10">Loading Requests...</div>;
//     }

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-6 text-red-600">All Blood Donation Requests</h2>

//             {requests.length === 0 ? (
//                 <p className="text-center text-gray-500">No donation requests found.</p>
//             ) : (
//                 <table className="min-w-full bg-white rounded shadow">
//                     <thead className="bg-red-100 text-red-700">
//                         <tr>
//                             <th className="p-3 text-left">Requester Email</th>
//                             <th className="p-3 text-left">Blood Group</th>
//                             <th className="p-3 text-left">District</th>
//                             <th className="p-3 text-left">Upazila</th>
//                             <th className="p-3 text-left">Status</th>
//                             <th className="p-3 text-left">Requested At</th>
//                             {/* এখানে চাইলে Action বাটন দিতে পারো */}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {requests.map((req) => (
//                             <tr key={req._id} className="border-t hover:bg-red-50">
//                                 <td className="p-3">{req.requesterEmail || "N/A"}</td>
//                                 <td className="p-3">{req.bloodGroup}</td>
//                                 <td className="p-3">{req.recipientDistrict}</td>
//                                 <td className="p-3">{req.recipientUpazila}</td>
//                                 <td className={`p-3 font-semibold ${req.status === "pending" ? "text-yellow-600" : req.status === "approved" ? "text-green-600" : "text-red-600"}`}>
//                                     {req.status}
//                                 </td>
//                                 <td className="p-3">{new Date(req.createdAt).toLocaleString()}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default AllBloodDonationRequests;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AllBloodDonationRequests = () => {
    const [token, setToken] = useState("");

    useEffect(() => {
        const savedToken = localStorage.getItem("access-token");
        if (!savedToken) {
            toast.error("Access token not found. Please login again.");
        } else {
            setToken(savedToken);
        }
    }, []);

    const { data: requests = [], refetch, isLoading, error } = useQuery({
        queryKey: ["allRequests", token],
        queryFn: async () => {
            if (!token) return [];
            const axiosSecure = axios.create({
                baseURL: "http://localhost:5000",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = await axiosSecure.get("/all-requests");
            return res.data;
        },
        enabled: !!token,
    });

    // ডেটা লোডিং, এরর হ্যান্ডেলিং
    if (isLoading) {
        return <div className="text-center py-10">Loading Requests...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">Failed to load requests.</div>;
    }

    // ডেটা কনসোল লগ করে চেক করো যদি কিছু ভুল থাকে
    // console.log("Requests data:", requests);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-red-600">All Blood Donation Requests</h2>

            {requests.length === 0 ? (
                <p className="text-center text-gray-500">No donation requests found.</p>
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
                                <td className="p-3">{req.bloodGroup || "N/A"}</td>
                                <td className="p-3">{req.recipientDistrict || "N/A"}</td>
                                <td className="p-3">{req.recipientUpazila || "N/A"}</td>
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

export default AllBloodDonationRequests;



