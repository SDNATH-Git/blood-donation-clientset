import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Logo from "../assets/BloodLogo.png"

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-base-content  p-6 shadow-inner text-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

                {/* App Info */}
                <div>
                    <div className="flex items-center ">
                        <img className="w-32 py-1 " src={Logo} alt="Logo" />
                    </div>
                    <p>Your one-stop shop for all modern web and mobile apps.</p>
                </div>

                {/* Useful Links */}
                <div className='mt-8'>
                    <h3 className="text-lg font-semibold mb-2">Links</h3>
                    <ul className="space-y-1">
                        <li>
                            <a href="https://appstore.com/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                Terms of Service
                            </a>
                        </li>
                        <li>
                            <a href="https://appstore.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="https://stackoverflow.com/questions/56939805/how-to-change-developer-website-in-app-store" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                Developer Resources
                            </a>
                        </li>
                    </ul>
                </div>


                {/* Contact Info (Optional) */}
                <div className='mt-8'>
                    <h3 className="text-lg font-semibold mb-2">Contact</h3>
                    <p>Email: support@appstore.com</p>
                    <p>Phone: +123-456-7890</p>
                </div>

                {/* Social Media */}
                <div className='mt-8'>
                    <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                    <div className="flex gap-4 text-2xl">
                        <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
                        <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
                        <a href="https://github.com" aria-label="GitHub"><FaGithub /></a>
                        <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            <div className="text-center mt-6 text-sm opacity-70">
                © {new Date().getFullYear()} App Store. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;