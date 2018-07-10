import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import EventoStack from './eventos';
import ConvitesStack from './convites';
import ContatosStack from './contatos';

const MainTabBar = createBottomTabNavigator({
  Eventos: EventoStack,
  Convites: ConvitesStack,
  ContatosStack: ContatosStack,
}, {
  initialRouteName: 'Eventos',
  navigationOptions: {
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
  },
});

export default class Principal extends React.Component {

    state = {
      userId: 0,
    };
  
    render() {
      return (
        <MainTabBar
        screenProps={{
          state: this.state
        }}
      />
      );
    }
  };