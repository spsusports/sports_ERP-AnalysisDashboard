import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import GoBackButton from "./GoBackButton";

function AnalysisNavBar() {
  return (
    <>
      <div
        className="d-flex flex-column rounded bg-light p-3 shadow-sm"
        style={{ width: "250px" }}
      >
        <h5 className="h5 text-center">Analysis Menu</h5>
        <ul className="nav flex-column gap-2 mt-2">
          <li className="nav-item p-1 bg-secondary bg-opacity-25 rounded">
            <Link to="https://sportserp-admin.spsu.ac.in/admin" className="nav-link text-dark">
              <i className="bi bi-house me-2"></i>Go Home
            </Link>
          </li>
          <GoBackButton></GoBackButton>
          <li className="nav-item p-1 bg-secondary bg-opacity-25 rounded">
            <Link to="/GeneralAnalysis" className="nav-link text-dark">
              <i className="bi bi-graph-up me-2"></i>General Analysis
            </Link>
          </li>
          <li className="nav-item p-1 bg-secondary bg-opacity-25 rounded">
            <Link to="/SportsDemands" className="nav-link text-dark">
              <i className="bi bi-bar-chart me-2"></i>Sports Demand
            </Link>
          </li>
          <li className="nav-item p-1 bg-secondary bg-opacity-25 rounded">
            <Link to="/EquCondition" className="nav-link text-dark">
              <i className="bi bi-bar-chart me-2"></i>Item Monitoring
            </Link>
          </li>
          <li className="nav-item p-1 bg-secondary bg-opacity-25 rounded">
            <Link to="/analysis4" className="nav-link text-dark">
              <i className="bi bi-pie-chart me-2"></i>Predicted
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AnalysisNavBar;
