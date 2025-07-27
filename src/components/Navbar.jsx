
import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Logo from "../assets/BloodLogo.png";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logged out successfully!");
            setIsMenuOpen(false);
        } catch (error) {
            toast.error("Logout failed!");
        }
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Search", path: "/search" },
        { name: "Blog", path: "/blog" },
        { name: "Requests", path: "/donationRequest" },
        { name: "Request Details", path: "/requestDetails" },
        { name: "Funding", path: "/funding" },

    ];

    const renderNavLinks = (onClickClose = null) =>
        navLinks.map((link) => (
            <NavLink
                key={link.name}
                to={link.path}
                onClick={() => onClickClose?.()}
                className={({ isActive }) =>
                    `px-4 py-2 rounded-md font-medium transition duration-300 ${isActive
                        ? "bg-red-100 text-red-700 hover:bg-red-600 hover:text-white"
                        : "text-gray-700 hover:text-orange-600"
                    }`
                }
            >
                {link.name}
            </NavLink>
        ));

    return (
        <header
            className={`bg-white sticky top-0 z-50 transition-all duration-300 border-b-4 border-transparent ${isSticky ? "border-orange-500 shadow-lg" : ""
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between ">
                {/* Logo */}
                <div className="flex items-center">
                    <Link to="/">
                        <img className="w-36 py-1 cursor-pointer" src={Logo} alt="Logo" />
                    </Link>
                </div>

                {/* Desktop Nav */}
                {/* <nav className="hidden lg:flex items-center gap-4 text-base">
                    {renderNavLinks()}
                </nav> */}

                {/* Desktop Right Side Auth */}
                <div className="hidden lg:flex items-center gap-4">
                    {renderNavLinks()}

                    {user ? (
                        <div className="relative">
                            <img
                                src={user.photoURL}
                                alt="user avatar"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-10 h-10 rounded-full cursor-pointer border-2 border-red-600"
                            />
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded z-20 p-4 text-gray-800">
                                    {/* <div className="text-sm mb-2 font-medium">{user.displayName}</div> */}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-2 px-4 bg-red-600 text-white rounded relative overflow-hidden hover:bg-red-700 transition"
                                    >
                                        Logout
                                        <span className="absolute bottom-0 left-0 w-0 h-1 bg-yellow-400 transition-all duration-300 hover:w-full"></span>
                                    </button>
                                </div>
                            )}
                        </div>

                    ) : (
                        <>
                            <NavLink to="/login">
                                <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition btn">
                                    Login
                                </button>
                            </NavLink>
                            <NavLink to="/register">
                                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition btn">
                                    Register
                                </button>
                            </NavLink>
                        </>
                    )}
                </div>

                {/* Mobile & Tablet Burger Icon */}
                <div className="lg:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile/Tablet Menu Drawer */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white px-4 pb-4 shadow-md">
                    <div className="flex flex-col space-y-2 text-base">
                        {renderNavLinks(() => setIsMenuOpen(false))}
                    </div>
                    <div className="mt-4 space-y-2">
                        {user ? (
                            <div className="flex flex-col items-start gap-3">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={user.photoURL || "https://i.ibb.co/ZJcYB2g/default-user.png"}
                                        alt="User"
                                        className="w-10 h-10 rounded-full border-2 border-orange-600"
                                    />
                                    {/* <span className="font-semibold">{user.displayName || "Anonymous"}</span> */}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
                                        Login
                                    </button>
                                </NavLink>
                                <NavLink to="/register" onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                                        SignUp
                                    </button>
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;