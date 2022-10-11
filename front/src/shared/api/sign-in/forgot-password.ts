import axios from 'axios';

import { BASE_URL } from '../general';
import { ERRORS, ERRORS_MESSAGE } from '../../constants/types';

export const forgotPassword = async (login: string) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      sendLetterToResetPassword(login: "${login}")
    }`,
  };

  return await axios({
    url: `${BASE_URL}/graphql`,
    method: 'POST',
    headers: headers,
    data: graphqlQuery,
  })
    .then(({ data }) => data['data']['sendLetterToResetPassword'])
    .catch((err) => ({ err: { message: ERRORS_MESSAGE.server, type: ERRORS.server } }));
};
