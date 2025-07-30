import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import bloodAnimation from "../assets/BloodDonation.json";

const Banner = () => {
    return (
        <div className="relative overflow-hidden   mx-auto p-10 bg-gradient-to-b from-red-100 via-red-200 to-white flex flex-col lg:flex-row items-center gap-10">

            {/* Background animated circles */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-300 rounded-full opacity-30 animate-pulse mix-blend-multiply"></div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-400 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>

            {/* Left: Text and Buttons */}
            <motion.div
                className="flex-1 text-center lg:text-left relative z-10"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >

                <h1 className="text-3xl md:text-5xl font-extrabold text-red-700 mb-6 leading-tight drop-shadow-md">
                    Save Lives by <span className="text-black">Donating Blood</span>
                </h1>
                <p className="text-lg text-gray-900 mb-10 leading-relaxed drop-shadow-sm">
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
                className="flex-1 w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-4 relative z-10"
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
