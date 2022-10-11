import axios from 'axios';

type AuthVtb = () => Promise<{ token: string; url: string }>;

// Получение токена и ссылки для WebView
export const AuthVtb = async ({ token, url }: { token: string; url: string }) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios({
    url: `${url}`,
    method: 'GET',
    headers: headers,
  }).then(({ data }) => data);
};
