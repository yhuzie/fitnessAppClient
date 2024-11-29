import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero-section text-center">
        <div className="container px-3 py-5">
          <h1 className="hero-title">Welcome to <span>Fitness App</span></h1>
          <p className="lead hero-subtitle">Your journey to fitness starts here.</p>
          <div className="button-group">
            <Link to="/register" className="btn btn-primary btn-lg mx-2">
              <i className="fas fa-user-plus me-2"></i>Register
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-lg mx-2">
              <i className="fas fa-sign-in-alt me-2"></i>Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
