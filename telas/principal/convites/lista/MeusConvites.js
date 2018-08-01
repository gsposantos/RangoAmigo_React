import React from 'react';
import {
  View,
  ActivityIndicator,  
  StyleSheet,
  Alert,
  AsyncStorage,
} from 'react-native';

import { 
  Fab, Icon, Button
} from 'native-base';

import axios from 'axios';

import ListaEventos from '../../../../componentes/ListaEventos';
import BotaoMenu from '../../../../componentes/BotaoMenu';


export default class MeusConvites extends React.Component {
  
  //caracteristicas da barra superior (toolbar) ... aqui deveria aparecer os botoes, por ex
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Meus Convites',
      headerLeft: (
      <BotaoMenu acaoMenu={navigation} />      
      ),
    };    
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
      //carregar Convites antes do primeiro render    
      this.carregaConvitesApi();
    }
    
  }

  state = {   
    convites: [],
    carregando: true,
    perfil:null,
  };

  carregaConvitesApi = () => {

    this.setState({carregando: true});

    axios({
      method: 'post',        
      url: 'http://www.anjodaguardaeventos.com.br/rangoamigo/api/eventos/ListarConvites',    
      headers: { 'content-type': 'application/json;charset=utf-8' },                       
      data: { "CelNumero": this.state.perfil.CelNumero }      
    }).then(response => {  

      console.log(response);
      // validar resposta
      
      if(response.data.Ok){
        if(response.data.Dados !== null){          
          this.setState({convites: response.data.Dados, carregando: false});
        }
        else{
          Alert.alert("Informação", 'Nenhum Convite encontrado.');
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

  selecionaConvite = evento => {
    this.props.navigation.navigate('DetalheConvite', evento);
    //Alert.alert('Evento', evento.NomeEvento);
  };

  mostraResultados = () => {
    //const { eventos } = this.state;
    return <ListaEventos eventos={this.state.convites} onSelect={this.selecionaConvite} />;
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
            active={false}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#34515e' }}
            position="bottomRight"
            onPress={this.carregaConvitesApi}>
            <Icon type='FontAwesome' ios='refresh' android='refresh' />                       
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
