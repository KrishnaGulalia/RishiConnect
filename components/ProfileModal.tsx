
import React from 'react';
import type { Profile } from '../types';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { CloseIcon } from './icons/CloseIcon';
import { EditIcon } from './icons/EditIcon';
import { EmailIcon } from './icons/EmailIcon';
import { PhoneIcon } from './icons/PhoneIcon';

interface ProfileModalProps {
  profile: Profile;
  onClose: () => void;
  currentUserEmail?: string;
  onEdit: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ profile, onClose, currentUserEmail, onEdit }) => {
  const isOwnProfile = profile.id === currentUserEmail;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start">
                <div className="flex items-start space-x-5">
                    <img className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover ring-4 ring-orange-500" src={profile.avatarUrl} alt={profile.name} />
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">{profile.name}</h2>
                        {profile.linkedInUrl && (
                            <a href={profile.linkedInUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                                <LinkedInIcon className="h-5 w-5" />
                                <span className="text-sm font-medium">LinkedIn</span>
                            </a>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {isOwnProfile && (
                        <button onClick={onEdit} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                            <EditIcon className="h-6 w-6" />
                        </button>
                    )}
                    <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>

            <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-3">
                    <a href={`mailto:${profile.id}`} className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                        <EmailIcon className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm">{profile.id}</span>
                    </a>
                    {profile.phone && (
                        <div className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                            <PhoneIcon className="h-5 w-5 flex-shrink-0" />
                            <span className="text-sm">{profile.phone}</span>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">About</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{profile.bio}</p>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Skills</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                    {profile.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 text-sm font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300 rounded-full">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {profile.projects.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Projects</h3>
                    <ul className="mt-2 space-y-4">
                        {profile.projects.map((project, index) => (
                            <li key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">{project.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-orange-500 hover:underline mt-2 inline-block">View Project</a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
      </div>
      <style>{`
        @keyframes modal-enter {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-enter {
            animation: modal-enter 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
