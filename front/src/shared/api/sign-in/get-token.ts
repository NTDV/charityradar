import axios from 'axios';

import { BASE_URL } from '../general';

type GetToken = ({ login, password }: { login: string; password: string }) => void;

export const getToken: GetToken = async ({ login, password }) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `{ authByVTBId(login: "${login}", password: "${password}")
      {
        access_token
        refresh_token
        scope
        id_token
      }
    }`,
  };

  return await axios({
    url: `${BASE_URL}/graphql`,
    method: 'POST',
    headers: headers,
    data: graphqlQuery,
  }).then(({ data }) => data);
};
