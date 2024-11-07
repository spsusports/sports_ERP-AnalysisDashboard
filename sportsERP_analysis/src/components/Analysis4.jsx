import React from "react";
import PieChartComponent from "./PieChartComponent";
import TwoLinePlot from "./TwoLinePlot";

function Analysis4() {
  const dataMatrix = [
    ["Category A", 40, "This is Category A"],
    ["Category B", 30, "This is Category B"],
    ["Category C", 20, "This is Category C"],
    ["Category D", 10, "This is Category D"],
  ];
  const dataMatrix2 = [
    [1, 10, 15],
    [2, 12, 18],
    [3, 14, 20],
    [4, 16, 25],
    [5, 18, 30],
  ];
  return (
    <>
      <div className="d-flex gap-2">
        <div className="Main-graph container-fluid rounded-2">
          <PieChartComponent
            dataMatrix={dataMatrix}
            graphTitle="My Pie Chart"
            legendColors={["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]}
          />
        </div>
        <div className="Main-graph container-fluid rounded-2">
          <TwoLinePlot
            dataMatrix={dataMatrix2}
            graphTitle="My Two-Line Plot"
            xAxisLabel="X Axis"
            yAxisLabel="Y Axis"
            lineColors={["#8884d8", "#82ca9d"]}
          />
        </div>
      </div>
    </>
  );
}

export default Analysis4;
