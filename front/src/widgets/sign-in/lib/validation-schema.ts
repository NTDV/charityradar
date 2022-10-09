import * as yup from 'yup';

export type validationSchemaSimpleFormSignInProps = {
  email: string;
  password: string;
};

// минимум 8, цифры, буквы и что-то капсом
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validationSchemaSimpleFormSignIn = yup.object().shape({
  email: yup
    .string()
    .required('Поле обязательное для заполнения')
    .matches(emailRegex, 'E-mail введен некорректно'),
  password: yup.string().required('Поле обязательное для заполнения'),
});
