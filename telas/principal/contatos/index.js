import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MeusContatos from './lista/MeusContatos';

const ContatosStack = createStackNavigator({
  MeusContatos
}, 
{
  initialRouteName: 'MeusContatos',
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
ContatosStack.navigationOptions = {
  title: 'Contatos',
//   tabBarIcon({ tintColor }) {
//     return <MaterialCommunityIcons name="food-fork-drink" size={25} />;
//   }
};

export default ContatosStack;