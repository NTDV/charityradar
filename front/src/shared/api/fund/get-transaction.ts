import axios from 'axios';

import { BASE_URL } from '../general';
import { SERVER_ERROR } from '../../constants/variables';
import Toast from 'react-native-root-toast';
import { ERRORS_MESSAGE } from '../../constants/types';
import { settingsToastError } from '../../constants/settings-toast';

export type Transaction = {
  id: string;
  name: string;
  image: string | null;
  email: string | null;
  phone: string | null;
  description: string | null;
  rating: number | null;
};

export const getTransaction: Transaction = async (id: string | number) => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query {
      getTransactionsByFundId(fundId: ${id}) {
        id
        type
        amount
        status
        feesId
        fundId
        userId
        document
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
      if (data?.['data']?.['getTransactionsByFundId']) {
        return data['data']['getTransactionsByFundId'];
      } else {
        Toast.show(ERRORS_MESSAGE.serverWorksNotStable, settingsToastError);
        return SERVER_ERROR;
      }
    })
    .catch((err) => SERVER_ERROR);
};
