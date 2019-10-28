import * as types from '../types';
import axios from 'axios';
import {ip} from '../ip';

export const getRoom = (id, token) => {
  return {
    type: types.GET_ROOMS,
    payload: axios({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      url: `${ip}/rooms`,
    }),
  };
};

export const addRooms = (room_name, token) => ({
  type: types.ADD_ROOM,
  payload: axios({
    method: 'POST',
    url: `${ip}/room`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      room_name,
    },
  }),
});
