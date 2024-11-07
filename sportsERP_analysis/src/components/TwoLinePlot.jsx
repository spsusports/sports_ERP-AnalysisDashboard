import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TwoLinePlot = ({ dataMatrix, graphTitle, xAxisLabel, yAxisLabel, lineColors = ['#8884d8', '#82ca9d'], width = 400, height = 400 }) => {
  // Prepare data for the chart
  const data = dataMatrix.map(([x, y1, y2]) => ({ x, y1, y2 }));

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        
        {/* X and Y Axis Labels */}
        <XAxis dataKey="x" label={{ value: xAxisLabel, position: 'insideBottomRight', offset: -5 }} />
        <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', offset: 10 }} />
        
        <Tooltip />
        <Legend />
        
        {/* First Line */}
        <Line name={`${graphTitle} - Line 1`} type="monotone" dataKey="y1" stroke={lineColors[0]} strokeWidth={2} dot={true} />
        
        {/* Second Line */}
        <Line name={`${graphTitle} - Line 2`} type="monotone" dataKey="y2" stroke={lineColors[1]} strokeWidth={2} dot={true} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TwoLinePlot;
