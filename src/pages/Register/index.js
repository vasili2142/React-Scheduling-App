import { useState } from "react";
import PageContainer from "../../components/PageContainer";
import Form from "react-bootstrap/Form";
import * as database from "../../database";
import { useNavigate } from "react-router-dom";

export default function UserRegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  /**
   * Handles the user registration process.
   * Prevents the form from submitting if the passwords do not match.
   * If passwords match, it calls the database.userRegister function to register the user.
   *
   * @param {Object} e - The event object from the form submission.
   */
  const handleRegisterUser = (e) => {
    // e.preventDefault();
    if (password === passwordConfirm) {
      database.userRegister(email, password, displayName);
      console.log("Register Success");
      navigate('/user');
    } else {
      alert("passwords don't match");
    }
  };

  return (
    <PageContainer title="Register">
      <Form onSubmit={handleRegisterUser}>
        {/* Email input field */}
        <Form.Group className="mb-3 register-email" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)} // Updates the email state on change
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3 user-display-name" controlId="formGroupDisplayName">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            onChange={(e) => setDisplayName(e.target.value)} // Updates the email state on change
            type="text"
            placeholder="Enter Display Name"
          />
        </Form.Group>

        {/* Password input field */}
        <Form.Group
          className="mb-3 register-password"
          controlId="formGroupPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)} // Updates the password state on change
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        {/* Confirm password input field */}
        <Form.Group
          className="mb-3 confirm-register-password"
          controlId="formGroupPasswordConfirm"
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={(e) => setPasswordConfirm(e.target.value)} // Updates the password confirmation state on change
            type="password"
            placeholder="Re-enter Password"
          />
        </Form.Group>

        <button>Register</button>
      </Form>
    </PageContainer>
  );
}
