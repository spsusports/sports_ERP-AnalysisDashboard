import React from 'react'
import BarPlot from './BarPlot';
import ScatterPlot from './ScatterPlot';

export default function Analysis2() {

  const generateRandomData = (numPoints) => {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
      const x = Math.floor(Math.random() * 100); // random x between 0 and 99
      const y = Math.floor(Math.random() * 100); // random y between 0 and 99
      data.push([x, y]);
    }
    return data;
  };

  const dataMatrix = generateRandomData(250);

  return (
    <>
      <div className="d-flex gap-2">
        <div className="Main-graph container-fluid rounded-2">
          <BarPlot
            dataMatrix={dataMatrix}
            graphTitle="My Custom Line Plot"
            xAxisLabel="X Values"
            yAxisLabel="Y Values"
            width={1180}
            legendColor="lightblue"
          ></BarPlot>
        </div>
      </div>
    </>
  )
}
