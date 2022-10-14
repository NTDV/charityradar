import axios from 'axios';

import { BASE_URL } from '../general';

export const getTransaction = async (id: string | number) => {
  const headers = {
    'content-type': 'application/json',
  };

  return await axios({
    url: `${BASE_URL}/getTransHis/?fundId=${id}`,
    method: 'GET',
    headers: headers,
  })
    .then(({ data }) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err.response.data, 'err');
      return [];
    });
};
