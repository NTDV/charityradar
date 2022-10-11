import axios from 'axios';

import { BASE_URL } from '../general';

export const uploadImg = async (formData: object) => {
  const headers = {
    'content-type': 'multipart/form-data',
  };

  return await axios({
    url: `${BASE_URL}/upload`,
    method: 'POST',
    headers: headers,
    data: formData,
  })
    .then(({ data }) => console.log(data))
    .catch((err) => console.log(err.response.data, 'err'));
};
