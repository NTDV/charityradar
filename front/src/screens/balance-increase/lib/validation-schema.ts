import * as yup from 'yup';

export type validationSchemaCardType = {
  number: number;
  personName: string;
  mmYY: string;
  cvv: string;
  money: number;
};

// название, сколько нужно собрать, описание, дата начала, дата окончания, статус
export const validationSchemaCard = yup.object().shape({
  number: yup.number().required('Поле обязательное для заполнения'),
  personName: yup.string().required('Поле обязательное для заполнения'),
  mmYY: yup.string().required('Поле обязательное для заполнения'),
  cvv: yup.string().required('Поле обязательное для заполнения'),
  money: yup.number().required('Поле обязательное для заполнения'),
});

export const MMYYMask = [/\d/, /\d/, '/', /\d/, /\d/];
export const CVVMask = [/\d/, /\d/, /\d/];
