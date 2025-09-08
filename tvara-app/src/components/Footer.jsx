import React, { useState } from 'react';
import { Mail, Linkedin, Github, BookText, Slack } from 'lucide-react';
import Logo from '../assets/navbar_logo.svg';
const Footer = () => {
    const [email, setEmail] = useState('');

    const handleEmailSubmit = () => {
        if (email) {
            console.log('Email submitted:', email);
            setEmail('');
        }
    };

    return (
        <footer className="bg-background text-white mt-10 ">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">

                    <div className="flex items-center space-x-3">
                        <img src={Logo} alt="Tvara Logo" className="h-8 w-auto" />
                    </div>

                    <div className="text-center flex items-center space-x-8 text-gray-700">
                        Copyright &#169; 2025 Tvara Studios Pvt. Ltd., 
                        <br></br>
                        All rights reserved.
                    </div>

                    <div className="flex items-center space-x-3">
                        <a
                            href="https://www.linkedin.com/company/tvarahq" target="_blank" rel="noreferrer"
                            className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-gray-500 hover:bg-gray-800 transition-all duration-200 group"
                        >
                            <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-white" />
                        </a>
                        <a
                            href="https://github.com/tvarahq/tvara" target="_blank" rel="noreferrer"
                            className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-gray-500 hover:bg-gray-800 transition-all duration-200 group"
                        >
                            <Github className="w-4 h-4 text-gray-400 group-hover:text-white" />
                        </a>
                        <a
                            href="https://blog.tvarahq.com" target="_blank" rel="noreferrer"
                            className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-gray-500 hover:bg-gray-800 transition-all duration-200 group"
                        >
                            <BookText className="w-4 h-4 text-gray-400 group-hover:text-white" />
                        </a>
                        <a
                            href="https://tvara-workspace.slack.com/archives/C099B0WMYKZ" target="_blank" rel="noreferrer"
                            className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-gray-500 hover:bg-gray-800 transition-all duration-200 group"
                        >
                            <Slack className="w-4 h-4 text-gray-400 group-hover:text-white" />
                        </a>
                        <a
                            href="mailto:team@tvarahq.com" target="_blank" rel="noreferrer"
                            className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-gray-500 hover:bg-gray-800 transition-all duration-200 group"
                        >
                            <Mail className="w-4 h-4 text-gray-400 group-hover:text-white" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;