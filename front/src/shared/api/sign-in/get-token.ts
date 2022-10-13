import axios from 'axios';

import { BASE_URL } from '../general';

type GetToken = ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => Promise<{ id: string; link: number; type: number; token: string }>;

export const getToken: GetToken = async ({ login, password }) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `{ authByVTBId(login: "${login}", password: "${password}")
      {
        id
        link
        type
        token
      }
    }`,
  };

  return await axios({
    url: `${BASE_URL}/graphql`,
    method: 'POST',
    headers: headers,
    data: graphqlQuery,
  }).then(({ data }) => data['data']['authByVTBId']);
};
