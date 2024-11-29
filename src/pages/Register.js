import { useState, useEffect, useContext } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { toast } from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    fetch(`https://fitnessapp-api-ln8u.onrender.com/users/register`, {
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
        if (data.message === "Registered Successfully") {
          setEmail("");
          setPassword("");

          toast.success("Registration successful!");

          navigate("/login");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      });
  }

  useEffect(() => {
    const isFormValid = email.includes("@") && password.length >= 8;
    setIsActive(isFormValid);
  }, [email, password]);

  return (
    <Container className="d-flex justify-content-center align-items-center register-container">
      <Card className="register-card p-4 shadow-lg">
        <h1 className="text-center mb-4">Create an Account</h1>
        <Form onSubmit={registerUser}>
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
              placeholder="Create a strong password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-muted">
              Password must be at least 8 characters long.
            </Form.Text>
          </Form.Group>

          <Button
            className="w-100"
            variant="primary"
            type="submit"
            disabled={!isActive}
          >
            Register
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login here
            </Link>
          </p>
        </div>
      </Card>
    </Container>
  );
}
