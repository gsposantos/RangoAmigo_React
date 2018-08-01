import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,  
  StyleSheet,  
  AsyncStorage,
  Dimensions,
} from 'react-native';

import { Container, Fab, Icon, Button } from 'native-base';

import axios from 'axios';

import Modal from 'react-native-modal'; 

import DadosEvento from '../../../../componentes/DadosEvento';
import ListaContatos from '../../../../componentes/ListaContatos';

var {height, width} = Dimensions.get('window');

export default class DetalheEvento extends React.Component {

  static navigationOptions = {
      title: 'Detalhe do Evento',
  };

  state = {
    visibleModal: null,
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
    this.setState({contatos: JSON.parse(contatos)});

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
    this.setState({ visibleModal: 1 })

  }     

  selecionaContato = item => {    
    alert('Contato selecionado!');
  };
  
  carregaModalConvidados = () => (
    <View style={styles.modalContent}>      
      <View>
         <Text style={{fontSize: 24, fontWeight: 'bold', color: '#34515e', paddingBottom: 20}}> Convidados </Text>
      </View>
      <ListaContatos contatos={this.state.convidados} onSelectContato={this.selecionaContato} textoTitulo='Convidados'/>
      <View>
        <Button block style={styles.btn} onPress={() => this.setState({ visibleModal: null }) } >
          <Text style={styles.btnTxt}> Fechar </Text>
        </Button>    
      </View>
    </View>
  );

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
              
              <Button style={{ backgroundColor: '#c66600' }} onPress={this.preservaDadosConvidados}>
                <Icon type="FontAwesome" ios="users" android="users" />
              </Button>

              <Button style={{ backgroundColor: '#c66600' }}>
                <Icon type="FontAwesome" ios="edit" android="edit" />
              </Button>            
        
            </Fab>
            <Modal isVisible={this.state.visibleModal === 1}>
              {this.carregaModalConvidados()}
            </Modal>
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

  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    height:height/1.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

  btn:{
    marginStart: 80,
    marginEnd: 80,
    marginTop: 30,
    backgroundColor: '#607d8b',
    //headerTintColor: '#ff950e',
  },

  btnTxt : {
    paddingStart:20,
    paddingEnd:20,
    fontSize: 18,
    fontWeight: 'bold',     
    color: '#ebeeef'
  },
  
});

