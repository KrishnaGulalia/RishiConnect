
import React from 'react';
import type { Profile } from '../types';

interface NavbarProps {
    userProfile: Profile | undefined;
    onLogout: () => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ userProfile, onLogout, searchTerm, onSearchChange }) => {
    return (
        <nav className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold text-orange-600 dark:text-orange-400">RishiConnect</h1>
                    </div>
                    <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                        <div className="max-w-lg w-full lg:max-w-xs">
                            <label htmlFor="search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    id="search"
                                    name="search"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                    placeholder="Search by name or skill"
                                    type="search"
                                    value={searchTerm}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="ml-4 flex items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-3 hidden sm:block">{userProfile?.name}</span>
                        <button
                            onClick={onLogout}
                            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
