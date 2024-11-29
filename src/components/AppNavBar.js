import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

export default function AppNavBar() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-text">
            <i className="fas fa-dumbbell me-2"></i>Fitness App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!user && (
                <>
                  <Nav.Link as={Link} to="/register" className="nav-link-text">
                    <i className="fas fa-user-plus me-2"></i>Register
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login" className="nav-link-text">
                    <i className="fas fa-sign-in-alt me-2"></i>Login
                  </Nav.Link>
                </>
              )}
              {user && (
                <>
                  <Nav.Link as={Link} to="/workouts" className="nav-link-text">
                    <i className="fas fa-running me-2"></i>Workouts
                  </Nav.Link>
                  <Nav.Link as={Link} to="/logout" className="nav-link-text">
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
