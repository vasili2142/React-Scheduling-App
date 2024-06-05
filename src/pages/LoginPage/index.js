import { useState, useEffect } from "react";
// import { auth } from "../../database/config";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/form";
import PageContainer from "../../components/PageContainer";
import * as database from "../../database";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const navigate = useNavigate();

  // Fetches registered users from the database on component mount.
  useEffect(() => {
    (async () => {
      const result = await database.read();
      setRegisteredUsers(result);
    })();
  }, []);

  /**
   * Checks if a user is currently logged in.
   * Utilizes the `checkLoggedIn` method from the database module,
   * passing the current user from the auth module.
   */
  // const handleCheckUser = () => {
  //   database.checkLoggedIn(auth.currentUser);
  // };

  /**
   * Handles the sign-in process.
   * Iterates over the list of registered users and checks if the entered
   * email and password match any user. If a match is found, signs the user in
   * and navigates to the user page.
   */
  // Work-a-round for not knowing how to verify, before navigating to '/user' with firestore auth error codes
  const handleSignIn = (e) => {
    registeredUsers.forEach((users) => {
      e.preventDefault();
      if (!registeredUsers) {
        return null;
      }
      if (users.email === email && users.password === password) {
        database.userSignIn(email, password);
        navigate("/user");
      }
    });    
    console.log("Signing in...");
  };

  return (
    <PageContainer title="Login">
      <Form onSubmit={handleSignIn}>
        <Form.Group className="mb-3 register-email" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group
          className="mb-3 register-password"
          controlId="formGroupPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <button>Sign In</button>
        
      </Form>
      {/* <button onClick={handleCheckUser}>Check Logged in</button> */}
    </PageContainer>
  );
}
