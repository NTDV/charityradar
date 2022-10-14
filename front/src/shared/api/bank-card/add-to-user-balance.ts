import axios from 'axios';

import { BASE_URL } from '../general';

type PayToFeesType = {
  token: string;
  number: string;
  holder: string;
  expire: string;
  cvc: string;
  amount: number;
};

export const addToUserBalance = async ({
  token,
  number,
  holder,
  expire,
  cvc,
  amount,
}: PayToFeesType) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      addToUserBalance(
        token: "${token}",
        card: {
          number: "${number}",
          holder: "${holder}",
          expire: "${expire}",
          cvc: "${cvc}"
        }, 
        amount: ${amount},
      ) {
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
      if (data?.['data']?.['addToUserBalance'] !== undefined) {
        return data?.['data']?.['addToUserBalance'];
      } else {
        return null;
      }
    })
    .catch(() => null);
};
