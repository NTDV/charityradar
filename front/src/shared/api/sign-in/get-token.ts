import axios from 'axios';

import { BASE_URL } from '../general';
import { ERRORS, ERRORS_MESSAGE } from '../../constants/types';

type GetToken = ({ login, password }: { login: string; password: string }) => Promise<{
  id: string;
  link: number;
  type: number;
  token: string;
  login: string | null;
  vtbMdmId: string | null;
  vtbToken: string | null;
}>;

export const getToken: GetToken = async ({ login, password }) => {
  const headers = {
    'content-type': 'application/json; charset=utf-8',
  };

  const graphqlQuery = {
    query: `{ authByVTBId(login: "${login}", password: "${password}")
      {
        id
        login
        vtbMdmId
        token
        type
        confirmed
        link
        vtbToken
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
      if (data?.['data']?.['authByVTBId']) {
        return data['data']['authByVTBId'];
      } else {
        return { err: { message: 'Пользователь не найден', type: ERRORS.server } };
      }
    })
    .catch((err) => ({ err: { message: ERRORS_MESSAGE.server, type: ERRORS.server } }));
};
