import axios from 'axios';

import { BASE_URL } from '../general';

export enum FeesStatus {
  COMPLETED, // Завершен
  COLLECTING, // Сбор
  INITIATED, // Еще не начался
}

export interface Fees {
  collected: number;
  description: string;
  endDate: Date;
  startDate: Date;
  fundId: number;
  name: string;
  goal: number;
  id: number;
  status: FeesStatus;
}
type GetAllFees = () => Promise<Fees[]>;

export const getAllFees: GetAllFees = async () => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      getAllFees {
        id
        name
        goal
        startDate
        endDate
        description
        endDate
        status
        collected
        fundId
        image
      }
    }`,
  };

  return await axios({
    url: `${BASE_URL}/graphql`,
    method: 'POST',
    headers: headers,
    data: graphqlQuery,
  }).then(({ data }) => data['data']['getAllFees']);
};
