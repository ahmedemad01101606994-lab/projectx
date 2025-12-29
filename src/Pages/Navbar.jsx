import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./Logout/Logout";
import { useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { Form } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

function Header({ theme, setTheme }) {
  const [search, setSearch] = useState("");
  const islogined = useSelector((state) => state.user.islogined);
  const go = useNavigate();

  return (
    <div data-bs-theme={theme}>
      <Navbar expand="lg" variant={theme} bg={theme} className="">
        <Container className="">
          <Navbar.Brand as={Link} to="/">
            E-commerce
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className=" justify-content-between ">
            <Nav>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/products">
                products
              </Nav.Link>
              <Nav.Link as={Link} to="/Cart">
                Cart
              </Nav.Link>
              <Nav.Link as={Link} to="/Dashbord">
                Dashbord
              </Nav.Link>

              {theme === "light" ? (
                <Button onClick={() => setTheme("dark")}>
                  <MdDarkMode />
                </Button>
              ) : (
                <Button onClick={() => setTheme("light")}>
                  <CiLight />
                </Button>
              )}

              <Form className=" ms-3 sreach d-flex justify-content-between align-items-center">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  id="search"
                  onChange={(ev) => {
                    if (ev.target.value === "") {
                      go("/");
                    } else {
                      console.log(ev.target.value);
                      go(`/sreach/${ev.target.value}`);
                      ev.target.value = "";
                    }
                  }}
                />
              </Form>
            </Nav>
            <div>
              {/* select islogined from userslice =>useselector */}
              {islogined ? (
                <Logout />
              ) : (
                <Button className="m-1" as={Link} to="/Login">
                  <CiLogin />
                  <FaRegUser />
                  login
                </Button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
