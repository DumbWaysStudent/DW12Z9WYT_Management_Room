import * as types from '../types';
const initialState = {
  admin: [],
  error: null,
  isLoading: true,
};

export default function reducerUser(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_USERS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.GET_USERS}_FULFILLED`:
      return {
        ...state,
        admin: action.payload.data,
        isLoading: false,
      };
    case `${types.GET_USERS}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    default:
      return state;
  }
}
