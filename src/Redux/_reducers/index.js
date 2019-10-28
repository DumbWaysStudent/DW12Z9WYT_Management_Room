import {combineReducers} from 'redux';

import reducerRooms from './rooms';
import reducerGuest from './customer';
import reducerUser from './user';
//import reducerAddRooms from './addRoom';

const appReducer = combineReducers({
  //rooms: reducerRooms,
  rooms: reducerRooms,
  guest: reducerGuest,
  admin: reducerUser,
  //newRoom: reducerAddRooms,
});

export default appReducer;
