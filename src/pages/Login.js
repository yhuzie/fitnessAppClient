import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  function loginUser(e) {
    e.preventDefault();

    fetch(`https://fitnessapp-api-ln8u.onrender.com/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access) {
          localStorage.setItem("token", data.access);
          setUser({ email });

          setEmail("");
          setPassword("");

          navigate("/Workouts");
          toast.success("Login successful!");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else if (data.message || data.error) {
          toast.error("Login failed. Please try again.");
        }
      })
      .catch((error) => {
        toast.error("Login failed. Please try again.", error);
      });
  }

  return (
    <Container className="d-flex justify-content-center align-items-center login-container">
      <Card className="login-card p-4 shadow-lg">
        <h1 className="text-center mb-4">Welcome Back!</h1>
        <Form onSubmit={loginUser}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            className="w-100"
            variant="primary"
            type="submit"
            disabled={!isActive}
          >
            Login
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <Button
              variant="link"
              onClick={() => navigate("/register")}
              className="text-primary"
            >
              Sign up now
            </Button>
          </p>
        </div>
      </Card>
    </Container>
  );
}
