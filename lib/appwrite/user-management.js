import { databases, account } from '../appwrite';
import { ID } from 'appwrite';

export async function createUserDocument(userId, userData) {
  try {
    return await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      'users',
      userId,
      {
        name: userData.name,
        email: userData.email,
        subscriptionTier: userData.subscriptionTier || 'free',
        subscriptionStatus: userData.subscriptionStatus || 'inactive',
        customerId: userData.customerId || null,
        subscriptionEndDate: userData.subscriptionEndDate || null
      }
    );
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
}

export async function getUserProfile(userId) {
  try {
    return await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      'users',
      userId
    );
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function updateUserSubscription(userId, subscriptionData) {
  try {
    // Update user document
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      'users',
      userId,
      {
        subscriptionTier: subscriptionData.tier,
        subscriptionStatus: 'active',
        customerId: subscriptionData.customerId,
        subscriptionEndDate: subscriptionData.endDate
      }
    );

    // Create subscription record
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      'subscriptions',
      ID.unique(),
      {
        userId,
        planId: subscriptionData.planId,
        status: 'active',
        paymentGateway: subscriptionData.paymentGateway,
        subscriptionId: subscriptionData.subscriptionId,
        startDate: new Date().toISOString(),
        endDate: subscriptionData.endDate
      }
    );
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

export async function recordPayment(paymentData) {
  try {
    return await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      'payments',
      ID.unique(),
      {
        userId: paymentData.userId,
        type: paymentData.type,
        amount: paymentData.amount,
        currency: paymentData.currency,
        status: paymentData.status,
        paymentGateway: paymentData.paymentGateway,
        transactionId: paymentData.transactionId
      }
    );
  } catch (error) {
    console.error('Error recording payment:', error);
    throw error;
  }
} 