import axios from 'axios';

import { BASE_URL } from '../general';

export type FeesType = {
  id: string;
  name: string;
  image: string | null;
  email: string | null;
  phone: string | null;
  description: string | null;
  rating: number | null;
};

type GetFundById = (id: string | number) => Promise<FeesType[]>;

export const getFeesByIdFund: GetFundById = async (id) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      getFeesByFundId(fundId: ${id}) {
        id
        name
        goal
        startDate
        endDate
        description
        status
        collected
        fundId
        image
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
      console.log(data);
      if (data?.['data']?.['getFeesByFundId']) {
        return data['data']['getFeesByFundId'];
      } else {
        return [];
      }
    })
    .catch(() => {
      return [];
    });
};
