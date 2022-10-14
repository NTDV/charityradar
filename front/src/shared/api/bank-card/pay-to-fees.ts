import axios from 'axios';

import { BASE_URL } from '../general';

type PayToFeesType = {
  token: string;
  number: string;
  holder: string;
  expire: string;
  cvc: string;
  amount: number;
  feesId: number | string;
};

export const payToFees = async ({
  token,
  number,
  holder,
  expire,
  cvc,
  amount,
  feesId,
}: PayToFeesType) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      payToFees(
        token: "${token}",
        card: {
          number: "${number}",
          holder: "${holder}",
          expire: "${expire}",
          cvc: "${cvc}"
        }, 
        amount: ${amount},
        feesId: "${feesId}")
    }`,
  };

  return await axios({
    url: `${BASE_URL}/graphql`,
    method: 'POST',
    headers: headers,
    data: graphqlQuery,
  })
    .then(({ data }) => {
      console.log(data);
      if (data?.['data']?.['payToFees'] !== undefined) {
        return data?.['data']?.['payToFees'];
      } else {
        return null;
      }
    })
    .catch(() => null);
};
