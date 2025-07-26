import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Logo from "../assets/BloodLogo.png"
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logged out successfully!");
            setIsDropdownOpen(false);
        } catch (error) {
            toast.error(error, "Logout failed!");
        }
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "All Recipes", path: "/all-recipes" },
        { name: "Add Recipe", path: "/add-recipes" },
        { name: "My Recipes", path: "/my-recipes" },
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
                        : ""
                    }`
                }
            >
                {link.name}
            </NavLink>
        ));


    return (
        <header
            className={`bg-white text-gray-800 sticky top-0 z-50 transition-all duration-300 border-b-4 border-transparent ${isSticky ? "border-orange-500 shadow-lg" : ""
                }`}
        >
            <div className="container mx-auto px-4  flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center ">
                    <img className="w-32 py-1" src={Logo} alt="Logo" />

                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 text-base">{renderNavLinks()}</nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center space-x-4 relative">
                    {user ? (
                        <div className="relative">
                            <img
                                src={user.photoURL}
                                alt="user avatar"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-10 h-10 rounded-full cursor-pointer border-2 border-violet-600"
                            />
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded z-20 p-4 text-gray-800">
                                    <div className="text-sm mb-2 font-medium">{user.displayName}</div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-2 px-4 bg-orange-600 text-white rounded relative overflow-hidden hover:bg-orange-700 transition"
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
                                <button className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition btn">
                                    Login
                                </button>
                            </NavLink>
                            <NavLink to="/register">
                                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition btn">
                                    Register
                                </button>
                            </NavLink>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button.. */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white px-4 pb-4 space-y-2">
                    <div className="mt-3 flex flex-col space-y-2 text-base">
                        {renderNavLinks(() => setIsMenuOpen(false))}
                    </div>
                    <div className="mt-4 space-y-2">
                        {user ? (
                            <div className="flex flex-col items-start gap-2 mt-4">
                                <div className="flex items-center gap-3">
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full border-2 border-violet-600"
                                        />
                                    ) : (
                                        <FaUserCircle size={32} />
                                    )}
                                    <span className="font-medium">{user.displayName}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="py-2 px-4 bg-orange-600 text-white rounded relative overflow-hidden hover:bg-orange-700 transition btn"
                                >
                                    Logout
                                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-yellow-400 transition-all duration-300 hover:w-full"></span>
                                </button>
                            </div>
                        ) : (
                            <>
                                <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full py-2 bg-orange-600 rounded hover:bg-orange-700 text-white transition btn">
                                        Login
                                    </button>
                                </NavLink>
                                <NavLink to="/register" onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition btn">
                                        Register
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