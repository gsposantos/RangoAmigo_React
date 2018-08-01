import React from 'react';
import { createStackNavigator } from 'react-navigation';

import AcessoPin from './AcessoPin/pin';
import AcessoFone from './AcessoFone/fone';
import CadastroPerfil from '../perfil/Cadastro/CadastroPerfil';


const LoginStack = createStackNavigator({
  AcessoFone,
  AcessoPin, 
  CadastroPerfil,
}, {
  initialRouteName: 'AcessoFone',
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


export default LoginStack;

