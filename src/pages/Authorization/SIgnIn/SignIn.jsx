import React from 'react';
import '../Authorization.scss';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ROUTES from '../../../constants/routes';
import avatarIcon from '../../../assets/svg/avatar.svg';
import SignInForm from '../../../components/Authorization/SignInForm/SignInForm.jsx';

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
        <div className="avatar-wrapper">
          <img src={avatarIcon} alt="avatar" />
        </div>

        <SignInForm />
      </div>
    </div>
  );
}

export default SignIn;
