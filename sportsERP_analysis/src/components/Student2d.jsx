import React from "react";

const Student2d = ({ dataMatrix, Xtitle, Ytitle }) => {
  // Map the dataMatrix into an array of objects with x and y properties
  const data = dataMatrix.map(([x, y]) => ({ x, y }));

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          {/* Table Header */}
          <thead className="bg-light">
            <tr>
              <th className="text-dark">{Xtitle}</th>
              <th className="text-info">{Ytitle}</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {data.map((point, index) => (
              <tr key={index}>
                <td className="text-dark">{point.x}</td>
                <td className="text-dark text-center">{point.y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Student2d;
