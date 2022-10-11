import axios from 'axios';

import { BASE_URL } from '../general';

// getTopFund{private Integer id;
// private String name;
// private String email;
// private String phone;
// private String image;
// private String description;
// private Float rating;
// }

type GetTopFund = () => Promise<{ amount: number; monthDonations: number }>;

export const getTopFund: GetTopFund = async () => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      getTopFund() {
        name
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
  }).then(({ data }) => data['data']['sendLetterToResetPassword']);
};
