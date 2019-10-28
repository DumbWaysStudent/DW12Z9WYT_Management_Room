import * as types from '../types';
import axios from 'axios';
import {ip} from '../ip';

export const getUser = (id, token) => {
  return {
    type: types.GET_USERS,
    payload: axios({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      url: `${ip}/user/${id}`,
    }),
  };
};
