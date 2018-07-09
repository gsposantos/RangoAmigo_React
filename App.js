import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import EventoStack from './telas/eventos';
import ConvitesStack from './telas/convites';
import ContatosStack from './telas/contatos';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

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

export default class App extends React.Component {

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
