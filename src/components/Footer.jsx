import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Logo from "../assets/BloodLogo.png";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-black text-white px-5 md:px-5 lg:p-10 shadow-inner py-8">
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Logo and Description */}
                <div>
                    <div className="flex items-center">
                        <Link to="/">
                            <img className="w-36 py-1 cursor-pointer" src={Logo} alt="Logo" />
                        </Link>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                        Your one-stop platform for saving lives through blood donation.
                    </p>
                </div>

                {/* Useful Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 border-b-2 border-red-600 pb-2">
                        Links
                    </h3>
                    <ul className="space-y-3">
                        <li>
                            <a
                                href="#"
                                className="hover:text-red-600 transition-colors"
                            >
                                Terms of Service
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-red-600 transition-colors"
                            >
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-red-600 transition-colors"
                            >
                                Developer Resources
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 border-b-2 border-red-600 pb-2">
                        Contact
                    </h3>
                    <p className="text-gray-300 mb-2">
                        Email:{" "}
                        <a
                            href="mailto:support@example.com"
                            className="hover:text-red-600 transition-colors"
                        >
                            support@example.com
                        </a>
                    </p>
                    <p className="text-gray-300">
                        Phone:{" "}
                        <a
                            href="tel:+880123456789"
                            className="hover:text-red-600 transition-colors"
                        >
                            +880 1234 56789
                        </a>
                    </p>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 border-b-2 border-red-600 pb-2">
                        Follow Us
                    </h3>
                    <div className="flex gap-6 text-3xl text-gray-400">
                        <a
                            href="https://www.facebook.com/sd.nath.9400/"
                            aria-label="Facebook"
                            className="hover:text-red-600 transition-colors"
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="https://twitter.com"
                            aria-label="Twitter"
                            className="hover:text-red-600 transition-colors"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://github.com/SDNATH-Git"
                            aria-label="GitHub"
                            className="hover:text-red-600 transition-colors"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/sd-nath/"
                            aria-label="LinkedIn"
                            className="hover:text-red-600 transition-colors"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center mt-10 text-gray-400 text-sm select-none">
                © {new Date().getFullYear()} Blood Donation Platform. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
