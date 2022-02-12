import * as yup from 'yup';

const SignUpSchema = yup.object().shape({
  name: yup
    .string()
    .required('Заполните поле')
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(16, 'Превышено макмсимальное количество символов, 16')
    .matches(/^[a-zA-Z0-9_-]{2,16}$/, 'Имя может содержать только латинские буквы и цифры'),

  email: yup
    .string()
    .required('Заполните поле')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Некорректный email'),
  password: yup
    .string()
    .required('Заполните поле')
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .max(16, 'Превышено макмсимальное количество символов, 16')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})/,
      'Пароль должен содержать цифры, латинские буквы верхнего и нижнего регистра'
    ),
  confirmPassword: yup
    .string()
    .required('Заполните поле')
    .oneOf([yup.ref('password'), null])
});

export default SignUpSchema;
