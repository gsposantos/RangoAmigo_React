import React from 'react';
import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
//createBottomTabNavigator

import EventoStack from './eventos';
import ConvitesStack from './convites';
import ContatosStack from './contatos';

const Principal = createBottomTabNavigator({
  Eventos: { screen: EventoStack },
  Convites: { screen: ConvitesStack },
  Contatos: { screen: ContatosStack },
}, {
  initialRouteName: 'Eventos',
  navigationOptions: {
    tabBarOptions: {
      labelStyle:{
        fontWeight: 'bold',
        fontSize: 12,
      },
      activeBackgroundColor: '#34515e',
      inactiveBackgroundColor : '#607d8b',
      //activeTintColor: '#ebeeef', //bgcolor
      activeTintColor: '#ebeeef', //
      inactiveTintColor: '#ebeeef', //
    },
  },
});

/* 
const Principal = createBottomTabNavigator({
  Eventos: EventoStack,
  Convites: ConvitesStack,
  ContatosStack: ContatosStack,
}, {
  initialRouteName: 'Eventos',
  navigationOptions: {
    tabBarOptions: {
      //activeBackgroundColor: '#ffc64b',
      //inactiveBackgroundColor : '#ffc64b', 
      activeTintColor: '#34515e', //primaryDarkColor
      inactiveTintColor: '#8eacbb', //primaryLightColor
    },
  },
});
*/

export default Principal;


// export default class Principal extends React.Component {
  
//     render() {
//       return (
//         <MainTabBar />
//       );
//     }
//   };