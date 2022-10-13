import axios from 'axios';

import { BASE_URL } from '../general';

export type NewsType = {
  id: string;
  name: string;
  date: string;
  description: string;
  image: string;
  fundId: number;
};

type GetAllNews = () => Promise<NewsType[]>;

export const getAllNews: GetAllNews = async () => {
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `query{
      getAllNews {
        id
        name
        date
        description
        image
        fundId
      }
    }`,
  };

  return await axios({
    url: `${BASE_URL}/graphql`,
    method: 'POST',
    headers: headers,
    data: graphqlQuery,
  }).then(({ data }) => data['data']['getAllNews']);
};
