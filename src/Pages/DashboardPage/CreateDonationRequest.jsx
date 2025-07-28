import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";

const CreateDonationRequest = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrictId, setSelectedDistrictId] = useState("");

    const [formData, setFormData] = useState({
        recipientName: "",
        recipientDistrict: "",
        recipientUpazila: "",
        hospitalName: "",
        fullAddress: "",
        bloodGroup: "",
        donationDate: "",
        donationTime: "",
        requestMessage: "",
    });

    // ✅ Fetch JSON from public folder with PHPMyAdmin format
    useEffect(() => {
        fetch("/districts.json")
            .then((res) => res.json())
            .then((json) => {
                const tableObj = json.find(
                    (item) => item.type === "table" && item.name === "districts"
                );
                if (tableObj?.data) setDistricts(tableObj.data);
            });

        fetch("/upazilas.json")
            .then((res) => res.json())
            .then((json) => {
                const tableObj = json.find(
                    (item) => item.type === "table" && item.name === "upazilas"
                );
                if (tableObj?.data) setUpazilas(tableObj.data);
            });
    }, []);

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        const selectedDistrict = districts.find((d) => d.id === districtId);
        setSelectedDistrictId(districtId);
        setFormData((prev) => ({
            ...prev,
            recipientDistrict: selectedDistrict?.name || "",
            recipientUpazila: "", // reset upazila
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || user.status !== "active") {
            alert("Only active users can create a donation request.");
            return;
        }

        const newRequest = {
            ...formData,
            requesterName: user.displayName || user.name || "Unknown",
            requesterEmail: user.email,
            status: "pending",
            createdAt: new Date(),
        };

        try {
            await axios.post("http://localhost:5000/requests", newRequest);
            alert("Donation request created successfully!");
            navigate("/dashboard/my-donation-requests");
        } catch (err) {
            console.error("Error submitting:", err);
            alert("Something went wrong.");
        }
    };

    // ✅ Filter upazilas by selected district_id
    const filteredUpazilas = upazilas.filter(
        (u) => u.district_id === selectedDistrictId
    );

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg border rounded-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-6">
                🆕 Create Donation Request
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Requester Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">Requester Name</label>
                        <input
                            value={user?.displayName || user?.name || ""}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Requester Email</label>
                        <input
                            value={user?.email || ""}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100"
                        />
                    </div>
                </div>

                {/* Recipient Name */}
                <div>
                    <label className="block font-medium">Recipient Name</label>
                    <input
                        name="recipientName"
                        value={formData.recipientName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* District & Upazila */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">District</label>
                        <select
                            value={selectedDistrictId}
                            onChange={handleDistrictChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Select District</option>
                            {districts.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Upazila</label>
                        <select
                            name="recipientUpazila"
                            value={formData.recipientUpazila}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Select Upazila</option>
                            {filteredUpazilas.map((u) => (
                                <option key={u.id} value={u.name}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Hospital Name */}
                <div>
                    <label className="block font-medium">Hospital Name</label>
                    <input
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Full Address */}
                <div>
                    <label className="block font-medium">Full Address</label>
                    <input
                        name="fullAddress"
                        value={formData.fullAddress}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Blood Group */}
                <div>
                    <label className="block font-medium">Blood Group</label>
                    <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select</option>
                        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                            <option key={bg} value={bg}>
                                {bg}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">Donation Date</label>
                        <input
                            type="date"
                            name="donationDate"
                            value={formData.donationDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Donation Time</label>
                        <input
                            type="time"
                            name="donationTime"
                            value={formData.donationTime}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>

                {/* Message */}
                <div>
                    <label className="block font-medium">Request Message</label>
                    <textarea
                        name="requestMessage"
                        value={formData.requestMessage}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-2 border rounded"
                        required
                    ></textarea>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded"
                >
                    Request
                </button>
            </form>
        </div>
    );
};

export default CreateDonationRequest;
