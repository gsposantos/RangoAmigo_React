import React from 'react';
import {
  AsyncStorage,
  View,
  ActivityIndicator,  
  StyleSheet,
  Alert,
} from 'react-native';

import { 
  Fab, Icon, Button
} from 'native-base';

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
    fabAtivo: false,    
    carregando: true,
    eventos: [],
    perfil:null,
  };

  async componentDidMount() {    

    //Verifica perfil logado
    var perfil = await AsyncStorage.getItem("Perfil");
    
    if(perfil === null || perfil === 'undefined'){
      
      const navigateAction = NavigationActions.navigate({
        routeName: 'Login'
      });
      
      this.props.navigation.dispatch(navigateAction);
    }    
    else{
      this.setState({perfil: JSON.parse(perfil)});
      //carregar Eventos antes do primeiro render
      this.carregaEventosApi();
    }
    
  }

  carregaEventosApi = () => {

    
    //console.log(this.state.perfil);

    this.setState({carregando: true});

    axios({
      method: 'post',        
      url: 'http://www.anjodaguardaeventos.com.br/rangoamigo/api/eventos/ListarEventos',    
      headers: { 'content-type': 'application/json;charset=utf-8' },                       
      data: { "CelNumero": this.state.perfil.CelNumero } //perfil da sessao que ja ta no state?
      //data: { "CelNumero": 51999999093 } //perfil da sessao que ja ta no state?
    }).then(response => {  

      console.log(response);      
      // validar resposta      

      if(response.data.Ok){
        if(response.data.Dados !== null){
          this.setState({eventos: response.data.Dados, carregando: false});
        }
        else{
          Alert.alert("Informação", 'Nenhum Evento encontrado.');
          this.setState({carregando: false});
        }                
      }  
      else
      {
        Alert.alert("Informação", response.data.Mensagem);
        this.setState({carregando: false});
      }      

    })
    .catch((err) => {console.log(err);
    });          
  }

  selecionaEvento = evento => {
    this.props.navigation.navigate('DetalheEvento', evento);
    //Alert.alert('Evento', evento.NomeEvento);
  };

  direcionaNovoEvento = () => {
    this.props.navigation.navigate('CadastroEvento');    
  };

  mostraResultados = () => {
    //const { eventos } = this.state;
    return <ListaEventos eventos={this.state.eventos} onSelect={this.selecionaEvento} />;
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
        <Fab
            active={this.state.fabAtivo}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#34515e' }}
            position="bottomRight"
            onPress={() => this.setState({ fabAtivo: !this.state.fabAtivo })}>
            <Icon type='FontAwesome' ios='ellipsis-v' android='ellipsis-v' />           
            <Button 
              style={{ backgroundColor: '#c66600' }}
              onPress={this.direcionaNovoEvento}>
              <Icon type='FontAwesome' ios='plus' android='plus' />
            </Button>
            <Button 
              style={{ backgroundColor: '#c66600' }}
              onPress={this.carregaEventosApi}>
              <Icon type='FontAwesome' ios='refresh' android='refresh' />
            </Button>          
          </Fab>  
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebeeef',
  },  
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
