"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { account } from '../../lib/appwrite';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
        router.push('/dashboard');
      } catch (error) {
        // User is not logged in, do nothing
      }
    };

    checkSession();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await account.createEmailPasswordSession(email, password);
      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent-light/10 to-purple-600/10 dark:from-accent-dark/10 dark:to-purple-400/10">
      <div className="absolute inset-0 backdrop-blur-xl" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl backdrop-blur-lg bg-opacity-50 dark:bg-opacity-50 p-8 border border-white/10">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block">
                <Image
                  src="/starter-saas-logo.png"
                  alt="Launch Base Logo"
                  width={60}
                  height={60}
                  className="mx-auto mb-4"
                />
              </Link>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-light to-purple-600 dark:from-accent-dark dark:to-purple-400 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Sign in to your account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <Link 
                  href="/forgot-password"
                  className="text-accent-light dark:text-accent-dark hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-light to-purple-600 dark:from-accent-dark dark:to-purple-400 text-white font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light dark:focus:ring-accent-dark disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link 
                  href="/signup"
                  className="text-accent-light dark:text-accent-dark hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
