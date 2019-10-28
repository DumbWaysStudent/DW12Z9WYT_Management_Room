import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';
import React, {Component} from 'react';

import store from './src/Redux/store';
import Login from './src/screens/Login';
import Room from './src/screens/Room';
import checkin from './src/screens/Checkin';
import setting from './src/screens/setting';
import Customer from './src/screens/Customer';
import RoomAdd from './src/screens/RoomAdd';
import CustomerAdd from './src/screens/CustomerAdd';
import RoomEdit from './src/screens/RoomEdit';
import CustomerEdit from './src/screens/CustomerEdit';
import Register from './src/screens/Register';

const AuthStack = createStackNavigator({Login});
const AppStack = createStackNavigator({
  Room,
  RoomAdd,
  RoomEdit,
  checkin,
  setting,
  Customer,
  CustomerAdd,
  CustomerEdit,
  Register,
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
