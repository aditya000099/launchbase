'use client';

import { useState, useEffect } from 'react';
import { account } from '../lib/appwrite';
import { getUserProfile } from '../lib/appwrite/user-management';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = await account.get();
        const profile = await getUserProfile(currentUser.$id);
        setUser(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Subscription Details</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Current Plan</p>
            <p className="font-medium">{user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Status</p>
            <p className="font-medium">{user.subscriptionStatus.charAt(0).toUpperCase() + user.subscriptionStatus.slice(1)}</p>
          </div>
          {user.subscriptionEndDate && (
            <div>
              <p className="text-gray-600 dark:text-gray-400">Renewal Date</p>
              <p className="font-medium">{new Date(user.subscriptionEndDate).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
