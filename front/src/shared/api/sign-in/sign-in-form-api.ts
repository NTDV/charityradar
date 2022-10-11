import axios from 'axios';

import { BASE_URL } from '../general';

import { validationSchemaSimpleFormSignInProps } from '../../../widgets/sign-in/lib/validation-schema';
import { ERRORS, ERRORS_MESSAGE } from '../../constants/types';

export const signInFormApi = async ({ email, password }: validationSchemaSimpleFormSignInProps) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query {
     authByLoginPass(login: "${email}", password: "${password}") {
        type
        confirmed
        link
        token
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
