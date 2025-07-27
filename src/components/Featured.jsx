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
            <h2 className="text-3xl font-bold mb-10 text-red-700 text-center">
                Featured: High Demand Blood Groups & Top Donors
            </h2>

            {/* High Demand Blood Groups */}
            <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {highDemandGroups.map(({ group, demand }) => (
                    <div
                        key={group}
                        className="bg-red-100 p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                    >
                        <h3 className="text-4xl font-extrabold text-red-700 mb-2">{group}</h3>
                        <p className="text-gray-700">Demand: <span className="font-semibold">{demand}%</span></p>
                        <div className="w-full bg-red-300 rounded-full h-3 mt-3 overflow-hidden">
                            <div
                                className="bg-red-600 h-3 rounded-full"
                                style={{ width: `${demand}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Top Donors */}
            <div>
                <h3 className="text-2xl font-semibold mb-6 text-red-700">Top Donors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {featuredDonors.map(({ id, name, location, bloodGroup, donations }) => (
                        <div
                            key={id}
                            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                        >
                            <h4 className="text-xl font-bold text-gray-900 mb-1">{name}</h4>
                            <p className="text-gray-600 mb-1">Location: {location}</p>
                            <p className="text-red-700 font-semibold mb-2">Blood Group: {bloodGroup}</p>
                            <p className="text-gray-700">Donations made: {donations}</p>
                            <button className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition">
                                View Profile
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Featured;
