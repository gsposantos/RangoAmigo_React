import React from 'react';
import {
  AsyncStorage,
  View, Button,
  ActivityIndicator,  
  StyleSheet,
} from 'react-native';

import {NavigationActions} from 'react-navigation';

import axios from 'axios';

import ListaEventos from '../../../../componentes/ListaEventos';   
import BotaoMenu from '../../../../componentes/BotaoMenu';                    

export default class MeusEventos extends React.Component {
  
  //caracteristicas da barra superior (toolbar) ... aqui deveria aparecer os botoes, por ex
  static navigationOptions = ({ navigation }) => {
    return {
      title:'Meus Eventos',
      headerLeft: (
        <BotaoMenu acaoMenu={navigation} />      
      ),
    };
  };
  
  // static navigationOptions = {
  //   title: 'Meus Eventos',
  // };

  state = {   
    eventos: [],
    carregando: true,
  };

  async componentDidMount() {    

    //Verifica perfil logado

    var oPerfil = await AsyncStorage.getItem("Perfil");
    console.log(oPerfil);
    
    if(oPerfil === null || oPerfil === 'undefined'){
      
      const navigateAction = NavigationActions.navigate({
        routeName: 'Login'
      });

      this.props.navigation.dispatch(navigateAction);
    }    
    else{
      
      //carregar Eventos antes do primeiro render
      this.caregaEventosApi();
    }
    
  }

  caregaEventosApi = () => {
    axios({
      method: 'post',        
      url: 'http://www.anjodaguardaeventos.com.br/rangoamigo/api/eventos/ListarEventos',    
      headers: { 'content-type': 'application/json;charset=utf-8' },                       
      data: { "CelNumero": 51999999093 } //perfil da sessao??
    }).then(response => {  

      console.log(response);

    })
    .catch((err) => {console.log(err);
    });          
  }

  selecionaEvento = evento => {
    this.props.navigation.navigate('Evento', evento);
  };

  mostraResultados = () => {
    //const { eventos } = this.state;
    return <ListaEventos recipes={this.state.eventos} onSelectRecipe={this.selecionaEvento} />;
  };

  render() {
    return (
      <View style={styles.container}>        
        <View style={styles.resultsContainer}>
          {
            this.state.loading
              ? <ActivityIndicator size="large" color="#000"/>
              : this.mostraResultados()
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },  
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
