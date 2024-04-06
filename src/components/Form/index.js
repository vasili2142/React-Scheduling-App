import Form from "react-bootstrap/Form";

export default function EmailAndAddressForm() {
  
  return (
    <Form>
      <Form.Group className="mb-3 register-email" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3 register-password" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
    </Form>
  );
}


