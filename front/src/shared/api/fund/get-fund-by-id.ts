import axios from 'axios';

import { BASE_URL } from '../general';

export type FondType = {
  id: string;
  name: string;
  image: string | null;
  email: string | null;
  phone: string | null;
  description: string | null;
  rating: number | null;
};

type GetFundById = (id: string | number) => Promise<FondType>;

export const getFundById: GetFundById = async (id) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      getFundById(id: ${id}) {
        id
        name
        email
        phone
        image
        description
        rating
      }
    }`,
  };

  return await axios({
    url: `${BASE_URL}/graphql`,
    method: 'POST',
    headers: headers,
    data: graphqlQuery,
  }).then(({ data }) => {
    if (data?.['data']?.['getFundById']) {
      return data['data']['getFundById'];
    } else {
      return {};
    }
  });
};
