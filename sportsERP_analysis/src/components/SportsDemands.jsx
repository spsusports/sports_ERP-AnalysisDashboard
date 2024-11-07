import React from "react";
import EqDemand from "../analysis/EqDemand";

export default function SportsDemands() {
  return (
    <>
      <div className="d-flex gap-2">
        <div className="Main-graph container-fluid rounded-2">
          <h5 className="h5 pb-2 border-bottom border-2 border-info">
            Demand Analysis for Sports and Equipment
          </h5>
          <div className="container-fluid d-flex flex-column rounded border border-gary p-2 px-3">
            {/* Sports Equpent Demands */}
            <EqDemand></EqDemand>
          </div>
        </div>
      </div>
    </>
  );
}
