import axios from 'axios';

import { BASE_URL } from './general';

export type SearchType = {
  fund: {
    id: number | string;
    name: string;
  }[];
  fees: {
    id: number | string;
    name: string;
  }[];
};

export const search = async (query: string) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      searchFundAndFeesByName(query: "${query}") {
        fund {
          id
          name
        }
        fees {
          id
          name
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
      if (data?.['data']?.['searchFundAndFeesByName']) {
        return data['data']['searchFundAndFeesByName'];
      } else {
        return { fees: [], fund: [] };
      }
    })
    .catch(() => ({ fees: [], fund: [] }));
};
