import axios from 'axios';

import { BASE_URL } from '../general';

export enum FeesStatus {
  COMPLETED, // Завершен
  COLLECTING, // Сбор
  INITIATED, // Еще не начался
}

export type Fees = {
  collected: number;
  description: string;
  endDate: string;
  startDate: string;
  fundId: number;
  name: string;
  goal: number;
  id: number;
  status: FeesStatus;
};
type GetActualFees = () => Promise<Fees[]>;

export const getActualFees: GetActualFees = async () => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      getTopFees{
        id
        name
        goal
        startDate
        endDate
        description
        status
        collected
        fundId
      }
    }`,
  };

  return await axios({
    url: `${BASE_URL}/graphql`,
    method: 'POST',
    headers: headers,
    data: graphqlQuery,
  }).then(({ data }) => data['data']['getTopFees']);
};
