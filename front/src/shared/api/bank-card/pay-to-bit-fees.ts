import axios from 'axios';

import { BASE_URL } from '../general';

type PayToFundType = {
  token: string;
  amount: number;
  feesId: number | string;
};

export const payToBitFees = async ({ token, amount, feesId }: PayToFundType) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      payToFeesByBalance(
        token: "${token}"
        amount: ${amount},
        feesId: "${feesId}"
      ) {
        integer
        balance {
          Balance
        }
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
      if (data?.['data']?.['payToFeesByBalance']?.['balance'] !== undefined) {
        return data?.['data']?.['payToFeesByBalance']['balance']['Balance'];
      } else {
        return null;
      }
    })
    .catch(() => null);
};
