import axios from 'axios';

import { BASE_URL } from '../general';

type CardInfo = (token: string) => Promise<{ number: number; expire: string; holder: string }>;

export const getCardInfo: CardInfo = async (token: string) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      getMainCardInfo(token: "${token}") {
        number, expire, holder
      }
    }`,
  };

  return await axios({
    url: `${BASE_URL}/graphql`,
    method: 'POST',
    headers: headers,
    data: graphqlQuery,
  })
    .then(({ data }) => (data['data'] === null ? null : data['data']['getMainCardInfo']))
    .catch((err) => null);
};
