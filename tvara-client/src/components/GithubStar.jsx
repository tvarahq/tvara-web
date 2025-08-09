import React, { useState, useEffect } from 'react';
import { FiGithub } from "react-icons/fi";
import { IoStar } from "react-icons/io5";
import { FaCodeFork } from "react-icons/fa6";

export default function GithubStar() {
    const [repoData, setRepoData] = useState({
        stars: null,
        forks: null,
        loading: true,
        error: null
    });

    const repoOwner = "tvarahq";
    const repoName = "tvara";
    const repoUrl = `https://github.com/${repoOwner}/${repoName}`;

    useEffect(() => {
        const fetchRepoData = async () => {
            try {
                const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch repository data');
                }
                const data = await response.json();
                setRepoData({
                    stars: data.stargazers_count,
                    forks: data.forks_count,
                    loading: false,
                    error: null
                });
            } catch (error) {
                setRepoData(prev => ({
                    ...prev,
                    loading: false,
                    error: error.message
                }));
                console.error('Error fetching repository data:', error);
            }
        };

        fetchRepoData();
    }, []);

    return (
        <button
            type="button"
            className="cursor-pointer text-white border-2 border-gray-900 dark:border-white bg-gray-800 font-medium rounded-full text-xs sm:text-sm px-3 py-2 sm:px-4 text-center dark:text-gray-900 dark:bg-gray-300 dark:hover:border-gray-800 flex justify-center items-center gap-2 hover:scale-105 transition-transform"
            onClick={() => window.open(repoUrl, "_blank")}
        >
            <div className='flex items-center gap-1'>
                <FiGithub className="text-sm sm:text-base" />
                <span className="hidden sm:inline">Github</span>
                <span className="sm:hidden">Git</span>
            </div>

            {repoData.loading ? (
                <div className="animate-pulse text-xs">...</div>
            ) : repoData.error ? (
                <div className="text-xs">Error</div>
            ) : (
                <div className='flex items-center gap-2 sm:gap-3'>
                    <div className='flex items-center gap-1'>
                        <IoStar className="text-yellow-400 text-xs sm:text-sm" /> 
                        <span className="text-xs sm:text-sm">{repoData.stars}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <FaCodeFork className="text-xs sm:text-sm" /> 
                        <span className="text-xs sm:text-sm">{repoData.forks}</span>
                    </div>
                </div>
            )}
        </button>
    );
}
