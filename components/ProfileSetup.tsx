
import React, { useState } from 'react';
import type { Profile, User } from '../types';
import { GoogleGenAI, Type } from "@google/genai";
import { SparklesIcon } from './icons/SparklesIcon';

interface ProfileSetupProps {
  user: User;
  onProfileSave: (profile: Profile) => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ user, onProfileSave }) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [aiKeywords, setAiKeywords] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiError, setAiError] = useState('');

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
    const newProfile: Profile = {
      id: user.email,
      name,
      bio,
      skills: skills.split(',').map(skill => skill.trim()).filter(Boolean),
      linkedInUrl,
      phone,
      avatarUrl: `https://picsum.photos/seed/${user.email}/400/400`,
      projects: [],
    };
    onProfileSave(newProfile);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">Welcome to RishiConnect!</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Let's set up your profile so others can find you.</p>
        
        <div className="space-y-4 p-4 bg-orange-50 dark:bg-gray-700/50 rounded-lg mb-6">
            <label htmlFor="ai-keywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Need inspiration? Describe your interests and let AI help.
            </label>
            <div className="flex items-center space-x-2">
                <input
                type="text"
                id="ai-keywords"
                value={aiKeywords}
                onChange={e => setAiKeywords(e.target.value)}
                className="flex-grow px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-900 dark:text-white"
                placeholder="e.g., Python, data science, machine learning"
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-900 dark:text-white" />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Bio</label>
            <textarea id="bio" value={bio} onChange={e => setBio(e.target.value)} required rows={4} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-900 dark:text-white" placeholder="Tell us about yourself, your interests, and what you're looking for in a team."></textarea>
          </div>

          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Skills (comma-separated)</label>
            <input type="text" id="skills" value={skills} onChange={e => setSkills(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-900 dark:text-white" placeholder="e.g., React, Python, UI/UX Design" />
          </div>

          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn Profile URL</label>
            <input type="url" id="linkedin" value={linkedInUrl} onChange={e => setLinkedInUrl(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-900 dark:text-white" placeholder="https://linkedin.com/in/yourprofile" />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number (Optional)</label>
            <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-900 dark:text-white" placeholder="123-456-7890" />
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-300">
              Create My Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
