'use client';

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '../../lib/appwrite';
import { getUserProfile } from '../../lib/appwrite/user-management';
import Header from '../../components/Header';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.get();
        setUser(session);
        const profile = await getUserProfile(session.$id);
        setUserProfile(profile);
      } catch (error) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

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

  const quickActions = [
    { name: 'View Profile', icon: '👤', href: '/account' },
    { name: 'Upgrade Plan', icon: '⭐', href: '/pricing' },
    { name: 'Support', icon: '💬', href: '/support' },
    { name: 'Documentation', icon: '📚', href: '/docs' },
  ];

  const stats = [
    { name: 'Current Plan', value: userProfile?.subscriptionTier || 'Free', icon: '📊' },
    { name: 'Status', value: userProfile?.subscriptionStatus || 'Inactive', icon: '🔄' },
    // { name: 'Member Since', value: new Date(user.$createdAt).toLocaleDateString(), icon: '📅' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-light/10 to-purple-600/10 dark:from-accent-dark/10 dark:to-purple-400/10">
      <Header user={user} />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          {/* Welcome Section */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-light to-purple-600 dark:from-accent-dark dark:to-purple-400 bg-clip-text text-transparent">
              Welcome back, {userProfile?.name}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Here's an overview of your account and quick actions.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-white/10 dark:border-gray-700/10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => router.push(action.href)}
                  className="p-4 bg-white/30 dark:bg-gray-700/30 rounded-xl border border-white/10 dark:border-gray-600/10 hover:bg-white/40 dark:hover:bg-gray-600/40 transition-all duration-200"
                >
                  <span className="text-2xl mb-2 block">{action.icon}</span>
                  <span className="font-medium">{action.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-2xl">🎯</div>
                <h3 className="font-semibold">Complete Your Profile</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Add more details to your profile to get the most out of our platform.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">🚀</div>
                <h3 className="font-semibold">Explore Features</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Discover all the powerful features available in your current plan.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">📈</div>
                <h3 className="font-semibold">Track Progress</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Monitor your usage and subscription status in real-time.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
