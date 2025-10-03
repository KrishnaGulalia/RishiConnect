
import React, { useState, useEffect } from 'react';
import type { Profile } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { GoogleGenAI, Type } from "@google/genai";
import { SparklesIcon } from './icons/SparklesIcon';

interface EditProfileModalProps {
  profile: Profile;
  onSave: (updatedProfile: Profile) => void;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ profile, onSave, onClose }) => {
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [skills, setSkills] = useState(profile.skills.join(', '));
  const [linkedInUrl, setLinkedInUrl] = useState(profile.linkedInUrl);
  const [phone, setPhone] = useState(profile.phone || '');
  const [aiKeywords, setAiKeywords] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiError, setAiError] = useState('');

  useEffect(() => {
    setName(profile.name);
    setBio(profile.bio);
    setSkills(profile.skills.join(', '));
    setLinkedInUrl(profile.linkedInUrl);
    setPhone(profile.phone || '');
  }, [profile]);

  const handleGenerateWithAi = async () => {
    if (!aiKeywords) {
      setAiError('Please enter some keywords first.');
      return;
    }
    setIsLoadingAi(true);
    setAiError('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Based on these keywords: "${aiKeywords}", create a profile for a university student. Generate a professional, first-person bio (around 40-50 words) and suggest 5 relevant technical or soft skills (as a single comma-separated string).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              bio: {
                type: Type.STRING,
                description: "The generated professional bio."
              },
              skills: {
                type: Type.STRING,
                description: "A comma-separated string of suggested skills."
              }
            }
          }
        }
      });
      
      const jsonText = response.text.trim();
      const parsed = JSON.parse(jsonText);

      if (parsed.bio) {
        setBio(parsed.bio);
      }
      if (parsed.skills) {
        setSkills(parsed.skills);
      }
    } catch (error) {
      console.error("AI generation failed:", error);
      setAiError("Failed to generate content. Please try again.");
    } finally {
      setIsLoadingAi(false);
    }
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedProfile: Profile = {
      ...profile,
      name,
      bio,
      skills: skills.split(',').map(skill => skill.trim()).filter(Boolean),
      linkedInUrl,
      phone,
    };
    onSave(updatedProfile);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Your Profile</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <CloseIcon className="h-6 w-6" />
                </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-4 p-4 bg-orange-50 dark:bg-gray-700/50 rounded-lg">
                <label htmlFor="ai-keywords-edit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Refresh your profile? Enter keywords to generate a new bio & skills.
                </label>
                <div className="flex items-center space-x-2">
                    <input
                    type="text"
                    id="ai-keywords-edit"
                    value={aiKeywords}
                    onChange={e => setAiKeywords(e.target.value)}
                    className="flex-grow px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-900 dark:text-white"
                    placeholder="e.g., Marketing, social media, content creation"
                    />
                    <button
                    type="button"
                    onClick={handleGenerateWithAi}
                    disabled={isLoadingAi}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed flex items-center"
                    >
                    <SparklesIcon className={`h-5 w-5 mr-2 ${isLoadingAi ? 'animate-spin' : ''}`} />
                    {isLoadingAi ? 'Generating...' : 'Generate'}
                    </button>
                </div>
                {aiError && <p className="text-xs text-red-500 mt-1">{aiError}</p>}
            </div>

            <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" id="edit-name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-900 dark:text-white" />
            </div>

            <div>
                <label htmlFor="edit-bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Bio</label>
                <textarea id="edit-bio" value={bio} onChange={e => setBio(e.target.value)} required rows={4} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-900 dark:text-white"></textarea>
            </div>

            <div>
                <label htmlFor="edit-skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Skills (comma-separated)</label>
                <input type="text" id="edit-skills" value={skills} onChange={e => setSkills(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-900 dark:text-white" />
            </div>

            <div>
                <label htmlFor="edit-linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn Profile URL</label>
                <input type="url" id="edit-linkedin" value={linkedInUrl} onChange={e => setLinkedInUrl(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-900 dark:text-white" />
            </div>
            
            <div>
                <label htmlFor="edit-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number (Optional)</label>
                <input type="tel" id="edit-phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-900 dark:text-white" />
            </div>

            <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    Cancel
                </button>
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-300">
                    Save Changes
                </button>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
};
