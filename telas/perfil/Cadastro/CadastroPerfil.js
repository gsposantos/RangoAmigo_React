import React from 'react';
import { View, Text, Button } from 'react-native';

import axios from 'axios';

import BotaoMenu from '../../../componentes/BotaoMenu';

export default class CadastroPerfil extends React.Component {

    //aqui vai o botao?? EX: https://github.com/react-navigation/react-navigation/issues/1122
   static navigationOptions = ({ navigation }) => {
      return {
        title: 'Cadastro Perfil',
        headerLeft: (
        <BotaoMenu acaoMenu={navigation} />      
        ),
      };    
    };

    state={
      carregando: true,
      contatosDispositivo: [],
      contatosAtualizados: []
    }
 
    
    render(){
  
     //this.carregarContatosDipositivo();
  
      return (
            <Text>Carregando ... </Text>
        // <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        //   {this.renderListaContatos()}
        // </View>
      )
    }
  }
