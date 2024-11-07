import React from 'react'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Predefined color palette
const colorPalette = [
  '#4caf50', '#ff5722', '#2196f3', '#ffc107', '#9c27b0', 
  '#03a9f4', '#e91e63', '#00bcd4', '#8bc34a', '#ffeb3b',
  '#795548', '#673ab7', '#f44336', '#607d8b', '#ff9800',
  '#3f51b5', '#cddc39', '#009688', '#9e9e9e', '#ffccbc'
];

// Helper function to get color from palette by index
const getColorByIndex = (index) => colorPalette[index % colorPalette.length];

const GroupedBarChart = ({ dataMatrix, graphTitle, xAxisLabel, yAxisLabel, legendColors = {}, width = 400, height = 400 }) => {
  // Validate if dataMatrix is an array and has the expected format
  if (!Array.isArray(dataMatrix) || dataMatrix.some(item => !Array.isArray(item) || item.length !== 3)) {
    console.error("Invalid dataMatrix format. Expected an array of arrays with 3 elements each.");
    return null; // or you can return a fallback UI if desired
  }

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
        
        {/* Grouped Bars with predefined colors */}
        {groups.map((group, index) => (
          <Bar 
            key={group} 
            name={`${graphTitle} - ${group}`} 
            dataKey={group} 
            fill={legendColors[group] || getColorByIndex(index)} // Use predefined color or legend color if provided
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GroupedBarChart;
