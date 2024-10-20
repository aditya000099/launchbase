import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../lib/appwrite';
import AccountForm from '../components/AccountForm';

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async (updatedData) => {
    try {
      await updateUserProfile(updatedData);
      setUser({ ...user, ...updatedData });
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      {loading ? (
        <p>Loading user profile...</p>
      ) : (
        <AccountForm user={user} onSubmit={handleUpdateProfile} />
      )}
    </div>
  );
};

export default AccountPage;
