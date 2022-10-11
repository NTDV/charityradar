import axios from 'axios';

import { BASE_URL } from '../general';

export const sendRepeatEmail = async (token: string) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      sendLetterToConfirmEmail(token: "${token}")
    }`,
  };

  return await axios({
    url: `${BASE_URL}/graphql`,
    method: 'POST',
    headers: headers,
    data: graphqlQuery,
  }).then(({ data }) => data);
};
