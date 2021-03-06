import React from 'react';
import { 
  Icon 
} from 'native-base';
import { createStackNavigator } from 'react-navigation';

import MeusContatos from './lista/MeusContatos';
import CadastroPerfil from '../../perfil/Cadastro/CadastroPerfil';

const ContatosStack = createStackNavigator({
  MeusContatos,
  CadastroPerfil
}, 
{
  initialRouteName: 'MeusContatos',
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
ContatosStack.navigationOptions = {
  title: 'Contatos',
  tabBarIcon({ tintColor }) {    
    return <Icon type="FontAwesome" ios='address-book' android="address-book" style={{fontSize: 20, color: tintColor}}/>;
  }
};

export default ContatosStack;