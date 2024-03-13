const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.removeExpiredDocuments = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
    const now = Date.now();
    const cutoff = now - 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const collections = ['users', 'meetings', 'projects'];

    const deletePromises = collections.map(async collection => {
        const expiredDocs = await admin.firestore().collection(collection).where('createdAt', '<', cutoff).get();

        const batch = admin.firestore().batch();
        expiredDocs.forEach(doc => {
            batch.delete(doc.ref);
        });

        return batch.commit();
    });

    await Promise.all(deletePromises);

    return null;
});