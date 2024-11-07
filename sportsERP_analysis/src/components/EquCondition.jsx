import React from "react";
import ConditionMonitoring from "../analysis/ConditionMonitoring";

export default function EquCondition() {

  return (
    <>
      <div className="d-flex gap-2">
        <div className="Main-graph container-fluid rounded-2">
          <h5 className="h5 pb-2 border-bottom border-2 border-info">
            Equipment Condition Monitoring
          </h5>
          <div className="d-flex w-100 justify-content-between">
            <ConditionMonitoring></ConditionMonitoring>
          </div>
        </div>
      </div>
    </>
  );
}
