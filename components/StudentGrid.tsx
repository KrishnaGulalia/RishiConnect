
import React from 'react';
import type { Profile } from '../types';
import { StudentCard } from './StudentCard';

interface StudentGridProps {
  profiles: Profile[];
  onViewProfile: (profile: Profile) => void;
}

export const StudentGrid: React.FC<StudentGridProps> = ({ profiles, onViewProfile }) => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {profiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {profiles.map(profile => (
            <StudentCard key={profile.id} profile={profile} onViewProfile={onViewProfile} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">No students found.</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search term.</p>
        </div>
      )}
    </div>
  );
};
