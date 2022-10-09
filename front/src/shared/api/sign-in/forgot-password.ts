import axios from 'axios';

import { BASE_URL } from '../general';

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
    url: `${BASE_URL}`,
    method: 'POST',
    headers: headers,
    data: graphqlQuery,
  }).then(({ data }) => data['data']['sendLetterToResetPassword']);
};
