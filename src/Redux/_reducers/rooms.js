import * as types from '../types';
const initialState = {
  rooms: [],
  error: null,
  isLoading: true,
};

export default function reducerRooms(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_ROOMS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.GET_ROOMS}_FULFILLED`:
      return {
        ...state,
        rooms: action.payload.data,
        isLoading: false,
      };
    case `${types.GET_ROOMS}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    default:
      return state;
  }
}

// export default reducerRooms;
