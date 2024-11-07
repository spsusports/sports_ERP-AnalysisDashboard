import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarPlot = ({ dataMatrix, graphTitle, xAxisLabel, yAxisLabel, legendColor, width = 400, height = 400 }) => {
  // Prepare data for the chart
  const data = dataMatrix.map(([x, y]) => ({ x, y }));

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        
        {/* X and Y Axis Labels */}
        <XAxis dataKey="x" label={{ value: xAxisLabel, position: 'insideBottomRight', offset: -5 }} />
        <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', offset: 10 }} />
        
        <Tooltip />
        <Legend />
        
        {/* Bar Plot */}
        <Bar name={graphTitle} dataKey="y" fill={legendColor} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarPlot;

