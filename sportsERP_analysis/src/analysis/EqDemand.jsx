import React, { useState, useEffect } from "react";
import { fetchRequests } from "./../hooks/firebaseHelper"; // Import the helper function
import GroupedBarChart from "./../components/GroupedBarChart"; // Import your chart component

// Helper function to get months passed since launch date
const monthsPassed = (launchDate, reqDate) => {
  return (
    (reqDate.getFullYear() - launchDate.getFullYear()) * 12 +
    reqDate.getMonth() -
    launchDate.getMonth()
  );
};

const countItemRequestsBySportAndMonth = (requestCollection, launchDate) => {
    const groupedData = {}; // This will hold the final data
  
    // Loop through request items and accumulate counts
    for (const request of Object.values(requestCollection)) {
      const requestItems = request.requestitems || {};
      const reqDate = new Date(request.reqdate); // Ensure it's a Date object
      const monthsDiff = monthsPassed(launchDate, reqDate);
  
      if (monthsDiff >= 0) {
        const monthName = reqDate.toLocaleString('default', { month: 'long' });
  
        // Loop through each request item and accumulate counts for each sport
        Object.keys(requestItems).forEach(item => {
          const sport = request.game; // Assuming 'game' represents sport type
          const key = `${monthName}-${sport}`;
  
          if (!groupedData[key]) {
            groupedData[key] = {
              month: monthName,
              sport,
              items: {}
            };
          }
  
          // Count how many times an item was requested for this month and sport
          if (!groupedData[key].items[item]) {
            groupedData[key].items[item] = 0;
          }
          groupedData[key].items[item] += 1;
        });
      }
    }
  
    // Convert the grouped data into the required format for the chart
    const data = [];
    const months = [...new Set(Object.values(groupedData).map(item => item.month))]; // Get all unique months
    const sports = [...new Set(Object.values(groupedData).map(item => item.sport))]; // Get all unique sports
  
    months.forEach(month => {
      const monthData = { month }; // Initialize data for each month
      sports.forEach(sport => {
        monthData[sport] = 0; // Initialize request count for each sport
      });
  
      // Add the item counts for each sport in the current month
      Object.values(groupedData).forEach(group => {
        if (group.month === month) {
          const items = group.items;
          const sport = group.sport; // Correctly reference sport here
  
          // Sum up the counts for each item requested in the given sport
          Object.keys(items).forEach(item => {
            monthData[sport] += items[item]; // Add item count to the corresponding sport's total
          });
        }
      });
  
      // Convert monthData into an array of [item, count, sport]
      Object.keys(monthData).forEach(key => {
        if (key !== 'month') {
          // Format the data as [item, count, sport]
          data.push([key, monthData[key], month]); // [item, count, sport]
        }
      });
    });
  
    return data;
  };
  

const EqDemand = () => {
  const [dataMatrix, setDataMatrix] = useState([]);
  const [loading, setLoading] = useState(true);

  // Assuming your launch date is 2024-09-06
  const launchDate = new Date(2024, 8, 6);

  useEffect(() => {
    const fetchData = async () => {
      const requestsCollection = await fetchRequests();
      const analysisData = countItemRequestsBySportAndMonth(
        requestsCollection,
        launchDate
      );
      setDataMatrix(analysisData);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <GroupedBarChart
          dataMatrix={dataMatrix}
          graphTitle=""
          yAxisLabel="Request Count"
          width={1180}
        />
      )}
    </div>
  );
};

export default EqDemand;
