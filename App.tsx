
import React, { useState, useEffect, useMemo } from 'react';
import { LoginPage } from './components/LoginPage';
import { ProfileSetup } from './components/ProfileSetup';
import { Navbar } from './components/Navbar';
import { StudentGrid } from './components/StudentGrid';
import { ProfileModal } from './components/ProfileModal';
import { EditProfileModal } from './components/EditProfileModal';
import { MOCK_PROFILES } from './services/mockData';
import type { Profile, User } from './types';

type View = 'LOGIN' | 'SETUP' | 'DASHBOARD';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [view, setView] = useState<View>('LOGIN');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // On initial load, read from localStorage
    try {
      const storedProfiles = localStorage.getItem('rishiconnect_profiles');
      if (storedProfiles) {
        setProfiles(JSON.parse(storedProfiles));
      } else {
        // If no profiles, seed with mock data
        setProfiles(MOCK_PROFILES);
        localStorage.setItem('rishiconnect_profiles', JSON.stringify(MOCK_PROFILES));
      }

      const storedUser = localStorage.getItem('rishiconnect_user');
      if (storedUser) {
        const user: User = JSON.parse(storedUser);
        setCurrentUser(user);
        setView('DASHBOARD');
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      // Fallback to mock profiles if localStorage is corrupt
      setProfiles(MOCK_PROFILES);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Persist profiles to localStorage whenever they change
    if (isInitialized) {
        localStorage.setItem('rishiconnect_profiles', JSON.stringify(profiles));
    }
  }, [profiles, isInitialized]);
  
  useEffect(() => {
    // Persist user to localStorage on login/logout
     if (isInitialized) {
        if (currentUser) {
            localStorage.setItem('rishiconnect_user', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('rishiconnect_user');
        }
    }
  }, [currentUser, isInitialized]);


  const handleLogin = (email: string) => {
    const user: User = { email };
    setCurrentUser(user);
    
    const existingProfile = profiles.find(p => p.id === email);
    if (existingProfile) {
      setView('DASHBOARD');
    } else {
      setView('SETUP');
    }
  };

  const handleProfileSave = (newProfile: Profile) => {
    setProfiles(prevProfiles => [...prevProfiles, newProfile]);
    setView('DASHBOARD');
  };
  
  const handleProfileUpdate = (updatedProfile: Profile) => {
    setProfiles(profiles.map(p => p.id === updatedProfile.id ? updatedProfile : p));
    setSelectedProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('LOGIN');
    setSearchTerm('');
  };

  const handleViewProfile = (profile: Profile) => {
    setSelectedProfile(profile);
  };
  
  const handleCloseModal = () => {
    setSelectedProfile(null);
  };

  const filteredProfiles = useMemo(() => {
    if (!searchTerm) {
      return profiles;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return profiles.filter(profile => 
      profile.name.toLowerCase().includes(lowercasedFilter) ||
      profile.skills.some(skill => skill.toLowerCase().includes(lowercasedFilter))
    );
  }, [profiles, searchTerm]);
  
  const userProfile = useMemo(() => {
    return profiles.find(p => p.id === currentUser?.email);
  }, [profiles, currentUser]);

  const renderContent = () => {
    if (!isInitialized) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"><p className="text-white">Loading...</p></div>; // Or a proper spinner
    }

    switch (view) {
      case 'LOGIN':
        return <LoginPage onLogin={handleLogin} />;
      case 'SETUP':
        if (!currentUser) {
          setView('LOGIN');
          return null;
        }
        return <ProfileSetup user={currentUser} onProfileSave={handleProfileSave} />;
      case 'DASHBOARD':
        return (
          <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Navbar userProfile={userProfile} onLogout={handleLogout} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <main>
              <StudentGrid profiles={filteredProfiles} onViewProfile={handleViewProfile} />
            </main>
          </div>
        );
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <>
      {renderContent()}
      {selectedProfile && !isEditing && (
        <ProfileModal 
            profile={selectedProfile} 
            onClose={handleCloseModal}
            currentUserEmail={currentUser?.email}
            onEdit={() => setIsEditing(true)}
        />
      )}
      {isEditing && selectedProfile && (
        <EditProfileModal 
            profile={selectedProfile}
            onSave={handleProfileUpdate}
            onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
}

export default App;
