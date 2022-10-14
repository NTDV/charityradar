import axios from 'axios';

import { BASE_URL } from '../general';

enum StatusFees {
  COMPLETED = 'COMPLETED',
  COLLECTING = 'COLLECTING',
  INITIATED = 'INITIATED',
}
export type FeesType = {
  goal: number | null;
  startDate: string;
  endDate: string | null;
  status: StatusFees;
  collected: number;
  fundId: number;
  id: string;
  name: string;
  image: string | null;
  email: string | null;
  phone: string | null;
  description: string | null;
  rating: number | null;
};

type GetFeesById = (id: string | number) => Promise<FeesType>;

export const getFeesById: GetFeesById = async (id) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      getFeesById(feesId: ${id}) {
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
  }).then(({ data }) => {
    if (data?.['data']?.['getFeesById']) {
      return data['data']['getFeesById'];
    } else {
      return {};
    }
  });
};
