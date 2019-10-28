import * as types from '../types';
const initialState = {
  guest: [],
  error: null,
  isLoading: true,
};

export default function reducerGuest(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_CUSTOMERS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.GET_CUSTOMERS}_FULFILLED`:
      return {
        ...state,
        guest: action.payload.data,
        isLoading: false,
      };
    case `${types.GET_CUSTOMERS}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    default:
      return state;
  }
}
