import React from "react";
import PieChartComponent from "./PieChartComponent";

function Analysis4() {
  const dataMatrix = [
    ["Category A", 40, "This is Category A"],
    ["Category B", 30, "This is Category B"],
    ["Category C", 20, "This is Category C"],
    ["Category D", 10, "This is Category D"],
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
      </div>
    </>
  );
}

export default Analysis4;
