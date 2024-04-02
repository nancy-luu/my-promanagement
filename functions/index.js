
const {onSchedule} = require("firebase-functions/v2/scheduler");
const {logger} = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();


// exports.removeNewlyCreatedDocuments = functions.pubsub.schedule('every 1 hours').onRun(async (context) => {
// // exports.removeExpiredDocuments = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
//     try {
//         const now = Date.now();
//         //const cutoff = now - 24 * 60 * 60 * 1000; // 24 hours in milliseconds
//         const cutoff = now - (60 * 60 * 1000); // 1 hour in milliseconds

//         const collections = ['users', 'meetings', 'projects'];

//         const deletePromises = collections.map(async collection => {
//             const newDocs = await admin.firestore().collection(collection).where('createdAt', '>=', cutoff).get();

//             const batch = admin.firestore().batch();
//             newDocs.forEach(doc => {
//                 console.log(`Deleting document ${doc.id} from collection ${collection}`);
//                 batch.delete(doc.ref);
//             });

//             await batch.commit();

//             return { collection, count: newDocs.size };
//         });

//         await Promise.all(deletePromises);

//         console.log('Expired documents successfully deleted.');
//         console.log('Inside removeNewlyCreatedDocuments');
//         return null;

//     } catch (error) {
//         console.error('Error deleting expired documents:', error);
//         throw new functions.https.HttpsError('internal', 'An error occurred while deleting expired documents.', error);
//     }
// });



// exports.runEveryMinute = onSchedule("every 1 mins", async (event) => {
//     const db = admin.firestore();
//     const meetingRef = db.collection("meetings").doc("2ZNGRAMBwlxCW6GmekH1");

//     try {
//         const meetingSnapshot = await meetingRef.get();
//         if (meetingSnapshot.exists) {

//             const newTitle = "Testing Function"
    
//             await meetingRef.update({ title : newTitle });
//             logger.info("Meeting title updated success")
        
//         } else {
//             logger.info("Meeting not found")
//         }
//     } catch (error) {
//         logger.error("Error updated meeting title: ", error);
//     }

// });



// exports.deleteMeetingsAfterTimestamp = onSchedule("every 10 minutes", async (event) => {
//     const db = admin.firestore();
//     const meetingsCollection = db.collection("meetings");
    
//     try {
//         // March 28th 2024, 3 pm PST
//         const targetTimestamp = new Date("2024-03-28T15:00:00");
        
//         // Query meetings created after the target timestamp
//         const snapshot = await meetingsCollection
//             .where("createdAt", ">", targetTimestamp)
//             .get();
        
//         // Delete each meeting document found in the query result
//         const deletePromises = [];
//         snapshot.forEach((doc) => {
//             deletePromises.push(doc.ref.delete());
//         });
        
//         // Wait for all deletion operations to complete
//         await Promise.all(deletePromises);
        
//         console.log("Documents created after March 28th, 3 pm PST deleted successfully.");
//     } catch (error) {
//         console.error("Error deleting documents:", error);
//     }
// });

exports.deleteDocumentsEveryTwentyFourHours = onSchedule("every 24 hours", async (event) => {
    const db = admin.firestore();
    
    const collections = [
        { name: "users", field: "createdAt" },
        { name: "projects", field: "createdAt" },
        { name: "meetings", field: "createdAt" }
    ];
    
    try {
        // March 28th 2024, 3 pm PST
        const targetTimestamp = new Date("2024-03-28T01:00:00");
        
        for (const collection of collections) {
            const collectionRef = db.collection(collection.name);
            
            const snapshot = await collectionRef
                .where(collection.field, ">", targetTimestamp)
                .get();
            
            const deletePromises = [];
            snapshot.forEach((doc) => {
                deletePromises.push(doc.ref.delete());
            });
            
            await Promise.all(deletePromises);
            
            logger.info(`Expired documents deleted successfully from collection: ${collection.name}`);
        }

    } catch (error) {
        logger.error("Error deleting documents:", error);
    }
});