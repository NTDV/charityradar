import * as yup from 'yup';

export const validationSchemaPayment = yup.object().shape({
  amount: yup.number().required('Поле обязательное для заполнения').nullable(),
});
