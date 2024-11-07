import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';

const ScatterPlot = ({ dataMatrix, graphTitle, xAxisLabel, yAxisLabel, legendColor, width = 400, height = 400 }) => {
  // Prepare data for the chart
  const data = dataMatrix.map(([x, y]) => ({ x, y }));

  // Sort data by x-value to ensure the points are connected in order
  const sortedData = data.sort((a, b) => a.x - b.x);

  return (
    <ResponsiveContainer width={width} height={height}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" />
        
        {/* X and Y Axis Labels */}
        <XAxis dataKey="x" type="number" label={{ value: xAxisLabel, position: 'insideBottomRight', offset: -5 }} />
        <YAxis dataKey="y" type="number" label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', offset: 10 }} />
        
        <Tooltip />
        <Legend />
        
        {/* Scatter Plot */}
        <Scatter name={graphTitle} data={sortedData} fill={legendColor} />
        
        {/* Line to connect points */}
        <Line type="linear" dataKey="y" data={sortedData} stroke={legendColor} dot={false} strokeWidth={2} />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterPlot;


{/* <ScatterPlot dataMatrix={dataMatrix} graphTitle="My Custom Scatter Plot"
        xAxisLabel="X Values"
        yAxisLabel="Y Values"
        legendColor="#82ca9d" /> */}