import { db } from './../firebaseConfig'; // Import Firestore from your config file
import { collection, getDocs } from "firebase/firestore"; // Import the modular Firestore methods

// Helper function to get the Firestore data
export const fetchRequests = async () => {
  try {
    // Use the Firestore v9+ modular approach
    const snapshot = await getDocs(collection(db, 'requests'));
    let requestsCollection = {};

    snapshot.forEach(doc => {
      const data = doc.data();
      const formattedData = {
        ...data,
        reqdate: data.reqdate?.toDate(), // Convert Firestore timestamp to JS Date object
      };
      requestsCollection[doc.id] = formattedData;
    });

    return requestsCollection;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
