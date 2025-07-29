import { useEffect, useState } from "react";
import axios from "axios";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Search = () => {
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [formData, setFormData] = useState({
        bloodGroup: "",
        districtId: "",
        upazilaId: "",
    });
    const [donors, setDonors] = useState([]);

    useEffect(() => {
        const fetchGeoData = async () => {
            try {
                const districtRes = await fetch("/districts.json");
                const upazilaRes = await fetch("/upazilas.json");

                const districtData = await districtRes.json();
                const upazilaData = await upazilaRes.json();

                const districtList = districtData.find((d) => d.name === "districts")?.data || [];
                const upazilaList = upazilaData.find((d) => d.name === "upazilas")?.data || [];

                setDistricts(districtList);
                setUpazilas(upazilaList);
            } catch (error) {
                console.error("Failed to load district/upazila data", error);
            }
        };
        fetchGeoData();
    }, []);

    useEffect(() => {
        if (formData.districtId) {
            const matchedUpazilas = upazilas.filter(
                (u) => String(u.district_id) === String(formData.districtId)
            );
            setFilteredUpazilas(matchedUpazilas);
        } else {
            setFilteredUpazilas([]);
        }
    }, [formData.districtId, upazilas]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const { bloodGroup, districtId, upazilaId } = formData;
        try {
            const res = await axios.get("http://localhost:5000/users", {
                params: { bloodGroup, districtId, upazilaId },
            });
            setDonors(res.data);
        } catch (error) {
            console.error("Failed to fetch donors", error);
        }
    };

    return (
        <div className="bg-gradient-to-r from-red-50 via-white to-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-8 ">
                <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-10 text-red-600 drop-shadow-sm">
                    Search Blood Donors
                </h2>

                {/* Form */}
                <form
                    onSubmit={handleSearch}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded-lg shadow-lg"
                >
                    <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map((group) => (
                            <option key={group} value={group}>
                                {group}
                            </option>
                        ))}
                    </select>

                    <select
                        name="districtId"
                        value={formData.districtId}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    >
                        <option value="">Select District</option>
                        {districts.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>

                    <select
                        name="upazilaId"
                        value={formData.upazilaId}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    >
                        <option value="">Select Upazila</option>
                        {filteredUpazilas.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.name}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="bg-red-600 text-white py-2 rounded hover:bg-red-700"
                    >
                        Search
                    </button>
                </form>

                {/* Donor Results */}
                {donors.length > 0 && (
                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold mb-4">Donor List</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {donors.map((donor) => (
                                <div
                                    key={donor._id}
                                    className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all border border-red-100"
                                >
                                    <div className="flex items-center gap-4 mb-3">
                                        <img
                                            src={donor.avatar}
                                            alt={donor.name}
                                            className="w-16 h-16 rounded-full border-2 border-red-500 object-cover"
                                        />
                                        <div>
                                            <h3 className="text-xl font-semibold text-red-600">{donor.name}</h3>
                                            <p className="text-gray-600 text-sm">{donor.email}</p>
                                        </div>
                                    </div>
                                    <ul className="text-gray-700 space-y-1 text-sm">
                                        <li><strong>Blood Group:</strong> {donor.bloodGroup || donor.blood}</li>
                                        <li><strong>District:</strong> {donor.district}</li>
                                        <li><strong>Upazila:</strong> {donor.upazila}</li>
                                        <li><strong>Phone:</strong> {donor.phone || "N/A"}</li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default Search;
