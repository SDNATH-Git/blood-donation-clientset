import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import bloodAnimation from "../assets/BloodDonation.json";

const Banner = () => {
    return (
        // <div className="bg-gradient-to-r from-red-100 via-red-200 to-red-50 flex flex-col-reverse lg:flex-row items-center justify-between p-6 lg:p-16 gap-10">
        <div className="bg-gradient-to-b from-red-100 via-red-200 to-white flex flex-col-reverse lg:flex-row items-center justify-between p-6 lg:p-16 gap-10">

            {/* Left: Text and Buttons */}
            <motion.div
                className="flex-1 text-center lg:text-left"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-6 leading-tight">
                    Save Lives by <span className="text-black">Donating Blood</span>
                </h1>
                <p className="text-lg text-gray-800 mb-8">
                    Join our mission to help those in need. Become a donor or find a donor today.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start">
                    <Link to="/register">
                        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition">
                            Join as a Donor
                        </button>
                    </Link>
                    <Link to="/search">
                        <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition">
                            Search Donors
                        </button>
                    </Link>
                </div>
            </motion.div>

            {/* Right: Lottie Animation */}
            <motion.div
                className="flex-1 w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-4"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Lottie animationData={bloodAnimation} loop={true} />
            </motion.div>
        </div>
    );
};

export default Banner;
