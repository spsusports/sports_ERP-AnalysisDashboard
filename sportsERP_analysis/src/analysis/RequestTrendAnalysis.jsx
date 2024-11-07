import React, { useEffect, useState } from 'react';
import { db } from './../firebaseConfig'; // Import Firebase config
import { collection, getDocs } from 'firebase/firestore';
import ThreeLinePlot from './../components/ThreeLinePlot';
import regression from 'regression'; // Import the regression-js library

const RequestTrendAnalysis = () => {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from Firestore
      const requestsCollection = collection(db, 'requests');
      const requestSnapshot = await getDocs(requestsCollection);
      const requestData = requestSnapshot.docs.map(doc => doc.data());

      // Process data
      const trendData = processRequestData(requestData);
      setPlotData(trendData);
    };

    fetchData();
  }, []);

  // Helper function to get the start of the week
  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 0); // Adjust if Sunday
    return new Date(date.setDate(diff));
  };

  const countRequestsByWeek = (requests, launchDate) => {
    const weekCounts = {};
  
    requests.forEach(request => {
      // Ensure registration_date exists and is a Timestamp
      const reqDate = request.reqdate;
      if (reqDate && reqDate.seconds) { // Check if registration_date and seconds exist
        const reqDateObj = new Date(reqDate.seconds * 1000); // Convert Firestore timestamp to Date
        const startOfWeek = getStartOfWeek(reqDateObj);
        const weeksSinceLaunch = Math.floor((startOfWeek - launchDate) / (7 * 24 * 60 * 60 * 1000)); // Weeks since launch
  
        if (weeksSinceLaunch >= 0) {
          weekCounts[weeksSinceLaunch] = (weekCounts[weeksSinceLaunch] || 0) + 1;
        }
      } else {
        console.warn('Invalid or missing registration_date:', request); // Debugging line
      }
    });
  
    return weekCounts;
  };

  // Function to calculate moving average
  const calculateMovingAverage = (Y1) => {
    return Y1.map((_, i) => Y1.slice(0, i + 1).reduce((a, b) => a + b, 0) / (i + 1));
  };

  // Refactored linear regression function using regression-js
  const calculateLinearRegression = (X, Y, futureWeeks = 2) => {
    // Prepare the data in the format needed by regression-js
    const data = X.map((x, i) => [x, Y[i]]);
    
    // Perform the regression
    const result = regression.linear(data);

    // Get the slope and intercept from the result
    const slope = result.equation[0];
    const intercept = result.equation[1];

    console.log('Slope:', slope, 'Intercept:', intercept);

    // Generate the predicted Y values based on the linear regression line
    const Y_predicted = X.map(x => slope * x + intercept);

    // Add future predictions for the next `futureWeeks` weeks
    for (let i = 1; i <= futureWeeks; i++) {
      Y_predicted.push(slope * (X[X.length - 1] + i) + intercept);  // Extend the x-value for prediction
    }

    return Y_predicted;
  };

  const prepareDataForOutput = (weekCounts) => {
    const sortedWeeks = Object.keys(weekCounts).sort((a, b) => a - b).map(Number); // Ensure numeric week values
    const sortedCounts = sortedWeeks.map(week => weekCounts[week]);
  
    // Calculate moving average
    const movingAvg = calculateMovingAverage(sortedCounts);
  
    // Calculate linear regression predictions
    const futureWeeks = 3;
    const Y3 = calculateLinearRegression(sortedWeeks, sortedCounts, futureWeeks);
    console.log('Predicted Y values:', Y3);  // Debugging line
    
    // Apply normalization to ensure predicted values are in the same range as actual data
    const maxY = Math.max(...sortedCounts);
    const minY = Math.min(...sortedCounts);
    const maxPred = Math.max(...Y3);
    const minPred = Math.min(...Y3);
  
    if (maxPred === minPred) {
      console.warn('Regression predictions have no variance. Skipping normalization.');
      return sortedCounts.map(count => count);  // Return the original counts without scaling
    }
  
    const scalingFactor = (maxY - minY) / (maxPred - minPred);
  
    // Normalize predicted values
    const normalizedY3 = Y3.map(y => (y - minPred) * scalingFactor + minY);
  
    // Ensure no NaN values in the predicted values
    const safeNormalizedY3 = normalizedY3.map(value => (isNaN(value) ? 0 : value));
  
    // Format the data to match [x, y1, y2, y3] format
    const dataMatrix = sortedWeeks.map((week, index) => [
      week, // x value (week number)
      sortedCounts[index], // y1 value (request count)
      movingAvg[index], // y2 value (moving average)
      safeNormalizedY3[index] // y3 value (normalized regression prediction)
    ]);
  
    // Add future predictions for the next 12 weeks to the dataMatrix
    for (let i = 1; i <= futureWeeks; i++) {
      dataMatrix.push([
        sortedWeeks.length + i,  // future week number
        null,  // No actual data for the future
        null,  // No moving average for the future
        safeNormalizedY3[sortedWeeks.length + i - 1]  // Normalized Predicted Y3 value
      ]);
    }
  
    return dataMatrix;
  };
  

  

  // Process request data to extract trends
  const processRequestData = (requests) => {
    const launchDate = new Date('2024-09-06'); // Adjust launch date as needed
    const weekCounts = countRequestsByWeek(requests, launchDate);
    return prepareDataForOutput(weekCounts);
  };

  return (
    <div>
      {plotData ? (
        <ThreeLinePlot
          dataMatrix={plotData}
          graphTitle=""
          yAxisLabel="Request Count"
          width={550}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default RequestTrendAnalysis;
