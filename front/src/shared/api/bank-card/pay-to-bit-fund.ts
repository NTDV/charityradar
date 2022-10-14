import axios from 'axios';

import { BASE_URL } from '../general';

type PayToFundType = {
  token: string;
  amount: number;
  fundId: number | string;
};

export const payToBitFund = async ({ token, amount, fundId }: PayToFundType) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      payToFundByBalance(
        token: "${token}"
        amount: ${amount},
        fundId: "${fundId}"
      ) {
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
      if (data?.['data']?.['payToFundByBalance'] !== undefined) {
        return data?.['data']?.['payToFundByBalance'];
      } else {
        return null;
      }
    })
    .catch(() => null);
};
