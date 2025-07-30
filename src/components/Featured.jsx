import { FaTint } from "react-icons/fa";

const featuredDonors = [
    { id: 1, name: "Rahim Uddin", location: "Dhaka", bloodGroup: "A+", donations: 15 },
    { id: 2, name: "Karim Ali", location: "Chattogram", bloodGroup: "B+", donations: 12 },
    { id: 3, name: "Fatema Khatun", location: "Rajshahi", bloodGroup: "O-", donations: 18 },
];

const highDemandGroups = [
    { group: "O+", demand: 45 },
    { group: "B+", demand: 30 },
    { group: "A-", demand: 25 },
];

const Featured = () => {
    return (
        <section className="my-16 px-6 lg:px-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-black via-red-600 to-black">
                Featured: High Demand Blood Groups & Top Donors
            </h2>

            {/* High Demand Blood Groups */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
                {highDemandGroups.map(({ group, demand }) => (
                    <div
                        key={group}
                        className="p-6 rounded-lg bg-gradient-to-br from-white via-red-50 to-red-100 shadow border border-red-200 hover:border-red-600 transition-all duration-300"
                    >
                        <h3 className="text-4xl font-extrabold text-red-700 mb-1">{group}</h3>
                        <p className="text-gray-700 mb-2">Demand: <span className="font-semibold">{demand}%</span></p>
                        <div className="w-full bg-red-200 h-3 rounded-full overflow-hidden">
                            <div
                                className="bg-red-600 h-3 rounded-full"
                                style={{ width: `${demand}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Top Donors */}
            <h3 className="text-2xl font-semibold mb-6 text-center text-red-700">
                🩸 Top Donors
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {featuredDonors.map(({ id, name, location, bloodGroup, donations }) => (
                    <div
                        key={id}
                        className="bg-white p-6 rounded-lg border border-red-200 shadow hover:shadow-lg transition-all duration-300 hover:border-2 hover:border-red-600"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <FaTint className="text-red-600" />
                            <h4 className="text-xl font-bold text-gray-900">{name}</h4>
                        </div>
                        <p className="text-gray-700">Location: {location}</p>
                        <p className="text-red-700 font-semibold">Blood Group: {bloodGroup}</p>
                        <p className="text-gray-600 mb-3">Donations: {donations}</p>
                        <button className="w-full bg-gradient-to-r from-red-600 to-black text-white py-2 rounded hover:opacity-90 transition">
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Featured;
