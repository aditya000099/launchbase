'use client';

import { useState, useEffect } from 'react';
import { account } from '../../lib/appwrite';
import { getUserProfile } from '../../lib/appwrite/user-management';
import Header from '../../components/Header';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = await account.get();
        const profile = await getUserProfile(currentUser.$id);
        setUser(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent-light/10 to-purple-600/10 dark:from-accent-dark/10 dark:to-purple-400/10">
        <Header user={user} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-light dark:border-accent-dark"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-light/10 to-purple-600/10 dark:from-accent-dark/10 dark:to-purple-400/10">
      <Header user={user} />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {/* Profile Header */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-light to-purple-600 dark:from-accent-dark dark:to-purple-400 bg-clip-text text-transparent">
                  Account Settings
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Manage your account and subscription
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-full border border-red-500 dark:text-white text-white hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                Logout
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Profile Information</h2>
                <div className="space-y-3">
                  <div className="bg-white/30 dark:bg-gray-700/30 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div className="bg-white/30 dark:bg-gray-700/30 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Account Status</h2>
                <div className="space-y-3">
                  <div className="bg-white/30 dark:bg-gray-700/30 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                    <p className="font-medium">{new Date(user.$createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-white/30 dark:bg-gray-700/30 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                    <p className="font-medium">{new Date(user.$updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Details */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Subscription Details</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/30 dark:bg-gray-700/30 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Plan</p>
                <p className="text-xl font-semibold mt-1">
                  {user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)}
                </p>
              </div>

              <div className="bg-white/30 dark:bg-gray-700/30 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                <div className="flex items-center mt-1">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    user.subscriptionStatus === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <p className="text-xl font-semibold">
                    {user.subscriptionStatus.charAt(0).toUpperCase() + user.subscriptionStatus.slice(1)}
                  </p>
                </div>
              </div>

              {user.subscriptionEndDate && (
                <div className="bg-white/30 dark:bg-gray-700/30 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Next Billing Date</p>
                  <p className="text-xl font-semibold mt-1">
                    {new Date(user.subscriptionEndDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => router.push('/pricing')}
                className="px-6 py-3 rounded-full bg-accent-light dark:bg-accent-dark text-white hover:opacity-90 transition-opacity"
              >
                Upgrade Plan
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-6 py-3 rounded-full border border-accent-light dark:border-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
