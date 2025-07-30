import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Register = () => {
    const { createUser, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    const IMG_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

    // ✅ Load District & Upazila JSON
    useEffect(() => {
        fetch("/districts.json")
            .then((res) => res.json())
            .then((data) => {
                const districtData = data.find((d) => d.type === "table" && d.name === "districts");
                setDistricts(districtData?.data || []);
            });

        fetch("/upazilas.json")
            .then((res) => res.json())
            .then((data) => {
                const upazilaData = data.find((u) => u.type === "table" && u.name === "upazilas");
                setUpazilas(upazilaData?.data || []);
            });
    }, []);

    const validatePassword = (password) => {
        const upper = /[A-Z]/.test(password);
        const lower = /[a-z]/.test(password);
        const length = password.length >= 6;
        if (!upper || !lower || !length) {
            toast.error("Password must include uppercase, lowercase and at least 6 characters.");
            return false;
        }
        return true;
    };

    // ✅ Token fetch and store
    const saveToken = async (userEmail) => {
        const res = await fetch("https://blood-donation-serverset.vercel.app/jwt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, role: "donor" }), // ✅ role পাঠাও
        });

        const data = await res.json();
        if (data.token) {
            localStorage.setItem("access-token", data.token);
        } else {
            throw new Error("Token not received");
        }
    };






    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirmPassword.value;
        const image = form.avatar.files[0];
        const blood = form.blood.value;
        const district = form.district.value;
        const upazila = form.upazila.value;

        if (password !== confirm) return toast.error("Passwords do not match");
        if (!validatePassword(password)) return;

        const formData = new FormData();
        formData.append("image", image);

        try {
            const imgUpload = await axios.post(
                `https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`,
                formData
            );

            if (imgUpload.data.success) {
                const avatar = imgUpload.data.data.url;

                const result = await createUser(email, password, name, avatar);
                const user = result.user;
                setUser(user);

                // Save to MongoDB
                await axios.post("https://blood-donation-serverset.vercel.app/users", {
                    name,
                    email,
                    avatar,
                    blood,
                    district,
                    upazila,
                    role: "donor",
                    status: "active",
                });

                // Get JWT
                await saveToken(email);

                toast.success("Registration successful!");
                form.reset();
                navigate(from, { replace: true });
            } else {
                toast.error("Image upload failed.");
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    const input =
        "w-full px-4 py-3 rounded border border-red-400 bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-red-100 to-red-400 p-6">
            <div className="bg-white w-full max-w-3xl rounded-xl p-8 shadow-2xl text-black">
                <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Create a Donor Account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input className={input} type="text" name="name" placeholder="Full Name" required />
                    <input className={input} type="email" name="email" placeholder="Email" required />
                    <input className={input} type="file" name="avatar" accept="image/*" required />
                    <select name="blood" required className={input}>
                        <option value="">Select Blood Group</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                            <option key={bg} value={bg}>{bg}</option>
                        ))}
                    </select>
                    <select name="district" required className={input}>
                        <option value="">Select District</option>
                        {districts.map((d) => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                    </select>
                    <select name="upazila" required className={input}>
                        <option value="">Select Upazila</option>
                        {upazilas.map((u) => (
                            <option key={u.id} value={u.name}>{u.name}</option>
                        ))}
                    </select>
                    <div className="relative">
                        <input
                            className={`${input} pr-10`}
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <div
                            className="absolute right-4 top-3 text-red-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            className={`${input} pr-10`}
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            required
                        />
                        <div
                            className="absolute right-4 top-3 text-red-500 cursor-pointer"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold text-lg"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center mt-4 text-sm text-gray-700">
                    Already have an account? <Link to="/login" className="text-red-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
