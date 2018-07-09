import React from 'react';
import {
  View,
  ActivityIndicator,  
  StyleSheet,
} from 'react-native';

import axios from 'axios';

import ListaEventos from '../../../componentes/ListaEventos';

const buscaConvites = async q => {
//   const res = await fetch(`https://food2fork.com/api/search?key=${food2ForkKey}&q=${q}`);

//   console.log('https://food2fork.com/api/search?key=${food2ForkKey}&q=${q}');
//   const {recipes} = await res.json();

//   return recipes;
};

export default class MeusConvites extends React.Component {
  static navigationOptions = {
    title: 'Meus Convites',
  };

  async componentWillMount() {    

    //carregar Convites antes do primeiro render
    this.caregaConvitesApi();
    
  }

  state = {   
    convites: [],
    carregando: true,
  };

  caregaConvitesApi = () => {
    axios({
      method: 'post',        
      url: 'http://www.anjodaguardaeventos.com.br/rangoamigo/api/eventos/ListarConvites',    
      headers: { 'content-type': 'application/json;charset=utf-8' },                       
      data: { "CelNumero": 51999999093 } //perfil da sessao??
    }).then(response => {  

      console.log(response);

    })
    .catch((err) => {console.log(err);
    });          
  }

  selecionaConvite = evento => {
    this.props.navigation.navigate('Evento', evento);
  };

  mostraResultados = () => {
    //const { eventos } = this.state;
    return <ListaEventos recipes={this.state.convites} onSelectRecipe={this.selecionaConvite} />;
  };

  render() {
    return (
      <View style={styles.container}>        
        <View style={styles.resultsContainer}>          
          {
            this.state.carregando
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
  searchInput: {
    marginTop: 10,
    borderRadius: 6,
    borderWidth: 1,
    paddingTop: 5,
    paddingEnd: 10,
    paddingBottom: 5,
    paddingStart: 10,
  },
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
