import * as yup from 'yup';

const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.]\d{4}$/;

export const validationSchemaFund = yup.object().shape({
  name: yup.string().required('Поле обязательное для заполнения'),
  description: yup.string().required('Поле обязательное для заполнения'),
});

// название, сколько нужно собрать, описание, дата начала, дата окончания, статус
export const validationSchemaFees = yup.object().shape({
  name: yup.string().required('Поле обязательное для заполнения'),
  allMoney: yup.string().required('Поле обязательное для заполнения'), // всего
  description: yup.string().required('Поле обязательное для заполнения'),
  dateStart: yup
    .string()
    .required('Поле обязательное для заполнения')
    .matches(dateRegex, 'Дата начала сбора введена некорректно'),

  dateEnd: yup
    .string()
    .required('Поле обязательное для заполнения')
    .matches(dateRegex, 'Дата окончания сбора введена некорректно'),
});
