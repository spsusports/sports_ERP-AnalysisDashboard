import React from "react";
import RequestTrendAnalysis from "../analysis/RequestTrendAnalysis";
import DelayedReturnPieChart from "../analysis/DelayedReturnPieChart";

function Analysis4() {
  return (
    <>
      <div className="d-flex gap-2">
        <div className="Main-graph container-fluid rounded-2">
          <h5 className="h5 pb-2 border-bottom border-2 border-info">
            Predicted Analysis
          </h5>
          <div className="d-flex">
            <div className="d-flex justify-content-between w-100">
              <div>
                <div className="card shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h5 className="card-title mb-0">Request Trends OverTime</h5>
                  </div>
                  <div className="card-body">
                    <RequestTrendAnalysis></RequestTrendAnalysis>
                  </div>
                </div>
              </div>

              <div>
                {/* Return Time Compliance */}
                <div>
                  <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                      <h5 className="card-title mb-0">
                        Return Time Compliance
                      </h5>
                    </div>
                    <div className="card-body">
                      <DelayedReturnPieChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analysis4;
