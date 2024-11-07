import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const PieChartComponent = ({ dataMatrix, graphTitle, legendColors = [] }) => {
  // Prepare data for the chart
  const data = dataMatrix.map(([x, y, z]) => ({ name: x, value: y, description: z }));

  return (
    <ResponsiveContainer width={400} height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label={(entry) => entry.name}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={legendColors[index % legendColors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name, props) => [value + '%', props.payload.description]} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
