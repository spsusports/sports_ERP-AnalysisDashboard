import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend, Label } from 'recharts';

const PieChartComponent = ({ dataMatrix, graphTitle, legendColors = [] }) => {
  // Aggregate smaller segments into an "Other" category
  const threshold = 5; // Percentage threshold to group as "Other"
  let otherTotal = 0;
  const filteredData = dataMatrix.reduce((acc, [name, value, description]) => {
    if (value < threshold) {
      otherTotal += value;
    } else {
      acc.push({ name, value, description });
    }
    return acc;
  }, []);

  // Add "Other" category if there’s any aggregated percentage
  if (otherTotal > 0) {
    filteredData.push({ name: 'Other', value: otherTotal, description: 'Other sports' });
  }

  return (
    <ResponsiveContainer width={500} height={300}>
      <PieChart>
        <Pie
          data={filteredData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          labelLine={false}
        >
          {/* Display colors for each segment */}
          {filteredData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={legendColors[index % legendColors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name, props) => [value + '%', props.payload.description]} />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
