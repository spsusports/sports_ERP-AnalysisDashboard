import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GroupedBarChart = ({ dataMatrix, graphTitle, xAxisLabel, yAxisLabel, legendColors = {}, width = 400, height = 400 }) => {
  // Group the data by the `x` value, then by the `z` value (group)
  const groupedData = dataMatrix.reduce((acc, [x, y, z]) => {
    if (!acc[x]) acc[x] = { x };
    acc[x][z] = y;
    return acc;
  }, {});

  // Convert grouped data into an array format for recharts
  const data = Object.values(groupedData);

  // Get unique groups from `z` values for legend and bars
  const groups = [...new Set(dataMatrix.map(([, , z]) => z))];

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        
        {/* X and Y Axis Labels */}
        <XAxis dataKey="x" label={{ value: xAxisLabel, position: 'insideBottomRight', offset: -5 }} />
        <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', offset: 10 }} />
        
        <Tooltip />
        <Legend />
        
        {/* Grouped Bars */}
        {groups.map((group) => (
          <Bar 
            key={group} 
            name={`${graphTitle} - ${group}`} 
            dataKey={group} 
            fill={legendColors[group] || '#8884d8'} 
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GroupedBarChart;

{/* <GroupedBarChart 
  dataMatrix={dataMatrix} 
  graphTitle="My Grouped Bar Chart" 
  xAxisLabel="X Axis" 
  yAxisLabel="Y Axis" 
  legendColors={{ 'Group A': '#82ca9d', 'Group B': '#8884d8' }} 
/> */}