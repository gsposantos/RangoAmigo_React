import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,  
  StyleSheet,  
} from 'react-native';

import { Container, Fab, Icon, Button } from 'native-base';

import axios from 'axios';

import DadosEvento from '../../../../componentes/DadosEvento';


export default class DetalheConvite extends React.Component {

    static navigationOptions = {
        title: 'Detalhe do Convite',
    };

    state = {
      carregando: true,
      fabAtivo: false, 
      convite: null,
    };

  async componentDidMount() {

    console.log(this.props.navigation.state.params);
    
    const {CodEvento} = this.props.navigation.state.params;
    // const fullRecipe = await fetchFullRecipe(recipe_id);
    // this.setState({fullRecipe});

    this.carregaDetalheEventoApi(CodEvento);

  }

  carregaDetalheEventoApi = (codEvento) => {

    //console.log(this.state.perfil);

    this.setState({carregando: true});

    axios({
      method: 'get',        
      url: 'http://www.anjodaguardaeventos.com.br/rangoamigo/api/eventos/DetalharEvento?codEvento=' + codEvento,
      //headers: { 'content-type': 'application/json;charset=utf-8' },                       
      //data: { "CelNumero": 51999999093 } //perfil da sessao que ja ta no state?
    }).then(response => {  

      console.log(response);      
      
      // validar resposta
      if(response.data.Ok){
        if(response.data.Dados != null){
          
          this.setState({convite: response.data.Dados, carregando: false});

        }
        else{
            Alert.alert('Informação', response.Mensagem);            
          }
        }
      else{
        Alert.alert('Informação', response.data.Mensagem);
      }

    })
    .catch((err) => {
      console.log(err);
      Alert.alert('Erro', 'Erro ao consultar Convite');
    });  
  }

  carregaDetalheEvento = () => {
    return (
      <Container style={styles.conteudo}>
          <DadosEvento evento={this.state.convite} />
          <Fab
              active={this.state.fabAtivo}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: '#34515e' }}
              position="bottomRight"
              onPress={() => this.setState({ fabAtivo: !this.state.fabAtivo })}>
              
              <Icon type="FontAwesome" name="ellipsis-v" />
              
              <Button style={{ backgroundColor: '#34515e' }}>
                <Icon type="FontAwesome" ios="users" android="users" />
              </Button>

              <Button style={{ backgroundColor: '#34515e' }}>
                <Icon type="FontAwesome" ios="calendar" android="calendar" />
              </Button>            
        
            </Fab>
          </Container>
    );
  }

render() {
  
    return(

      this.state.carregando            
      ? <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}> 
          <ActivityIndicator size="large" color="#000"/> 
        </View>
      :
        this.carregaDetalheEvento()        
    );
  }
}

const styles = StyleSheet.create({
  conteudo: {
    flex: 1,
    //alignItems: 'center',       
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },  
});
