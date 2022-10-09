import axios from 'axios';

import { BASE_URL } from '../general';
import { User } from '../../hooks/use-auth';

type AuthFundType = (id: string) => Promise<User['fund']>;

export const AuthFund: AuthFundType = async (id: string) => {
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
    url: `${BASE_URL}`,
    method: 'POST',
    headers: headers,
    data: graphqlQuery,
  }).then(({ data }) => data['data']['getFundById']);
};
