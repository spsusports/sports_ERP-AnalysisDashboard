// src/components/AnalyticsContainer.jsx
import React from 'react';

const AnalyticsContainer = ({ data }) => {
  return (
    <div className="container my-4">
      <h2>Analytics Report</h2>
      <div className="row">
        {/* Display fetched data */}
        <div className="col-md-12 mb-4">
          <h5>Request Summary (First 5 Entries)</h5>
          <ul className="list-group">
            {data.requests.slice(0, 5).map((request, index) => (
              <li key={index} className="list-group-item">
                <strong>{request.name}</strong> (Enrollment No: {request.enrollmentNo})<br />
                Requested: {request.equipment} for {request.sport} on {request.requestDate.toDate().toLocaleDateString()}<br />
                Status: {request.status}
              </li>
            ))}
          </ul>
        </div>

        {/* Placeholder for additional analytics */}
        <div className="col-md-6 mb-4">
          <div className="card p-3">
            <h5 className="card-title">Demand Analysis</h5>
            <p className="card-text">Placeholder for demand analysis by sport and equipment.</p>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card p-3">
            <h5 className="card-title">Return Compliance</h5>
            <p className="card-text">Placeholder for return compliance chart.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsContainer;
