import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './SignInForm.scss';

const SignInForm = () => {
  return (
    <Form className="sing-in-form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Введите email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Введите пароль" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Запомнить меня" />
      </Form.Group>
      <div className="form-btns">
        <Button type="submit" className="logIn-btn submit-btn">
          Войти
        </Button>
      </div>
    </Form>
  );
};

export default SignInForm;
