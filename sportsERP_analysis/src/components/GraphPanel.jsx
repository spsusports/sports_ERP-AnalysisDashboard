import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Analysis1 from "./Analysis1";
import SportsDemands from "./SportsDemands";
import Analysis3 from "./Analysis3";
import Analysis4 from "./Analysis4";
import AnalysisNavBar from "./AnalysisNavBar";

function GraphPanel() {
  return (
    <>
      <Router>
        <div className="d-flex mt-3 gap-3 ">
          <AnalysisNavBar></AnalysisNavBar>
          <div className="bg-light rounded shadow-sm p-3 border border-gray w-100">
            <Routes>
              <Route path="/analysis1" element={<Analysis1 />} />
              <Route path="/SportsDemands" element={<SportsDemands />} />
              <Route path="/analysis3" element={<Analysis3 />} />
              <Route path="/analysis4" element={<Analysis4 />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default GraphPanel;
