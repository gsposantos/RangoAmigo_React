import React from 'react';
import { createStackNavigator } from 'react-navigation';

import AcessoPin from './AcessoPin/pin';
import AcessoFone from './AcessoFone/fone';


const LoginStack = createStackNavigator({
  AcessoFone,
  AcessoPin
}, {
  initialRouteName: 'AcessoFone',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#607d8b',
    },
    headerTintColor: '#ff950e',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  },
});


export default LoginStack;

