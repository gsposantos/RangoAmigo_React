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

//caracteristica da TabBar ...aqui deve mostar os icones
ConviteStack.navigationOptions = {
  title: 'Convites',
//   tabBarIcon({ tintColor }) {
//     return <MaterialCommunityIcons name="food-fork-drink" size={25} />;
//   }
};

export default ConviteStack;