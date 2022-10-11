import * as yup from 'yup';

export type validationSchemaVtbFormProps = {
  login: string;
  password: string;
};

export const validationSchemaVtbForm = yup.object().shape({
  login: yup.string().required('Поле обязательное для заполнения'),
  password: yup.string().required('Поле обязательное для заполнения'),
});
