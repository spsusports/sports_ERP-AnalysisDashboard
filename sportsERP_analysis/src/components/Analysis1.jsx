// Analysis1.js

import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import BarPlot from "./BarPlot"; // Import the BarPlot component
import { db } from "./../firebaseConfig";
import Student2d from "./Student2d";
import DelayedReturnPieChart from "../analysis/DelayedReturnPieChart";

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
        .slice(0, 7); // Get top 7

      setTopUsers(sortedUsers);
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      <h5 className="h5 pb-2 border-bottom border-2 border-info">
          Demand Analysis for Sports and Equipment 
        </h5>
      
      <div className="row">
        {/* Top 7 students with most requests */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="card-title mb-0">Top 7 Students With Most Requests</h5>
            </div>
            <div className="card-body">
              {topUsers.length > 0 ? (
                <Student2d
                  dataMatrix={topUsers.map((user) => [user.orgName, user.count])}
                  Xtitle="Student Name"
                  Ytitle="Request Count"
                />
              ) : (
                <p className="text-muted">Loading data...</p>
              )}
            </div>
          </div>
        </div>

        {/* Return Time Compliance */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Return Time Compliance</h5>
            </div>
            <div className="card-body">
              <DelayedReturnPieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis1;
