// Analysis1.js

import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import BarPlot from "./BarPlot"; // Import the BarPlot component
import { db } from "./../firebaseConfig";

function Analysis1() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "requests"));
      const requestCounts = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const orgName = data.org_name;

        if (orgName) {
          requestCounts[orgName] = (requestCounts[orgName] || 0) + 1;
        }
      });

      const sortedUsers = Object.entries(requestCounts)
        .map(([orgName, count]) => ({ orgName, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20); // Get top 15

      setTopUsers(sortedUsers);
    }

    fetchData();
  }, []);

  return (
    <div className="d-flex gap-2">
      <div className="Main-graph container-fluid rounded-2">
        {topUsers.length > 0 && (
          <BarPlot
            dataMatrix={topUsers.map((user) => [user.orgName, user.count])}
            graphTitle="Top 15 Users"
            xAxisLabel="Student Name"
            yAxisLabel="Request Count"
            legendColor="#8884d8" // Adjust this color as needed
            width={500}
            height={400}
          />
        )}
      </div>
    </div>
  );
}

export default Analysis1;
