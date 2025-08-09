import React, { useState, useEffect, useRef } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import ThemeToggle from './ThemeToggle'
import Tvara from "../assets/tvara_logo.png"
import GithubStar from './GithubStar';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef(null); // Ref for dropdown

    // Scroll listener
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Click outside listener
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
            }
        };
        if (mobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    return (
        <>
            {/* Navbar */}
            <div className="w-[95%] sm:w-[90%] mx-auto rounded-full fixed z-50 left-1/2 transform -translate-x-1/2 top-4 transition-all duration-300">
                <nav
                    className={`flex p-2 sm:p-3 items-center justify-between transition-all duration-300 rounded-full ${
                        scrolled
                            ? 'bg-gray-400/90 dark:bg-[#020421]/90 backdrop-blur-md'
                            : 'bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-purple-600/10 backdrop-blur-sm'
                    }`}
                >
                    {/* Logo */}
                    <a href="#" className="flex items-center space-x-3">
                        <img
                            src={Tvara}
                            className={`h-8 sm:h-12 ml-2 sm:ml-3`}
                            alt="Tvara Logo Dark"
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {['Home', 'About', 'Services', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className={`py-2 px-3 text-sm lg:text-base ${
                                    scrolled
                                        ? 'text-white hover:text-blue-300'
                                        : 'text-gray-900 dark:text-white hover:text-blue-700'
                                } transition-colors`}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Desktop Right Side */}
                    <div className="hidden md:flex gap-3 items-center">
                        <GithubStar />
                        <ThemeToggle />
                    </div>

                    {/* Mobile Right Side */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileMenuOpen((prev) => !prev)}
                            className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-white/10 transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            {mobileMenuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Dropdown */}
            <div
                ref={menuRef}
                className={`md:hidden fixed top-[72px] left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden backdrop-blur-lg transition-all duration-300 ease-in-out ${
                    mobileMenuOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-5 pointer-events-none'
                } ${scrolled ? 'bg-gray-400/95 dark:bg-[#020421]/95' : 'bg-white/95 dark:bg-gray-900/95'}`}
                style={{ zIndex: 49 }}
            >
                <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
                    {['Home', 'About', 'Services', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="py-4 px-6 text-lg font-medium text-gray-900 dark:text-gray-100 hover:bg-blue-500 hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                    <div className="p-4">
                        <GithubStar />
                    </div>
                </div>
            </div>
        </>
    );
}
