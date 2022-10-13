import axios from 'axios';

import { BASE_URL } from '../general';
import { SERVER_ERROR } from '../../constants/variables';
import Toast from 'react-native-root-toast';
import { ERRORS_MESSAGE } from '../../constants/types';
import { settingsToastError } from '../../constants/settings-toast';

export type SuccessResponseGetAllFunds = {
  id: string;
  name: string;
  image: string | null;
  email: string | null;
  phone: string | null;
  description: string | null;
  rating: number | null;
  fees: {
    id: number;
    goal: number;
    collected: number;
    endDate: string;
    startDate: string;
  };
};

export const getAllFunds = async () => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      getAllFunds {
        id
        name
        image
        email
        phone
        description
        rating
        fees {
          id
          goal
          collected
          endDate
          startDate
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
      console.log(data);
      if (data?.['data']?.['getAllFunds']) {
        return data['data']['getAllFunds'];
      } else {
        Toast.show(ERRORS_MESSAGE.serverWorksNotStable, settingsToastError);
        return SERVER_ERROR;
      }
    })
    .catch((err) => SERVER_ERROR);
};
