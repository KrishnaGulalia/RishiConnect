import React, { useState } from 'react';
import { GoogleIcon } from './icons/GoogleIcon';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateAndLogin = (emailToValidate: string | null) => {
    setError('');
    if (!emailToValidate) {
      return; // User cancelled prompt
    }

    const isValidDomain = emailToValidate.endsWith('@rishihood.edu.in') || emailToValidate.endsWith('@nst.rishihood.edu.in');

    if (!isValidDomain) {
      setError('Access is restricted to Rishihood University students. Please use an email ending with @rishihood.edu.in or @nst.rishihood.edu.in.');
      return;
    }
    onLogin(emailToValidate);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateAndLogin(email);
  };

  const handleGoogleLogin = () => {
    const promptedEmail = prompt("Please enter your Rishihood University email address:", "");
    validateAndLogin(promptedEmail);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">RishiConnect</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Find your dream team.</p>
        </div>
        
        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="group relative w-full flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-300"
          >
            <GoogleIcon className="h-5 w-5 mr-3" />
            Sign in with Google
          </button>
        </div>

        <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="flex-shrink mx-4 text-sm text-gray-500 dark:text-gray-400">Or continue with</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              placeholder="your.name@rishihood.edu.in"
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-300"
            >
              Sign in / Register
            </button>
          </div>
        </form>
         <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
            Only for Rishihood University students.
         </p>
      </div>
    </div>
  );
};