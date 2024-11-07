import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap-icons/font/bootstrap-icons.css';

const StateCard = ({ icon, value, label, icolor = 'warning' }) => {
  return (
    <div className="card d-flex flex-row align-items-center p-3 shadow-sm border-0 rounded-3" style={{ minWidth: '200px', maxWidth: '250px', background: 'linear-gradient(90deg, rgba(245, 246, 252, 1) 0%, rgba(255, 255, 255, 1) 100%)' }}>
      <div className="me-3 p-2 bg-light shadow-sm rounded d-flex justify-content-center align-items-center" style={{ width: '50px', height: '50px' }}>
        <i className={`bi ${icon} text-${icolor}`} style={{ fontSize: '30px' }}></i>
      </div>
      <div className="text-center">
        <h2 className="h5 mb-1">{value}</h2>
        <p className="text-muted mb-0">{label}</p>
      </div>
    </div>
  );
};

StateCard.propTypes = {
  icon: PropTypes.string.isRequired, // updated to accept string
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icolor: PropTypes.string,
};

export default StateCard;
