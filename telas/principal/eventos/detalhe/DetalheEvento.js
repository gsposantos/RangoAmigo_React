import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,  
  StyleSheet,  
  AsyncStorage,
} from 'react-native';

import { Container, Fab, Icon, Button } from 'native-base';

import axios from 'axios';

import DadosEvento from '../../../../componentes/DadosEvento';

export default class DetalheEvento extends React.Component {


  static navigationOptions = {
      title: 'Detalhe do Evento',
  };

  state = {
    carregando: true,
    fabAtivo: false, 
    evento: null,
    contatos:null,
    convidados:[],
  };

  async componentDidMount() {

    console.log(this.props.navigation.state.params);
    
    const {CodEvento} = this.props.navigation.state.params;
    
    //carrega contatos ja sincronizados
    const contatos = await AsyncStorage.getItem("Contatos");
    this.setState({contatos});

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
          
          this.setState({evento: response.data.Dados, carregando: false});          
          
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
      Alert.alert('Erro', 'Erro ao consultar Evento');
    });  
  }

  preservaDadosConvidados = () =>{

    //Cruza com contatos sincronizados para decidir que campos mostrar
    //Se ta na lista de contatos, mostra todos os dados. Senão, só nome, foto e email)
    //Atualiza lista de convidados para atualizar no popup

    let contatoDisp = false;

    if(this.state.convidados.length == 0){

      for(const convidado of this.state.evento.Convidados){
        
        contatoDisp = false;
        if(this.state.contatos != null) {
          for(const contato of this.state.contatos){
            if(convidado.CelNumero == contato.phoneNumbers[0].celNumero){
              
              //adicionar o convidado numa lista no formato de contato          
              this.state.convidados.push(contato);
              contatoDisp = true;
              break;
            }
          }        
        }

        if(!contatoDisp){
          //criar um contato sem numero de telefone e add na lista        
          //convidado...  
          this.state.convidados.push({
            recordID: convidado.CelNumero,            
            emailAddresses: [{
              label: "work",
              email: convidado.Email,
            }],
            familyName: "",
            givenName: convidado.Nome,            
            middleName: "",
            phoneNumbers: [{
              label: "mobile",
              number: "",
            }],
            hasThumbnail: false,
            foto64: convidado.Foto,
          });      
        }
      }
    }

    console.log(this.state.convidados);

  }     
  

  carregaDetalheEvento = () => {
    return (
      <Container style={styles.container}>
          <DadosEvento evento={this.state.evento} />
          <Fab
              active={this.state.fabAtivo}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: '#34515e' }}
              position="bottomRight"
              onPress={() => this.setState({ fabAtivo: !this.state.fabAtivo })}>
              
              <Icon type="FontAwesome" name="ellipsis-v" />
              
              <Button style={{ backgroundColor: '#34515e' }} onPress={this.preservaDadosConvidados}>
                <Icon type="FontAwesome" ios="users" android="users" />
              </Button>

              <Button style={{ backgroundColor: '#34515e' }}>
                <Icon type="FontAwesome" ios="edit" android="edit" />
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
  container: {
    flex: 1,
    //alignItems: 'center',       
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },  


  
});

