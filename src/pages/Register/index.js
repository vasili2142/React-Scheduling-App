import { useState } from "react";
import PageContainer from "../../components/PageContainer";
import Form from "react-bootstrap/Form";
import * as database from "../../database";
import { useNavigate } from "react-router-dom";

export default function UserRegisterPage({ onUserData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  /**
   * Handles the user registration process.
   * Prevents the form from submitting if the passwords do not match.
   * If passwords match, it calls the database.userRegister function to register the user.
   *
   * @param {Object} e - The event object from the form submission.
   */
  const handleRegisterUser = (e) => {
    e.preventDefault();
    const validate = [];

    if (!email.includes("@") || !email.includes(".com")) {
      validate.push("Invalid email address");
    }
    if (password.length < 6) {
      validate.push("Password must be at least 6 characters");
    }

    onUserData().forEach((user) => {
      if (user.email === email) {
        validate.push("Email already in use");
      }
      if (user.displayName === displayName) {
        validate.push("Display Name already in use");
      }
    });
    setErrorMessages(validate);

    if (validate.length === 0) {
      if (
        password === passwordConfirm &&
        (password !== "" || passwordConfirm !== "")
      ) {
        database.userRegister(email, password, displayName);
        console.log("Register Success");

        setTimeout(() => {
          navigate("/user");
        }, 1000);
      } else {
        alert("passwords don't match");
      }
    }
  };

  return (
    <PageContainer title="Register">
      <Form onSubmit={handleRegisterUser}>
        {/* Conditionally display error message */}
        {errorMessages.length > 0 && (
          <div>
            Invalid data:
            <ul>
              {errorMessages.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Email input field */}
        <Form.Group className="mb-3 register-email" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)} // Updates the email state on change
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group
          className="mb-3 user-display-name"
          controlId="formGroupDisplayName"
        >
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
