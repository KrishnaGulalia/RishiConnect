
import type { Profile } from '../types';

export const MOCK_PROFILES: Profile[] = [
  {
    id: 'jane.doe@rishihood.edu.in',
    name: 'Jane Doe',
    avatarUrl: 'https://picsum.photos/seed/jane/400/400',
    bio: 'Frontend developer passionate about creating beautiful and intuitive user interfaces. Love React and TypeScript. Looking for a team for the upcoming web dev hackathon!',
    skills: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Figma'],
    linkedInUrl: 'https://www.linkedin.com/in/janedoe',
    phone: '111-222-3333',
    projects: [
      {
        title: 'Portfolio Website',
        description: 'A personal portfolio built with Next.js and Framer Motion.',
        link: 'https://example.com'
      },
      {
        title: 'E-commerce Store UI',
        description: 'A design prototype for a modern e-commerce platform.'
      }
    ]
  },
  {
    id: 'john.smith@rishihood.edu.in',
    name: 'John Smith',
    avatarUrl: 'https://picsum.photos/seed/john/400/400',
    bio: 'Full-stack engineer with expertise in Node.js, Python, and cloud infrastructure. Interested in AI/ML projects.',
    skills: ['Node.js', 'Python', 'Docker', 'AWS', 'PostgreSQL', 'Machine Learning'],
    linkedInUrl: 'https://www.linkedin.com/in/johnsmith',
    phone: '222-333-4444',
    projects: [
      {
        title: 'AI Chatbot',
        description: 'A customer service chatbot using NLP.',
        link: 'https://github.com/johnsmith/chatbot'
      }
    ]
  },
  {
    id: 'emily.jones@rishihood.edu.in',
    name: 'Emily Jones',
    avatarUrl: 'https://picsum.photos/seed/emily/400/400',
    bio: 'UI/UX designer with a knack for user-centric design. Proficient in Figma, Sketch, and Adobe XD. Let\'s build something amazing together.',
    skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research', 'Design Systems'],
    linkedInUrl: 'https://www.linkedin.com/in/emilyjones',
    phone: '333-444-5555',
    projects: [
      {
        title: 'Mobile Banking App Redesign',
        description: 'A case study on improving the user experience of a banking application.',
        link: 'https://behance.net/emilyjones/banking-app'
      }
    ]
  },
  {
    id: 'michael.brown@rishihood.edu.in',
    name: 'Michael Brown',
    avatarUrl: 'https://picsum.photos/seed/michael/400/400',
    bio: 'Data scientist and analyst. I enjoy uncovering insights from complex datasets. Skilled in Python, R, and data visualization tools.',
    skills: ['Data Science', 'Python', 'R', 'SQL', 'Tableau', 'Scikit-learn'],
    linkedInUrl: 'https://www.linkedin.com/in/michaelbrown',
    phone: '444-555-6666',
    projects: [
      {
        title: 'Market Trend Analysis',
        description: 'Analyzed sales data to predict future market trends for a fictional company.'
      }
    ]
  }
];
