import React, { useContext, useState } from "react";
import login from "../../assets/login.json";
import Lottie from "lottie-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
    const { signIn, setUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const inputStyle =
        "w-full px-5 py-3 border border-red-500 text-black bg-white " +
        "placeholder-red-400 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-red-500";

    const saveToken = async (userEmail) => {
        // Step 1: get user role
        const roleRes = await fetch(`http://localhost:5000/users/role/${userEmail}`);
        const roleData = await roleRes.json();
        const userRole = roleData?.role;

        if (!userRole) {
            throw new Error("User role not found");
        }

        // Step 2: get JWT using email and role
        const res = await fetch("http://localhost:5000/jwt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, role: userRole }),
        });

        const data = await res.json();
        if (data.token) {
            localStorage.setItem("access-token", data.token);
        } else {
            throw new Error("Token not received");
        }
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const emailInput = form.email.value;
        const password = form.password.value;

        try {
            const result = await signIn(emailInput, password);
            const user = result.user;
            setUser(user);

            // IMPORTANT: Detect role dynamically if you want; here I assume donor for example
            // You may call your API to get user role or store role in user object after login
            // For demonstration, defaulting to "donor"
            await saveToken(user.email, "donor");

            toast.success("Login successful!");
            form.reset();
            setEmail("");
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-white via-red-100 to-red-400">
            <div className="bg-white text-red-600 p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-5xl">
                <h2 className="text-3xl font-bold text-center mb-10">Sign in to your account</h2>
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="w-full md:w-1/2">
                        <Lottie animationData={login} loop={true} />
                    </div>

                    <form onSubmit={handleLogin} className="w-full md:w-1/2 space-y-6">
                        <div>
                            <label className="block text-lg mb-2 text-red-600">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inputStyle}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-lg mb-2 text-red-600">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className={`${inputStyle} pr-12`}
                                    required
                                />
                                <div
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-red-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <h1 className="text-sm text-red-500 hover:underline cursor-pointer">
                                Forgot your password?
                            </h1>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-4 rounded-md text-lg font-medium text-white ${loading ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 transition-colors"
                                }`}
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-sm text-gray-700">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-red-600 font-semibold hover:underline">
                        Register Now!
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

