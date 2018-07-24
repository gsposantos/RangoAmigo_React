import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { 
  Icon 
} from 'native-base';

import MeusConvites from './lista/MeusConvites';
import DetalheConvite from './detalhe/DetalheConvite';
import CadastroPerfil from '../../perfil/Cadastro/CadastroPerfil';

const ConviteStack = createStackNavigator({
    MeusConvites,
    DetalheConvite,
    CadastroPerfil
}, {
  initialRouteName: 'MeusConvites',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#607d8b',
    },
    headerTintColor: '#ebeeef',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  },
});

//caracteristica da TabBar ...aqui deve mostar os icones
ConviteStack.navigationOptions = {
  title: 'Convites',
  tabBarIcon({ tintColor }) {    
    return <Icon type="FontAwesome" ios='calendar' android="calendar" style={{fontSize: 20, color: tintColor}}/>;
  }
};

export default ConviteStack;