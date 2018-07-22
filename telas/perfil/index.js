import React from 'react';
import { createStackNavigator } from 'react-navigation';

import CadastroPerfil from './Cadastro/CadastroPerfil';

const CadastroStack = createStackNavigator({
  CadastroPerfil,
}, 
{
  initialRouteName: 'CadastroPerfil',
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

export default CadastroStack;