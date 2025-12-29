import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 pt-4">
      <Container>
        <Row className="mb-4">
          {/* About Section */}
          <Col md={4} className="mb-3">
            <h5>About Us</h5>
            <p>
              We are a leading e-commerce platform providing the best products
              at unbeatable prices. Your satisfaction is our priority.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link
                href="/shop"
                className="text-light"
                style={{ transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.target.style.color = "#0d6efd")}
                onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
              >
                Shop
              </Nav.Link>
              <Nav.Link
                href="/about"
                className="text-light"
                style={{ transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.target.style.color = "#0d6efd")}
                onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
              >
                About
              </Nav.Link>
              <Nav.Link
                href="/contact"
                className="text-light"
                style={{ transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.target.style.color = "#0d6efd")}
                onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
              >
                Contact
              </Nav.Link>
              <Nav.Link
                href="/faq"
                className="text-light"
                style={{ transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.target.style.color = "#0d6efd")}
                onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
              >
                FAQ
              </Nav.Link>
            </Nav>
          </Col>

          {/* Social Media */}
          <Col md={4} className="mb-3">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3">
              {[
                {
                  icon: <FaFacebookF size={20} />,
                  url: "https://facebook.com",
                },
                { icon: <FaTwitter size={20} />, url: "https://twitter.com" },
                {
                  icon: <FaInstagram size={20} />,
                  url: "https://instagram.com",
                },
                { icon: <FaLinkedin size={20} />, url: "https://linkedin.com" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-light"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => (e.target.style.color = "#0d6efd")}
                  onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <Row>
          <Col className="text-center py-3 border-top border-secondary">
            &copy; {new Date().getFullYear()} E-Commerce Inc. All rights
            reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
