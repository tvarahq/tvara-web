import React, { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import TvaraLogoBlack from "../assets/tvara_logo_black.png"
import TvaraLogoWhite from "../assets/tvara_logo_white.png"

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        
        // Clean up event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='w-[90%] mx-auto rounded-full overflow-hidden fixed z-1000 left-20 transition-all duration-300'>
            <nav className={`flex p-2 items-center justify-between transition-all duration-300 ${
                scrolled 
                ? 'bg-gray-400 dark:bg-[#020421] ' // Solid black background when scrolled
                : 'bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-purple-600/10'
            }`}>    
                <div className="max-w-screen-xl flex flex-wrap gap-20 ">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img
                            src={TvaraLogoBlack}
                            className={`h-8 ml-3 ${scrolled ? 'hidden' : 'block dark:hidden'}`}
                            alt="Tvara Logo Dark"
                        />
                        <img
                            src={TvaraLogoWhite}
                            className={`h-8 ml-3 ${scrolled ? 'block' : 'hidden dark:block'}`}
                            alt="Tvara Logo Light"
                        />
                    </a>

                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                            <li>
                                <a href="#" className={`block py-2 px-3 md:p-0 ${scrolled ? 'text-white' : 'text-white bg-blue-700'} rounded-sm md:bg-transparent md:text-blue-700 md:dark:text-blue-500`} aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className={`block py-2 px-3 md:p-0 ${scrolled ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:bg-gray-100'} rounded-sm md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>About</a>
                            </li>
                            <li>
                                <a href="#" className={`block py-2 px-3 md:p-0 ${scrolled ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:bg-gray-100'} rounded-sm md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Services</a>
                            </li>
                            <li>
                                <a href="#" className={`block py-2 px-3 md:p-0 ${scrolled ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:bg-gray-100'} rounded-sm md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex gap-3 md:order-2 items-center space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <ThemeToggle />
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>
                </div>
            </nav>
        </div>
    )
}
