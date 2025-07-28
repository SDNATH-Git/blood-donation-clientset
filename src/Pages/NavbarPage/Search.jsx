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
        upazilaId: ""
    });
    const [donors, setDonors] = useState([]);

    // ✅ Load Districts & Upazilas JSON from public folder
    useEffect(() => {
        const fetchDistrictsAndUpazilas = async () => {
            try {
                const [districtRes, upazilaRes] = await Promise.all([
                    fetch("/districts.json"),
                    fetch("/upazilas.json"),
                ]);

                const districtData = await districtRes.json();
                const upazilaData = await upazilaRes.json();

                setDistricts(districtData);  // expects full array of districts
                setUpazilas(upazilaData);    // expects full array of upazilas
            } catch (error) {
                console.error("❌ Failed to load district/upazila data", error);
            }
        };
        fetchDistrictsAndUpazilas();
    }, []);

    // ✅ Filter upazilas based on selected districtId
    useEffect(() => {
        if (formData.districtId) {
            setFilteredUpazilas(
                upazilas.filter(
                    (u) => u.district_id === parseInt(formData.districtId)
                )
            );
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
            const district = districts.find(d => d.id === parseInt(districtId))?.name;
            const upazila = upazilas.find(u => u.id === parseInt(upazilaId))?.name;

            const res = await axios.get("http://localhost:5000/users", {
                params: { bloodGroup, district, upazila }
            });

            setDonors(res.data);
        } catch (error) {
            console.error("❌ Failed to fetch donors", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-4">Search for Blood Donors</h1>
            <form
                onSubmit={handleSearch}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 shadow rounded"
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
                    {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                            {district.name}
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
                    {filteredUpazilas.map((upazila) => (
                        <option key={upazila.id} value={upazila.id}>
                            {upazila.name}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="col-span-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                    Search
                </button>
            </form>

            {donors.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Donor List</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {donors.map((donor) => (
                            <div
                                key={donor._id}
                                className="border p-4 rounded shadow bg-gray-50"
                            >
                                <h3 className="text-lg font-bold text-red-600">{donor.name}</h3>
                                <p>Blood Group: {donor.bloodGroup}</p>
                                <p>District: {donor.district}</p>
                                <p>Upazila: {donor.upazila}</p>
                                <p>Phone: {donor.phone || "N/A"}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
