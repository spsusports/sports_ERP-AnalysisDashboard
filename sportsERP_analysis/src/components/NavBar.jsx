import React from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from './../assets/spsulogo.png';
import jklogo from './../assets/jkcementlogo.png';

export default function NavBar() {
  return (
    <>
      <Navbar className="shadow-sm">
        <div className="container-fluid">
          <Navbar.Brand href="#home" className="d-flex justify-content-between w-100 align-item-center">
            <img
              alt=""
              src={logo}
              height="45"
              className="d-inline-block align-top"
            />
            <h3 className="text-primary m-1 p-0">SPORTS ERP ANALYTICS DASHBOARD</h3>
            <img
              alt=""
              src={jklogo}
              height="45"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </div>
      </Navbar>
    </>
  );
}
