import * as yup from 'yup';

export type validationSchemaSimpleFormProps = {
  surname: string;
  name: string;
  patronymic?: string;
  phone: string;
  birthday: string;
  email: string;
  password: string;
  passwordRepeat: string;
};

// prettier-ignore
export const PHONE_MASK = ['8', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

const phoneRegex = /^[\d\s+()-]{10,15}$/;

const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.]\d{4}$/;
// минимум 8, цифры, буквы и что-то капсом
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = {
  oneDigit: /^.*(?=.*\d).*$/, // Должен содержать хотя бы одну цифру
  lowerCase: /^.*(?=.*[a-z]).*$/, // Должен содержать хотя бы один нижний регистр
  upperCase: /^.*(?=.*[A-Z]).*$/, // Должен содержать хотя бы один верхний регистр
};

export const validationSchemaSimpleForm = yup.object().shape({
  surname: yup.string().required('Поле обязательное для заполнения'),
  name: yup.string().required('Поле обязательное для заполнения'),
  patronymic: yup.string(),
  phone: yup
    .string()
    .matches(phoneRegex, 'Номер телефона введен некорректно')
    .required('Поле обязательное для заполнения'),
  birthday: yup
    .string()
    .required('Поле обязательное для заполнения')
    .matches(dateRegex, 'Дата рождения заполнена некорректно'),
  email: yup
    .string()
    .required('Поле обязательное для заполнения')
    .matches(emailRegex, 'E-mail введен некорректно'),
  password: yup
    .string()
    .required('Поле обязательное для заполнения')
    .min(8, 'Пароль должен быть более 8 символов')
    .matches(passwordRegex.oneDigit, 'Пароль должен содержать хотя бы одну цифру')
    .matches(passwordRegex.lowerCase, 'Пароль должен содержать символ нижнего регистра')
    .matches(passwordRegex.upperCase, 'Пароль должен содержать символ верхнего регистра'),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Поле обязательное для заполнения'),
});
