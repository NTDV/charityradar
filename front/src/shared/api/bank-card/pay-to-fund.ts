import axios from 'axios';

import { BASE_URL } from '../general';

type PayToFundType = {
  token: string;
  number: string;
  holder: string;
  expire: string;
  cvc: string;
  amount: number;
  fundId: number | string;
};

export const payToFund = async ({
  token,
  number,
  holder,
  expire,
  cvc,
  amount,
  fundId,
}: PayToFundType) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      payToFund(
        token: "${token}",
        card: {
          number: "${number}",
          holder: "${holder}",
          expire: "${expire}",
          cvc: "${cvc}"
        }, 
        amount: ${amount},
        fundId: ${fundId}) {
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
      if (data?.['data']?.['payToFund']?.['Balance'] !== undefined) {
        return data?.['data']?.['payToFund']?.['Balance'];
      } else {
        return null;
      }
    })
    .catch(() => null);
};
