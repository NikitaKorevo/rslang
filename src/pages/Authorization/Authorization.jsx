import React from 'react';
import './Authorization.scss';
import { Button, Form } from 'react-bootstrap';

function Authorization() {
  return (
    <div className="Authorization d-flex justify-content-center align-items-center">
      <Form className="Authorization-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <div className="form-btns">
          <Button variant="primary" type="submit" className="logIn-btn">
            Log In
          </Button>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Authorization;
