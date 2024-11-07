import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  fetchRequests,
  calculateConditionMonitoring,
} from "./../hooks/firebaseHelper";

const ConditionMonitoring = () => {
  const [conditionData, setConditionData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const requests = await fetchRequests();
      const conditionCounts = await calculateConditionMonitoring(requests);
      setConditionData(conditionCounts);
    };

    getData();
  }, []);

  if (!conditionData) {
    return <div>Loading...</div>;
  }

  // Prepare the data for the combined chart
  const chartData = [
    {
      condition: "New",
      issued: conditionData.issued.new,
      returned: conditionData.returned.new,
    },
    {
      condition: "Good",
      issued: conditionData.issued.good,
      returned: conditionData.returned.good,
    },
    {
      condition: "Normal",
      issued: conditionData.issued.normal,
      returned: conditionData.returned.normal,
    },
    { condition: "Broken", issued: 0, returned: conditionData.returned.broken }, // Handle broken condition separately
    { condition: "Lost", issued: 0, returned: conditionData.returned.lost }, // Handle lost condition separately
    {
      condition: "Need Repair",
      issued: 0,
      returned: conditionData.returned.need_repair,
    }, // Handle need repair condition separately
  ];

  // Generate degradation data dynamically from the degradation object
  const degradationData = Object.keys(conditionData.degradation).map((key) => {
    const transition = key.replace(/([a-z])([A-Z])/g, "$1 $2"); // Format transition like "Good to Normal"
    return { transition, count: conditionData.degradation[key] };
  });

  return (
    <div className="d-flex w-100">
      <div className="d-flex w-100 justify-content-between gap-3">
        <div>
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Condition Monitoring Analysis</h5>
            </div>
            <div className="card-body">
              <ResponsiveContainer width={630} height={370}>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="condition" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  {/* Bars for Issued and Returned Items */}
                  <Bar dataKey="issued" fill="#8884d8" name="Issued" />
                  <Bar dataKey="returned" fill="#82ca9d" name="Returned" />

                  {/* Line for Tracking Trends (e.g., total returned items) */}
                  <Line
                    type="monotone"
                    dataKey="returned"
                    stroke="#ff7300"
                    name="Return Trend"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div>
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Degradation Transitions</h5>
            </div>
            <div className="card-body">
              <ResponsiveContainer width={500} height={370}>
                <BarChart
                  data={degradationData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="transition" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  {/* Bars for Degradation Transitions */}
                  <Bar dataKey="count" fill="#ff7300" name="Degradation" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionMonitoring;
