import axios from 'axios';

import { BASE_URL } from '../general';

type GetToken = () => Promise<{ token: string; url: string }>;

// Получение токена и ссылки для WebView
export const getToken: GetToken = async () => {
  return await axios({
    url: `${BASE_URL}/openid/vtb/login`,
    method: 'GET',
  }).then(({ data }) => data);
};
