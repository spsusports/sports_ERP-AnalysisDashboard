import { db } from './../firebaseConfig'; // Import Firestore from your config file
import { collection, getDocs } from "firebase/firestore"; // Import the modular Firestore methods

// Helper function to fetch the Firestore data
export const fetchRequests = async () => {
  try {
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

export const calculateConditionMonitoring = (requests) => {
  const conditionCounts = {
    issued: {
      good: 0,
      normal: 0,
      new: 0,
      other: 0,
    },
    returned: {
      good: 0,
      normal: 0,
      new: 0,
      other: 0,
      broken: 0,        // New condition
      lost: 0,          // New condition
      need_repair: 0,   // New condition
    },
    degradation: {}, // We'll dynamically add degradation transitions
  };

  // Process each request to count conditions
  Object.values(requests).forEach(request => {
    console.log('Processing request:', request); // Log the whole request object to see its structure

    // Check if 'requestitems' exists and is an object
    if (request.requestitems && typeof request.requestitems === 'object') {
      // Loop over each item in the 'requestitems' field
      Object.keys(request.requestitems).forEach(item => {
        const issuedCondition = request.requestitems[item].issued_condition;
        const returnCondition = request.requestitems[item].return_condition;

        console.log(`Item: ${item}, Issued Condition: ${issuedCondition}, Return Condition: ${returnCondition}`);

        // Count issued conditions
        if (issuedCondition) {
          conditionCounts.issued[issuedCondition] = (conditionCounts.issued[issuedCondition] || 0) + 1;
        }

        // Count return conditions, including new ones
        if (returnCondition) {
          conditionCounts.returned[returnCondition] = (conditionCounts.returned[returnCondition] || 0) + 1;
        }

        // Check for all possible degradation transitions
        if (issuedCondition && returnCondition && issuedCondition !== returnCondition) {
          const degradationKey = `${issuedCondition}To${returnCondition.charAt(0).toUpperCase() + returnCondition.slice(1)}`;
          conditionCounts.degradation[degradationKey] = (conditionCounts.degradation[degradationKey] || 0) + 1;
        }
      });
    } else {
      console.log(`No 'requestitems' field found for request with ID: ${request.id}`);
    }
  });

  console.log('Final Condition Counts:', conditionCounts); // Log the final counts
  return conditionCounts;
};





