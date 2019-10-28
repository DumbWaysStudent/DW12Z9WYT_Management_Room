import * as types from '../types';
import axios from 'axios';
import {ip} from '../ip';

export const getGuest = (id, token) => {
  return {
    type: types.GET_CUSTOMERS,
    payload: axios({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      url: `${ip}/customers`,
    }),
  };
};
