const sdk = require('node-appwrite');

async function setupAppwrite(projectId, apiKey) {
  // Initialize Appwrite client
  const client = new sdk.Client();
  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId)
    .setKey(apiKey);

  const databases = new sdk.Databases(client);
  const teams = new sdk.Teams(client);

  try {
    // Create main database
    const database = await databases.create(
      sdk.ID.unique(),
      'LaunchBase'
    );

    // Create Users Collection
    const usersCollection = await databases.createCollection(
      database.$id,
      'users',
      'Users',
      [
        sdk.Permission.create(sdk.Role.any()),
        sdk.Permission.read(sdk.Role.any()),
        sdk.Permission.update(sdk.Role.any()),
        sdk.Permission.delete(sdk.Role.any())
      ]
    );

    // Create User Attributes
    await databases.createStringAttribute(
      database.$id,
      usersCollection.$id,
      'email',
      255,
      true
    );

    await databases.createStringAttribute(
      database.$id,
      usersCollection.$id,
      'name',
      255,
      true
    );

    await databases.createStringAttribute(
      database.$id,
      usersCollection.$id,
      'subscriptionStatus',
      50,
      false,
      'inactive'
    );

    await databases.createStringAttribute(
      database.$id,
      usersCollection.$id,
      'subscriptionTier',
      50,
      false,
      'free'
    );

    await databases.createStringAttribute(
      database.$id,
      usersCollection.$id,
      'customerId',
      255,
      false
    );

    await databases.createDateAttribute(
      database.$id,
      usersCollection.$id,
      'subscriptionEndDate',
      false
    );

    // Create Subscriptions Collection
    const subscriptionsCollection = await databases.createCollection(
      database.$id,
      'subscriptions',
      'Subscriptions',
      [
        sdk.Permission.create(sdk.Role.any()),
        sdk.Permission.read(sdk.Role.any()),
        sdk.Permission.update(sdk.Role.any()),
        sdk.Permission.delete(sdk.Role.any())
      ]
    );

    // Create Subscription Attributes
    await databases.createStringAttribute(
      database.$id,
      subscriptionsCollection.$id,
      'userId',
      255,
      true
    );

    await databases.createStringAttribute(
      database.$id,
      subscriptionsCollection.$id,
      'planId',
      255,
      true
    );

    await databases.createStringAttribute(
      database.$id,
      subscriptionsCollection.$id,
      'status',
      50,
      true
    );

    await databases.createStringAttribute(
      database.$id,
      subscriptionsCollection.$id,
      'paymentGateway',
      50,
      true
    );

    await databases.createStringAttribute(
      database.$id,
      subscriptionsCollection.$id,
      'subscriptionId',
      255,
      true
    );

    await databases.createDateAttribute(
      database.$id,
      subscriptionsCollection.$id,
      'startDate',
      true
    );

    await databases.createDateAttribute(
      database.$id,
      subscriptionsCollection.$id,
      'endDate',
      true
    );

    // Create Payments Collection
    const paymentsCollection = await databases.createCollection(
      database.$id,
      'payments',
      'Payments',
      [
        sdk.Permission.create(sdk.Role.any()),
        sdk.Permission.read(sdk.Role.any()),
        sdk.Permission.update(sdk.Role.any()),
        sdk.Permission.delete(sdk.Role.any())
      ]
    );

    // Create Payment Attributes
    await databases.createStringAttribute(
      database.$id,
      paymentsCollection.$id,
      'userId',
      255,
      true
    );

    await databases.createStringAttribute(
      database.$id,
      paymentsCollection.$id,
      'type',
      50,
      true
    );

    await databases.createFloatAttribute(
      database.$id,
      paymentsCollection.$id,
      'amount',
      true
    );

    await databases.createStringAttribute(
      database.$id,
      paymentsCollection.$id,
      'currency',
      10,
      true
    );

    await databases.createStringAttribute(
      database.$id,
      paymentsCollection.$id,
      'status',
      50,
      true
    );

    await databases.createStringAttribute(
      database.$id,
      paymentsCollection.$id,
      'paymentGateway',
      50,
      true
    );

    await databases.createStringAttribute(
      database.$id,
      paymentsCollection.$id,
      'transactionId',
      255,
      true
    );

    // Create indexes
    await databases.createIndex(
      database.$id,
      usersCollection.$id,
      'email_index',
      'key',
      ['email'],
      true
    );

    await databases.createIndex(
      database.$id,
      subscriptionsCollection.$id,
      'user_subscription_index',
      'key',
      ['userId', 'status'],
      false
    );

    console.log('✅ Appwrite setup completed successfully!');
    return {
      databaseId: database.$id,
      collections: {
        users: usersCollection.$id,
        subscriptions: subscriptionsCollection.$id,
        payments: paymentsCollection.$id
      }
    };

  } catch (error) {
    console.error('❌ Error setting up Appwrite:', error);
    throw error;
  }
}

// Usage example:
// setupAppwrite('your-project-id', 'your-api-key')
//   .then(console.log)
//   .catch(console.error);

module.exports = setupAppwrite; 