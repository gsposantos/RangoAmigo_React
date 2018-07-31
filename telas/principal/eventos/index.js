import React from 'react';

import { 
  Icon 
} from 'native-base';

import { createStackNavigator } from 'react-navigation';

import MeusEventos from './lista/MeusEventos';
import DetalheEvento from './detalhe/DetalheEvento';
//import CadastroPerfil from '../../perfil/Cadastro/CadastroPerfil';
import CadastroEvento from './cadastro/CadastroEvento';

const EventoStack = createStackNavigator({
    MeusEventos,
    DetalheEvento,
    //CadastroPerfil,
    CadastroEvento,
}, {
  initialRouteName: 'MeusEventos',
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
EventoStack.navigationOptions = {
 title: 'Eventos',
  tabBarIcon({ tintColor }) {    
    return <Icon type="FontAwesome" ios='home' android="home" style={{fontSize: 25, color: tintColor}}/>;
  }
};

export default EventoStack;