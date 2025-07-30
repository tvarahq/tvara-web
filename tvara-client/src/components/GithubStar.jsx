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

    // Replace with your actual repository details
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
        <div>
            <button
                type="button"
                className="cursor-pointer text-white border-2 border-gray-900 dark:border-white bg-gray-800 font-medium rounded-full text-sm px-4 py-2 text-center dark:text-gray-900 dark:bg-gray-300 dark:hover:border-gray-800 flex justify-center items-center gap-2"
                onClick={() => window.open(repoUrl, "_blank")} // Redirect to GitHub on click
            >
                <div className='flex items-center gap-1'>
                    <FiGithub />
                    <span>Github</span>
                </div>

                {repoData.loading ? (
                    <div className="animate-pulse">Loading...</div>
                ) : repoData.error ? (
                    <div>Error</div>
                ) : (
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-1'>
                            <IoStar className="text-yellow-400" /> {repoData.stars}
                        </div>
                        <div className='flex items-center gap-1'>
                            <FaCodeFork /> {repoData.forks}
                        </div>
                    </div>
                )}
            </button>
        </div>
    );
}
