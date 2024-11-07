import React from "react";
import RequestTrendAnalysis from "../analysis/RequestTrendAnalysis";

function Analysis4() {

  return (
    <>
      <div className="d-flex gap-2">
        <div className="Main-graph container-fluid rounded-2">
          <h5 className="h5 pb-2 border-bottom border-2 border-info">
            Predicted Analysis
          </h5>
          <div className="container-fluid d-flex flex-column rounded border border-gary p-2 px-3">
            <h5 className="h5 m-0 mb-2">Request Trends OverTime</h5>
            <RequestTrendAnalysis></RequestTrendAnalysis>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analysis4;
