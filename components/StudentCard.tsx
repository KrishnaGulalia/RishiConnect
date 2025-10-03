
import React from 'react';
import type { Profile } from '../types';

interface StudentCardProps {
  profile: Profile;
  onViewProfile: (profile: Profile) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({ profile, onViewProfile }) => {
  return (
    <div
      onClick={() => onViewProfile(profile)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <img className="h-20 w-20 rounded-full object-cover" src={profile.avatarUrl} alt={profile.name} />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{profile.name}</h3>
            <p className="text-sm text-orange-600 dark:text-orange-400 font-medium line-clamp-2">{profile.skills.slice(0, 3).join(' • ')}</p>
          </div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm line-clamp-3 h-16">{profile.bio}</p>
        <div className="mt-4">
          <button
            className="w-full text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};
