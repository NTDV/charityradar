import axios from 'axios';

import { BASE_URL } from '../general';
import { validationSchemaSimpleFormProps } from '../../../widgets/sign-up/lib/validation-schema';
import { ERRORS, ERRORS_MESSAGE } from '../../constants/types';

export const signUpFormApi = async ({
  email,
  password,
  name,
  surname,
  patronymic,
  phone,
}: validationSchemaSimpleFormProps) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `mutation {
       addUserAuth(
          authInput: {
          login: "${email}"
          password: "${password}"
        },
        userInput: {
          name: "${name}"
          surname: "${surname}"
          ${!!patronymic ? `patronymic: "${patronymic}"` : ''}
          email: "${email}"
          phone: "${phone}"
        }
      ){
          id
        }
      }`,
  };

  return await axios({
    url: `${BASE_URL}/graphql`,
    method: 'POST',
    headers: headers,
    data: graphqlQuery,
  })
    .then(({ data }) => data)
    .catch((err) => ({ err: { message: ERRORS_MESSAGE.server, type: ERRORS.server } }));
};
