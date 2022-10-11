import axios from 'axios';

import { BASE_URL } from '../general';

type GetBalance = (token: string) => Promise<{ amount: number; monthDonations: number } | null>;

export const getBalance: GetBalance = async (token: string) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      getBalanceInfo(token: "${token}") {
        amount
        monthDonations
      }
    }`,
  };

  return await axios({
    url: `${BASE_URL}/graphql`,
    method: 'POST',
    headers: headers,
    data: graphqlQuery,
  }).then(({ data }) => (data['data'] === null ? null : data['data']['getBalanceInfo']));
};
