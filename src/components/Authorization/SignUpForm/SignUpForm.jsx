import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';
import './SignUpForm.scss';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import SignUpSchema from './Schema/SignUpFormSchema.js';
import { store } from '../../../store/store.js';

const SignUpForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(SignUpSchema)
  });

  const navigate = useNavigate();
  const emailErrorRef = useRef();
  const [loadAnimation, setLoadAnimation] = useState(false);

  const onSubmit = async (inputData) => {
    setLoadAnimation(true);

    const signUpData = {
      name: inputData.name,
      email: inputData.email,
      password: inputData.password
    };

    const signInData = {
      email: inputData.email,
      password: inputData.password
    };

    const createUserResp = await store.signUp(signUpData);
    console.log(createUserResp);

    if (createUserResp.status === 200) {
      const signInResp = await store.signIn(signInData);
      console.log(signInResp);
      navigate('success');
    } else if (createUserResp.status === 417 || 423) {
      emailErrorRef.current.innerText = 'Пользователь с таким email уже зарегистрирован.';
    }
    setLoadAnimation(false);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Control {...register('name')} type="text" placeholder="Введите имя" />
        <p>{errors?.name?.message}</p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control {...register('email')} type="email" placeholder="Введите email" />
        <p ref={emailErrorRef}>{errors?.email?.message}</p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          {...register('password')}
          type="password"
          placeholder="Введите пароль"
          minLength="8"
        />
        <p>{errors?.password && errors.password?.message}</p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="repFormBasicPassword">
        <Form.Control
          {...register('confirmPassword')}
          type="password"
          placeholder="Подтвердите пароль"
        />
        <p>{errors?.confirmPassword?.message && 'Пароль должен совпадать'}</p>
      </Form.Group>

      <div className="form-btns">
        {loadAnimation ? (
          <div className="loading-icon">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Button variant="primary" type="submit" className="logIn-btn submit-btn">
            Зарегистрироваться
          </Button>
        )}
      </div>
    </Form>
  );
};

export default SignUpForm;
