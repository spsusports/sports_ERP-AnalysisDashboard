import React from "react";
import ScatterPlot from "./ScatterPlot";
import LinePlot from "./LinePlot";

function Analysis1() {
  // Generate 500 random data points
  const generateRandomData = (numPoints) => {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
      const x = Math.floor(Math.random() * 100); // random x between 0 and 99
      const y = Math.floor(Math.random() * 100); // random y between 0 and 99
      data.push([x, y]);
    }
    return data;
  };

  const dataMatrix = generateRandomData(200); // 500 random data points

  return (
    <>
      <div className="d-flex gap-2">
        <div className="Main-graph container-fluid rounded-2">
          <LinePlot
            dataMatrix={dataMatrix}
            graphTitle="My Custom Line Plot"
            xAxisLabel="X Values"
            yAxisLabel="Y Values"
            width={650}
          ></LinePlot>
        </div>
        <div className="otherPlot container-fluid rounded-2">
        <ScatterPlot
            dataMatrix={dataMatrix}
            graphTitle="My Custom Scatter Plot"
            xAxisLabel="X Values"
            width={500}
            yAxisLabel="Y Values"
          ></ScatterPlot>
        </div>
      </div>
    </>
  );
}

export default Analysis1;
