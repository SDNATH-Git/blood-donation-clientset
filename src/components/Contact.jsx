import React, { useState } from "react";

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
        // এখানে তুমি API কল বা ফর্ম সাবমিশন হ্যান্ডেল করতে পারো
        alert(`Thank you, ${formData.name}! We received your message.`);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section className="max-w-4xl mx-auto my-16 px-6 lg:px-0">
            <h2 className="text-3xl font-bold mb-4 text-center text-red-700 flex items-center justify-center gap-2">
                <span>📩</span> Contact Us
            </h2>
            <p className="text-center text-gray-600 mb-8">
                We’re here to answer your questions and help save lives.
            </p>

            <div className="flex flex-col lg:flex-row gap-10">

                {/* Contact Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 bg-red-50 p-8 rounded-lg shadow-md"
                >
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

                    <label className="block mb-4">
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
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md transition"
                    >
                        Send Message
                    </button>
                </form>

                {/* Contact Info */}
                <div className="flex-1 bg-red-100 p-8 rounded-lg shadow-md flex flex-col justify-center items-center text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-red-700">Get in Touch</h3>
                    <p className="text-gray-700 mb-2">Phone: <a href="tel:+880123456789" className="text-red-600 hover:underline">+880 1234 567 89</a></p>
                    <p className="text-gray-700">Email: <a href="mailto:info@blooddonation.com" className="text-red-600 hover:underline">info@blooddonation.com</a></p>
                </div>

            </div>
        </section>
    );
};

export default Contact;
