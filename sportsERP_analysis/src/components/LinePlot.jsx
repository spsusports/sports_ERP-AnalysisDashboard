import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LinePlot = ({ dataMatrix, graphTitle, xAxisLabel, yAxisLabel, legendColor,width = 400, height = 400  }) => {
  // Prepare data for the chart
  const data = dataMatrix.map(([x, y]) => ({ x, y }));

  // Sort data by x-value to ensure the points are connected in order
  const sortedData = data.sort((a, b) => a.x - b.x);

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={sortedData}>
        <CartesianGrid strokeDasharray="3 3" />
        
        {/* X and Y Axis Labels */}
        <XAxis dataKey="x" type="number" label={{ value: xAxisLabel, position: 'insideBottomRight', offset: -5 }} />
        <YAxis dataKey="y" type="number" label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', offset: 10 }} />
        
        <Tooltip />
        <Legend />
        
        {/* Line Plot */}
        <Line name={graphTitle} dataKey="y" stroke={legendColor} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LinePlot;


{/* <LinePlot dataMatrix={dataMatrix} graphTitle="My Custom Scatter Plot"
        xAxisLabel="X Values"
        yAxisLabel="Y Values"
        legendColor="#82ca9d"></LinePlot> */}