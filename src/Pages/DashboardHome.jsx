import { useContext } from "react";
import Lottie from "lottie-react";
import welcomeAnimation from "../assets/Welcome Animation.json";
import { AuthContext } from "../Provider/AuthProvider";

const DashboardHome = () => {
    const { user } = useContext(AuthContext);

    const getDashboardTitle = (role) => {
        switch (role) {
            case "admin":
                return "Admin Dashboard";
            case "volunteer":
                return "Volunteer Dashboard";
            case "donor":
            default:
                return "Donor Dashboard";
        }
    };

    return (
        <div className=" bg-gray-50 mb-4">
            <div className="max-w-5xl mx-auto bg-white rounded-xl p-4 sm:p-6 md:p-8 border border-red-100 shadow-md">
                {/* Top Section: Title & Animation */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 ">
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">
                            🛡️ {getDashboardTitle(user?.role)}
                        </h1>
                        <p className="text-gray-700 text-base sm:text-lg">
                            Welcome,{" "}
                            <span className="font-semibold text-blue-700">
                                {user?.displayName || user?.name || "User"}
                            </span>
                            ! 👋
                        </p>
                    </div>
                    <div className="w-48 sm:w-56 md:w-60 h-48 sm:h-56 md:h-60">
                        <Lottie animationData={welcomeAnimation} loop={true} />
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-5 text-center shadow hover:shadow-md transition">
                        <h3 className="text-lg sm:text-xl font-semibold text-red-700 mb-1">
                            Your Email
                        </h3>
                        <p className="text-gray-800 text-sm sm:text-base">{user?.email}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-5 text-center shadow hover:shadow-md transition">
                        <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-1">
                            Account Status
                        </h3>
                        <p className="text-green-800 font-medium text-sm sm:text-base">
                            Active
                        </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 text-center shadow hover:shadow-md transition">
                        <h3 className="text-lg sm:text-xl font-semibold text-blue-700 mb-1">
                            Your Role
                        </h3>
                        <p className="capitalize text-blue-900 font-medium text-sm sm:text-base">
                            {user?.role}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
