import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MeusConvites from './lista/MeusConvites';
import DetalheConvite from './detalhe/DetalheConvite';

const ConviteStack = createStackNavigator({
    MeusConvites,
    DetalheConvite
}, {
  initialRouteName: 'MeusConvites',
  navigationOptions: {
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

ConviteStack.navigationOptions = {
  title: 'Meus Convites',
//   tabBarIcon({ tintColor }) {
//     return <MaterialCommunityIcons name="food-fork-drink" size={25} />;
//   }
};

export default ConviteStack;