import React, { useContext, useRef, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import './SignInForm.scss';
import { Context } from '../../index.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import SignInSchema from './Schema/SignInFormSchema.js';

const SignInForm = observer(() => {
  const { store } = useContext(Context);

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(SignInSchema)
  });

  const navigate = useNavigate();
  const emailErrorRef = useRef();

  const [loadAnimation, setLoadAnimation] = useState(false);

  const onSubmit = async (inputData) => {
    setLoadAnimation(true);

    const signInResp = await store.signIn(inputData);

    if (signInResp.status !== 200) {
      emailErrorRef.current.innerText = 'Неверный логин или пароль';
    } else {
      console.log(signInResp);
      navigate('/');
    }
    setLoadAnimation(false);
  };

  return (
    <Form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control {...register('email')} type="email" placeholder="Введите email" />
        <p ref={emailErrorRef}>{errors?.email?.message}</p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control {...register('password')} type="password" placeholder="Введите пароль" />
        <p>{errors?.password && errors.password?.message}</p>
      </Form.Group>
      <div className="form-btns">
        {loadAnimation ? (
          <div className="loading-icon">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Button type="submit" className="logIn-btn submit-btn">
            Войти
          </Button>
        )}
      </div>
    </Form>
  );
});

export default SignInForm;
