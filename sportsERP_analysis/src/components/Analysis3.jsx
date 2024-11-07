import React from "react";
import GroupedBarChart from "./GroupedBarChart";


export default function Analysis3() {
  const dataMatrix = [
    [1, 10, "Group A"],
    [1, 20, "Group B"],
    [2, 15, "Group A"],
    [2, 25, "Group B"],
    [3, 20, "Group A"],
    [3, 30, "Group B"],
  ];
  return (
    <>
      <div className="d-flex gap-2">
        <div className="Main-graph container-fluid rounded-2">
          <GroupedBarChart
            dataMatrix={dataMatrix}
            graphTitle="My Grouped Bar Chart"
            xAxisLabel="X Axis"
            yAxisLabel="Y Axis"
            width={1180}
            legendColors={{ "Group A": "#82ca9d", "Group B": "#8884d8" }}
          />
        </div>
      </div>
    </>
  );
}
