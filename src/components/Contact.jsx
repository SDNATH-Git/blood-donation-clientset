import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you, ${formData.name}! We received your message.`);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="bg-gradient-to-t from-gray-100 via-red-200 to-white pb-6">
            <section className="my-16 px-5 md:px-5 lg:px-10">
                <h2 className="text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-black via-red-600 to-black">
                    📩 Contact Us
                </h2>
                <p className="text-center text-red-400 mb-10">
                    We’re here to answer your questions and help save lives.
                </p>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Contact Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex-1 bg-gradient-to-br from-white via-red-50 to-red-100 p-[2px] rounded-xl shadow-md"
                    >
                        <div className="bg-white rounded-xl p-8">
                            <label className="block mb-4">
                                <span className="text-gray-700 font-semibold">Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring focus:ring-red-200 outline-none"
                                    placeholder="Your full name"
                                />
                            </label>

                            <label className="block mb-4">
                                <span className="text-gray-700 font-semibold">Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring focus:ring-red-200 outline-none"
                                    placeholder="you@example.com"
                                />
                            </label>

                            <label className="block mb-6">
                                <span className="text-gray-700 font-semibold">Message</span>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring focus:ring-red-200 outline-none"
                                    placeholder="Write your message here"
                                />
                            </label>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-red-600 to-black text-white font-semibold px-6 py-3 rounded-md hover:opacity-90 transition"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>

                    {/* Contact Info */}
                    <div className="flex-1 bg-gradient-to-br from-red-100 via-white to-red-50 p-8 rounded-xl shadow-md flex flex-col justify-center items-center text-center">
                        <h3 className="text-2xl font-semibold mb-4 text-red-700">Get in Touch</h3>
                        <p className="text-gray-700 mb-3 flex items-center gap-2">
                            <FaPhoneAlt className="text-red-600" />
                            <a href="tel:+880123456789" className="text-red-600 hover:underline">+880 1234 567 89</a>
                        </p>
                        <p className="text-gray-700 flex items-center gap-2">
                            <FaEnvelope className="text-red-600" />
                            <a href="mailto:info@blooddonation.com" className="text-red-600 hover:underline">info@blooddonation.com</a>
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Contact;
