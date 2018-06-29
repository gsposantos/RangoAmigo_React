import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MeusEventos from './lista/MeusEventos';
import DetalheEvento from './detalhe/DetalheEvento';

const EventoStack = createStackNavigator({
    MeusEventos,
    DetalheEvento
}, {
  initialRouteName: 'MeusEventos',
  navigationOptions: {
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

EventoStack.navigationOptions = {
  title: 'Meus Eventos',
//   tabBarIcon({ tintColor }) {
//     return <MaterialCommunityIcons name="food-fork-drink" size={25} />;
//   }
};

export default EventoStack;