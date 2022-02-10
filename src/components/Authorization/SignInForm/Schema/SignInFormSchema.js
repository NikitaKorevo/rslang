import * as yup from 'yup';

const SignInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Заполните поле')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Некорректный email'),
  password: yup.string().required('Заполните поле')
});

export default SignInFormSchema;
