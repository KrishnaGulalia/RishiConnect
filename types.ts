
export interface Project {
  title: string;
  description: string;
  link?: string;
}

export interface Profile {
  id: string; // email
  name: string;
  avatarUrl: string;
  bio: string;
  skills: string[];
  linkedInUrl: string;
  projects: Project[];
  phone?: string;
}

export interface User {
    email: string;
}
