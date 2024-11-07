// GeneralAnalysis.js

import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "./../firebaseConfig";
import Student2d from "./Student2d";
import DelayedReturnPieChart from "../analysis/DelayedReturnPieChart";

function GeneralAnalysis() {
  const [topUsers, setTopUsers] = useState([]);
  const [delayedReturnsData, setDelayedReturnsData] = useState([]);
  const [highlightedStudents, setHighlightedStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "requests"));
      const requestCounts = {};
      const studentDelays = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const orgName = data.org_name;
        const returnDate = data.returnDate?.toDate();
        const actualReturnTime = data.act_returntime?.toDate();

        if (orgName && returnDate && actualReturnTime) {
          // Count the requests for the student
          requestCounts[orgName] = (requestCounts[orgName] || 0) + 1;

          // Calculate delay
          if (actualReturnTime > returnDate) {
            const delayDays = Math.ceil(
              (actualReturnTime - returnDate) / (1000 * 3600 * 24) // Convert ms to days
            );
            studentDelays[orgName] = studentDelays[orgName] || [];
            studentDelays[orgName].push(delayDays);
          }
        }
      });

      // Sort top 7 users by request count
      const sortedUsers = Object.entries(requestCounts)
        .map(([orgName, count]) => ({ orgName, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 7);
      setTopUsers(sortedUsers);

      // Calculate delayed return stats
      const delayCounts = Object.entries(studentDelays).map(
        ([orgName, delays]) => {
          const delayCount = delays.length;
          const avgDelay =
            delays.reduce((sum, delay) => sum + delay, 0) / delayCount;
          return { orgName, delayCount, avgDelay: avgDelay.toFixed(2) };
        }
      );

      // Sort by delay count and select top 5
      const sortedDelays = delayCounts
        .sort((a, b) => b.delayCount - a.delayCount)
        .slice(0, 7);
      setDelayedReturnsData(sortedDelays);

      // Find common students between top requests and delayed returns
      const topUserNames = new Set(sortedUsers.map((user) => user.orgName));
      const delayedStudentNames = new Set(
        sortedDelays.map((student) => student.orgName)
      );

      // Get the intersection of both sets
      const commonStudents = [...topUserNames].filter((name) =>
        delayedStudentNames.has(name)
      );
      setHighlightedStudents(commonStudents);
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      <h5 className="h5 pb-2 border-bottom border-2 mb-3 border-info">
        General Analysis
      </h5>

      <div className="w-100 d-flex justify-content-between gap-3">
        {/* Top 7 students with most requests */}
        <div className="w-50">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="card-title mb-0">
                Top 7 Students With Most Requests
              </h5>
            </div>
            <div className="card-body">
              {topUsers.length > 0 ? (
                <Student2d
                  dataMatrix={topUsers.map((user) => [
                    user.orgName,
                    user.count,
                  ])}
                  Xtitle="Student Name"
                  Ytitle="Request Count"
                />
              ) : (
                <p className="text-muted">Loading data...</p>
              )}
            </div>
          </div>
        </div>

        {/* Delayed Return Analysis */}
        <div className="w-100">
          <div>
            <div className="card shadow-sm">
              <div className="card-header bg-warning text-white">
                <h5 className="card-title mb-0">
                  Top 7 Students with Most Delayed Returns
                </h5>
              </div>
              <div className="card-body">
                {delayedReturnsData.length > 0 ? (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Student Name</th>
                        <th>Delayed Returns Count</th>
                        <th>Average Delay (Days)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {delayedReturnsData.map((student, index) => (
                        <tr
                          key={index}
                          className={
                            highlightedStudents.includes(student.orgName)
                              ? "table-warning"
                              : ""
                          }
                        >
                          <td>{student.orgName}</td>
                          <td>{student.delayCount}</td>
                          <td>{student.avgDelay}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-muted">Loading delayed return data...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralAnalysis;
