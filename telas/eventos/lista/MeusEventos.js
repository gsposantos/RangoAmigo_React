import React from 'react';
import {
  View,
  ActivityIndicator,  
  StyleSheet,
} from 'react-native';

import axios from 'axios';

import ListaEventos from '../../../componentes/ListaEventos';                    

export default class MeusEventos extends React.Component {
  static navigationOptions = {
    title: 'Meus Eventos',
  };

  state = {   
    eventos: [],
    carregando: true,
  };

  async componentWillMount() {    

    //carregar Eventos antes do primeiro render
    this.caregaEventosApi();
    
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
