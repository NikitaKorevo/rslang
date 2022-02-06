import React from 'react';
import '../Authorization.scss';
import { Button } from 'react-bootstrap';
import ROUTES from '../../../constants/routes';
import { LinkContainer } from 'react-router-bootstrap';
import SignUpForm from '../../../components/SignUpForm/SignUpForm.jsx';

function SignUp() {
  return (
    <div className="Authorization d-flex justify-content-center align-items-center">
      <div className="Authorization-form">
        <nav className="form-btns form-btns__top">
          <LinkContainer to={ROUTES.SIGN_IN}>
            <Button className="logIn-btn logIn-btn__disabled ">Вход</Button>
          </LinkContainer>
          <Button className="logIn-btn nav-btn">Регистрация</Button>
        </nav>
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
