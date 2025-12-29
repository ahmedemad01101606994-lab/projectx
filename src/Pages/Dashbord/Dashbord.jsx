import React from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
function Dashbord() {
  return (
    <div className="vh-100 d-flex w-100 mt-2">
      <div className="sidebar bg-dark text-white p-3 min-vh-100">
        <h4 className="text-center mb-4">Admin Panel</h4>

        <Nav className="flex-column gap-2">
          <Nav.Link as={NavLink} to="/Dashbord" end className="text-white">
            <FaTachometerAlt /> Dashboard
          </Nav.Link>

          <Nav.Link as={NavLink} to="/Dashbord/products" className="text-white">
            <FaBox /> Products
          </Nav.Link>

          <Nav.Link as={NavLink} to="/Dashbord/Users" className="text-white">
            <FaUsers /> Users
          </Nav.Link>

          <Nav.Link as={NavLink} to="/Dashbord/carts" className="text-white">
            <FaShoppingCart /> Carts
          </Nav.Link>

          <hr className="border-secondary" />

          <Nav.Link as={Link} to="/" className="text-danger mt-auto">
            <FaSignOutAlt /> Logout
          </Nav.Link>
        </Nav>
      </div>
      <div className=" w-75  mx-auto h-100">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Dashbord;
