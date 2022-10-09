import axios from 'axios';

import { BASE_URL } from '../general';
import { User } from '../../hooks/use-auth';

type AuthUserType = (id: string) => Promise<User['user']>;

export const AuthUser: AuthUserType = async (id: string) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      getUserById(id: ${id}) {
        id
        name
        surname
        patronymic
        email
        phone
      }
    }`,
  };

  return await axios({
    url: `${BASE_URL}`,
    method: 'POST',
    headers: headers,
    data: graphqlQuery,
  }).then(({ data }) => data['data']['getUserById']);
};
