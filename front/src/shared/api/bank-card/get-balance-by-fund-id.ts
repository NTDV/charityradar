import axios from 'axios';

import { BASE_URL } from '../general';

type GetBalance = (token: string) => Promise<{ amount: number; monthDonations: number } | null>;

export const getBalanceByFundId: GetBalance = async (id: string) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      getBalanceByFundId(fundId: "${id}") {
        id
        Balance
      }
    }`,
  };

  return await axios({
    url: `${BASE_URL}/graphql`,
    method: 'POST',
    headers: headers,
    data: graphqlQuery,
  })
    .then(({ data }) => {
      return data?.['data']?.['getBalanceByFundId'] === null
        ? null
        : data['data']['getBalanceByFundId']['Balance'];
    })
    .catch((err) => null);
};
