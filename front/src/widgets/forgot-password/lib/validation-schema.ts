import * as yup from 'yup';

export type validationSchemaForgetProps = {
  email: string;
};

// минимум 8, цифры, буквы и что-то капсом
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validationSchemaForget = yup.object().shape({
  email: yup
    .string()
    .required('Поле обязательное для заполнения')
    .matches(emailRegex, 'E-mail введен некорректно'),
});
