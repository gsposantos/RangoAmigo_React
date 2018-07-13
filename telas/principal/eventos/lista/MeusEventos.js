import React from 'react';
import {
  View, Button,
  ActivityIndicator,  
  StyleSheet,
} from 'react-native';

import axios from 'axios';

import ListaEventos from '../../../../componentes/ListaEventos';   
import BotaoMenu from '../../../../componentes/BotaoMenu';                    

export default class MeusEventos extends React.Component {
  
  //caracteristicas da barra superior (toolbar) ... aqui deveria aparecer os botoes, por ex
  static navigationOptions = ({ navigation }) => {

    //console.log(navigation);

    return {
      title:'Meus Eventos',

    headerLeft: (
      <Button
         onPress={() => alert('DrawerOpen') }
         title=" = "
         color="#000"
       />
    ),
  
    // headerStyle: {
    //   backgroundColor: '#607d8b',
    // },
    // headerTintColor: '#ff950e',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // },
    
    // headerLeft: (
    //   <Button
    //      onPress={() => navigation.navigate('DrawerOpen') }
    // //     //executa metodo da componente recebido por parametro
    // //     //onPress={navigation.getParam('increaseCount')}
    // //     //abre ModalScreen
    // //     //onPress={() => navigation.navigate('MyModal')}
    //      title=" = "
    //      color="#000"
    //    />
    // ),      
    // headerRight: (
    //   <Button
    //     onPress={() => alert('This is a button!')}
    //     //executa metodo da componente recebido por parametro
    //     //onPress={navigation.getParam('increaseCount')}
    //     //abre ModalScreen
    //     //onPress={() => navigation.navigate('MyModal')}
    //     title=" = "
    //     color="#000"
    //   />
    // ),
    };
  };
  
  // static navigationOptions = {
  //   title: 'Meus Eventos',
  // };

  state = {   
    eventos: [],
    carregando: true,
  };

  async componentWillMount() {    

    //this.props.navigation.openDrawer();

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
