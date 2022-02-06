import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './SignUpForm.scss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Authorization from '../../API/authorization.js';

const SignUpForm = () => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Заполните поле')
      .min(2, 'Имя должно содержать минимум 2 символа')
      .max(16, 'Превышено макмсимальное количество символов, 16')
      .matches(/^[a-zA-Z0-9_-]{2,16}$/, 'Имя может содержать только латинские буквы и цифры'),

    email: yup
      .string()
      .required('Заполните поле')
      .email()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Некорректный email'),
    password: yup
      .string()
      .required('Заполните поле')
      .min(4, 'Паролль должен содержать минимум 4 символа')
      .max(16, 'Превышено макмсимальное количество символов, 16')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})/,
        `Пароль должен состоять из цифр, латинских \n
         букв верхнего и нижнего регистра`
      ),
    confirmPassword: yup
      .string()
      .required('Заполните поле')
      .oneOf([yup.ref('password'), null])
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    delete data.confirmPassword;
    Authorization.createNewUser(data);
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
        <p>{errors?.email?.message}</p>
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
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Запомнить меня" />
      </Form.Group>
      <div className="form-btns">
        <Button variant="primary" type="submit" className="logIn-btn submit-btn">
          Зарегистрироваться
        </Button>
      </div>
    </Form>
  );
};

export default SignUpForm;
