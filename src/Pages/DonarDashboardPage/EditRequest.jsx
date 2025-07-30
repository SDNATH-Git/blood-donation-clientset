import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditRequest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { _id, ...updateData } = request;  // _id বাদ দিয়ে পাঠানো হচ্ছে
            await axios.patch(`https://blood-donation-serverset.vercel.app/requests/${id}`, updateData);
            alert("Request updated successfully");
            navigate("/dashboard/my-donation-requests");
        } catch (err) {
            alert("Update failed");
            console.error(err);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!request) return <p className="text-center mt-10 text-red-600">Request not found</p>;

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-red-600">Edit Donation Request</h2>

            <label className="block mb-1 font-semibold">Recipient Name:</label>
            <input
                type="text"
                value={request.recipientName || ""}
                onChange={(e) => setRequest({ ...request, recipientName: e.target.value })}
                className="border p-2 mb-4 w-full rounded"
                required
            />

            <label className="block mb-1 font-semibold">Recipient District:</label>
            <input
                type="text"
                value={request.recipientDistrict || ""}
                onChange={(e) => setRequest({ ...request, recipientDistrict: e.target.value })}
                className="border p-2 mb-4 w-full rounded"
                required
            />

            <label className="block mb-1 font-semibold">Recipient Upazila:</label>
            <input
                type="text"
                value={request.recipientUpazila || ""}
                onChange={(e) => setRequest({ ...request, recipientUpazila: e.target.value })}
                className="border p-2 mb-4 w-full rounded"
                required
            />

            <label className="block mb-1 font-semibold">Donation Date:</label>
            <input
                type="date"
                value={request.donationDate || ""}
                onChange={(e) => setRequest({ ...request, donationDate: e.target.value })}
                className="border p-2 mb-4 w-full rounded"
                required
            />

            <label className="block mb-1 font-semibold">Donation Time:</label>
            <input
                type="time"
                value={request.donationTime || ""}
                onChange={(e) => setRequest({ ...request, donationTime: e.target.value })}
                className="border p-2 mb-4 w-full rounded"
                required
            />

            <label className="block mb-1 font-semibold">Blood Group:</label>
            <select
                value={request.bloodGroup || ""}
                onChange={(e) => setRequest({ ...request, bloodGroup: e.target.value })}
                className="border p-2 mb-6 w-full rounded"
                required
            >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
            </select>

            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition">
                Save Changes
            </button>
        </form>
    );
};

export default EditRequest;
