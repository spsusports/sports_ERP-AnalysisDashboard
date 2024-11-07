// Analysis1.js

import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import BarPlot from "./BarPlot"; // Import the BarPlot component
import { db } from "./../firebaseConfig";
import Student2d from "./Student2d";
import EqDemand from "../analysis/EqDemand";

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
        .slice(0, 7); // Get top 15

      setTopUsers(sortedUsers);
    }

    fetchData();
  }, []);

  return (
    <div className="d-flex gap-2">
      <div className="Main-graph container-fluid rounded-2">
        <h5 className="h5 pb-2 border-bottom border-2 border-info">
          General Analysis
        </h5>
        <div className="container-fluid d-flex flex-column rounded border border-gary p-2 px-3">
          {/* top 7 student with most request analysis 4 */}
          <div>
            <h6 className="h6 my-2">Top 7 Students Which has Most Requests</h6>
            <div className="d-flex align-items-end">
              {topUsers.length > 0 && (
                <Student2d
                  dataMatrix={topUsers.map((user) => [
                    user.orgName,
                    user.count,
                  ])}
                  Xtitle="Student Name"
                  Ytitle="Request Count"
                />
              )}
              {/* {topUsers.length > 0 && (
              <BarPlot
                dataMatrix={topUsers.map((user) => [user.orgName, user.count])}
                yAxisLabel="Request Count"
                graphTitle="Top 7 Students Which has Most Requests"
                legendColor="#8884d8" // Adjust this color as needed
                width={400}
                height={300}
              />
            )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis1;
