import axios from 'axios';

import { BASE_URL } from '../general';
import { ERRORS, ERRORS_MESSAGE } from '../../constants/types';

export type EditFundProps = {
  token: string;
  data: {
    name: string;
    image?: string;
    description?: string;
  };
};

export const editFund = async ({ token, data }: EditFundProps) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `mutation {
       editFund(
       token: "${token}"
       fundInput: {
        name: "${data.name}"
        ${data.image ? `image: "${data.image}"` : ''}
        ${data.description ? `description: "${data.description}"` : ''}
       }
      ){
          id
          name
          image
          description
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
      console.log(data);
    })
    .catch((err) => ({ err: { message: ERRORS_MESSAGE.server, type: ERRORS.server } }));
};
