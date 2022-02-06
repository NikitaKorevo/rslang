import React from 'react';
import '../Authorization.scss';
import { Button } from 'react-bootstrap';
import ROUTES from '../../../constants/routes';
import { LinkContainer } from 'react-router-bootstrap';
import SignInForm from '../../../components/SignInForm/SignInForm.jsx';

function SignIn() {
  return (
    <div className="Authorization d-flex justify-content-center align-items-center">
      <div className="Authorization-form">
        <nav className="form-btns form-btns__top">
          <Button className="logIn-btn nav-btn">Вход</Button>
          <LinkContainer to={ROUTES.SIGN_UP}>
            <Button className="logIn-btn logIn-btn__disabled">Регистрация</Button>
          </LinkContainer>
        </nav>
        <SignInForm />
      </div>
    </div>
  );
}

export default SignIn;
