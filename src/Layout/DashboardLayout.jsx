
import { useState, useContext, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FiUser, FiLogOut, FiList, FiDroplet, FiSettings } from "react-icons/fi";
import logo from "../assets/BloodLogo.png";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [role, setRole] = useState(null);

    // ✅ Handle Logout
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("Logout failed!");
        }
    };

    const activeClass =
        "text-white font-bold bg-red-600 rounded-lg px-2 py-1 shadow";

    // ✅ Load User Role
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const token = localStorage.getItem("access-token");
                const res = await axios.get(`http://localhost:5000/users/role/${user?.email}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRole(res.data.role);
            } catch (err) {
                console.error("Failed to fetch role", err);
            }
        };
        if (user?.email) {
            fetchRole();
        }
    }, [user]);

    return (
        <div className="flex h-screen bg-red-400 overflow-hidden">
            {/* ✅ Sidebar */}
            <aside
                className={`w-64 fixed md:static top-0 left-0 z-50 p-6 flex flex-col justify-between transition-transform duration-300 transform
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
                bg-gradient-to-t from-red-300 via-red-100 to-white text-black h-full overflow-y-auto`}
            >
                <div>
                    <Link to="/">
                        <img className="w-36 py-4 cursor-pointer" src={logo} alt="Logo" />
                    </Link>

                    <ul className="space-y-5 font-medium">
                        {/* ✅ Common: Profile */}
                        <li>
                            <NavLink
                                to="/dashboard/profile"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-2 py-1 hover:text-red-700 transition ${isActive ? activeClass : "text-gray-700"}`
                                }
                                onClick={() => setSidebarOpen(false)}
                            >
                                <FiUser size={20} />
                                Profile
                            </NavLink>
                        </li>

                        {/* ✅ Donor Routes */}
                        {role === "donor" && (
                            <>
                                <li>
                                    <NavLink
                                        to="/dashboard/my-donation-requests"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-2 py-1 hover:text-red-700 transition ${isActive ? activeClass : "text-gray-700"}`
                                        }
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <FiList size={20} />
                                        My Donation Requests
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/create-donation-request"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-2 py-1 hover:text-red-700 transition ${isActive ? activeClass : "text-gray-700"}`
                                        }
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <FiDroplet size={20} />
                                        Create Donation Request
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* ✅ Volunteer Routes */}
                        {role === "volunteer" && (
                            <>
                                <li>
                                    <NavLink
                                        to="/dashboard/all-blood-donation-request"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-2 py-1 hover:text-red-700 transition ${isActive ? activeClass : "text-gray-700"}`
                                        }
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <FiList size={20} />
                                        All Requests
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/content-management"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-2 py-1 hover:text-red-700 transition ${isActive ? activeClass : "text-gray-700"}`
                                        }
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <FiSettings size={20} />
                                        Content Management
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* ✅ Admin Routes */}
                        {role === "admin" && (
                            <>
                                <li>
                                    <NavLink
                                        to="/dashboard/all-users"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-2 py-1 hover:text-red-700 transition ${isActive ? activeClass : "text-gray-700"}`
                                        }
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <FiUser size={20} />
                                        All Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/all-blood-donation-request"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-2 py-1 hover:text-red-700 transition ${isActive ? activeClass : "text-gray-700"}`
                                        }
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <FiList size={20} />
                                        All Requests
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/content-management"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-2 py-1 hover:text-red-700 transition ${isActive ? activeClass : "text-gray-700"}`
                                        }
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <FiSettings size={20} />
                                        Content Management
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* ✅ Logout Button */}
                <button
                    onClick={handleLogout}
                    className="mt-6 flex items-center gap-2 text-red-800 hover:text-red-600 transition font-bold"
                >
                    <FiLogOut size={20} />
                    Logout
                </button>
            </aside>

            {/* ✅ Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* ✅ Topbar (mobile only) */}
                <div className="md:hidden bg-red-600 text-white p-4 flex items-center justify-between shadow">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-white text-2xl"
                    >
                        <FaBars />
                    </button>
                </div>

                {/* ✅ Page Outlet */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;



