import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { BiSolidDonateBlood } from "react-icons/bi";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- Fix default marker icon paths for Vite ---
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// --- Mock donor data ---
const MOCK_DONORS = [
    { id: 1, name: "Nusrat Jahan", blood: "A+", district: "Dhaka", coords: [23.8103, 90.4125], lastDonation: "2024-11-02" },
    { id: 2, name: "Rakib Hasan", blood: "O+", district: "Chattogram", coords: [22.3569, 91.7832], lastDonation: "2025-01-05" },
    { id: 3, name: "Sadia Akter", blood: "B-", district: "Sylhet", coords: [24.8949, 91.8687], lastDonation: "2025-02-01" },
    { id: 4, name: "Arif Rahman", blood: "AB+", district: "Rajshahi", coords: [24.3740, 88.6011], lastDonation: "2024-12-18" },
    { id: 5, name: "Mehedi Hasan", blood: "O-", district: "Khulna", coords: [22.8456, 89.5403], lastDonation: "2025-01-22" },
    { id: 6, name: "Tanzila Khan", blood: "A-", district: "Barishal", coords: [22.7010, 90.3535], lastDonation: "2024-10-14" },
    { id: 7, name: "Shamsul Arefin", blood: "B+", district: "Rangpur", coords: [25.7439, 89.2752], lastDonation: "2024-09-21" },
    { id: 8, name: "Faria Nabila", blood: "AB-", district: "Mymensingh", coords: [24.7471, 90.4203], lastDonation: "2025-02-05" },
];

const DISTRICTS = Array.from(new Set(MOCK_DONORS.map(d => d.district))).sort();
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const DEFAULT_CENTER = [23.685, 90.3563];
const DEFAULT_ZOOM = 6.5;

function FlyTo({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) map.flyTo(center, zoom || map.getZoom(), { duration: 0.8 });
    }, [center, zoom, map]);
    return null;
}

function LocateButton({ onLocated }) {
    const map = useMap();
    return (
        <button
            onClick={() => {
                map.locate({ setView: true, maxZoom: 13 });
                map.once("locationfound", (e) => onLocated && onLocated([e.latlng.lat, e.latlng.lng]));
            }}
            className="absolute z-[1000] top-4 right-4 rounded-xl px-3 py-2 bg-red-600 text-white shadow-lg hover:bg-red-700"
        >
            Locate me
        </button>
    );
}

export default function DonorMap({ donors = MOCK_DONORS }) {
    const [district, setDistrict] = useState("");
    const [blood, setBlood] = useState("");
    const [query, setQuery] = useState("");
    const [userPos, setUserPos] = useState(null);

    const filtered = useMemo(() => {
        return donors.filter(d => {
            const districtOk = district ? d.district === district : true;
            const bloodOk = blood ? d.blood === blood : true;
            const queryOk = query
                ? d.name.toLowerCase().includes(query.toLowerCase()) ||
                d.district.toLowerCase().includes(query.toLowerCase())
                : true;
            return districtOk && bloodOk && queryOk;
        });
    }, [donors, district, blood, query]);

    const mapRef = useRef(null);

    return (
        <div className="w-full">

            {/* Wrapper with top padding to prevent navbar overlap */}
            <div className="py-10  px-5 md:px-10 lg:px-10"> {/* Adjust pt-[80px] to your navbar height */}

                {/* Header / Filters */}
                <div className="text-center">
                    <div className="flex justify-center items-center gap-2 text-2xl md:text-4xl font-bold text-red-600 ">
                        <h2 className="">
                            Donor Map
                        </h2>
                        <BiSolidDonateBlood className="text-red-600 size-10 " />
                    </div>
                    <p className="text-sm text-gray-700">
                        Live donors across districts. Zoom & filter to find the nearest match.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-end md:justify-center gap-4 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 w-full md:w-auto">
                        <input
                            className="px-3 py-2 rounded-lg border border-red-500 bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                            placeholder="Search by name or district"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <select
                            className="px-3 py-2 rounded-lg border border-red-500 bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                        >
                            <option value="">All Districts</option>
                            {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <select
                            className="px-3 py-2 rounded-lg border border-red-500 bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                            value={blood}
                            onChange={(e) => setBlood(e.target.value)}
                        >
                            <option value="">All Groups</option>
                            {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                        </select>
                        <button
                            onClick={() => { setDistrict(""); setBlood(""); setQuery(""); }}
                            className="rounded-lg px-3 py-2 bg-black text-white hover:opacity-90"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Map */}
                <div className="relative  h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-red-500 mx-auto">
                    <MapContainer
                        whenCreated={(map) => (mapRef.current = map)}
                        center={DEFAULT_CENTER}
                        zoom={DEFAULT_ZOOM}
                        scrollWheelZoom
                        className="h-full w-full relative z-0"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {filtered[0] && <FlyTo center={filtered[0].coords} zoom={9} />}

                        <LocateButton onLocated={(pos) => setUserPos(pos)} />

                        {userPos && (
                            <Marker position={userPos}>
                                <Popup>You are here</Popup>
                            </Marker>
                        )}

                        {filtered.map(d => (
                            <Marker key={d.id} position={d.coords}>
                                <Popup>
                                    <div className="text-sm">
                                        <p className="font-bold text-black">{d.name}</p>
                                        <p className="text-red-600">Blood: {d.blood}</p>
                                        <p className="text-gray-800">District: {d.district}</p>
                                        <p className="text-gray-700">Last donated: {d.lastDonation}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}


