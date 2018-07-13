import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MeusEventos from './lista/MeusEventos';
import DetalheEvento from './detalhe/DetalheEvento';

const EventoStack = createStackNavigator({
    MeusEventos,
    DetalheEvento
}, {
  initialRouteName: 'MeusEventos',
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
EventoStack.navigationOptions = {
 title: 'Eventos',
  // tabBarIcon({ tintColor }) {
  //   return <MaterialCommunityIcons name="food-fork-drink" size={25} />;
  // }
};

export default EventoStack;