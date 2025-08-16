import React from "react";
import { motion } from "framer-motion";

const events = [
    {
        id: 1,
        name: "City Blood Donation Camp",
        date: "2025-09-25",
        location: "City Hall, Dhaka",
        googleCalendarLink: "https://calendar.google.com/event?action=TEMPLATE&text=City+Blood+Donation+Camp&dates=20250925T090000Z/20250925T150000Z&location=City+Hall,+Dhaka"
    },
    {
        id: 2,
        name: "University Blood Drive",
        date: "2025-09-28",
        location: "ABC University Grounds",
        googleCalendarLink: "https://calendar.google.com/event?action=TEMPLATE&text=University+Blood+Drive&dates=20250928T100000Z/20250928T160000Z&location=ABC+University"
    },
    {
        id: 3,
        name: "Community Blood Camp",
        date: "2025-10-02",
        location: "Community Center, Mirpur",
        googleCalendarLink: "https://calendar.google.com/event?action=TEMPLATE&text=Community+Blood+Camp&dates=20251002T090000Z/20251002T140000Z&location=Community+Center,+Mirpur"
    },
];

const NearbyEvents = () => {
    return (
        <div className="px-5 md:px-5 lg:px-10 my-18">
            <motion.h2
                className="text-2xl md:text-4xl font-extrabold text-red-600 mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Nearby Donation Camps / Events 🎪
            </motion.h2>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {events.map((event) => (
                    <motion.div
                        key={event.id}
                        className="bg-white border-2 border-red-600 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div>
                            <h3 className="text-xl font-bold text-black mb-2">{event.name}</h3>
                            <p className="text-red-500 font-semibold">{event.date}</p>
                            <p className="text-gray-800">{event.location}</p>
                        </div>
                        <a
                            href={event.googleCalendarLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-center hover:bg-red-700 transition-colors"
                        >
                            Add to My Calendar
                        </a>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default NearbyEvents;
