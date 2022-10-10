import * as yup from 'yup';

export const validationSchemaFund = yup.object().shape({
  name: yup.string().required('Поле обязательное для заполнения'),
  description: yup.string().required('Поле обязательное для заполнения'),
});

// название, сколько нужно собрать, описание, дата начала, дата окончания, статус
export const validationSchemaFees = yup.object().shape({
  name: yup.string().required('Поле обязательное для заполнения'),
  allMoney: yup.string().required('Поле обязательное для заполнения'), // всего
  description: yup.string().required('Поле обязательное для заполнения'),
  dateStart: yup.string().required('Поле обязательное для заполнения'),
  dateEnd: yup.string().required('Поле обязательное для заполнения'),
});
