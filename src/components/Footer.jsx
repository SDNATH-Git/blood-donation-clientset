import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Logo from "../assets/BloodLogo.png";

const Footer = () => {
    return (
        <footer className="bg-black text-white p-10 shadow-inner">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Logo and Description */}
                <div>
                    <div className="flex items-center mb-4">
                        <img className="w-28" src={Logo} alt="Logo" />
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
                            href="https://facebook.com"
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
                            href="https://github.com"
                            aria-label="GitHub"
                            className="hover:text-red-600 transition-colors"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://linkedin.com"
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
