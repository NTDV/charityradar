import * as yup from 'yup';

export const validationSchemaFund = yup.object().shape({
  name: yup.string().required('Поле обязательное для заполнения'),
  description: yup.string().required('Поле обязательное для заполнения'),
});
