import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,  
  StyleSheet,  
  AsyncStorage,
  Dimensions,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { Container, Fab, Icon, Button } from 'native-base';

import axios from 'axios';

import Modal from 'react-native-modal'; 
import DateTimePicker from 'react-native-modal-datetime-picker';

import DadosEvento from '../../../../componentes/DadosEvento';
import ListaContatos from '../../../../componentes/ListaContatos';

var {height, width} = Dimensions.get('window');

export default class DetalheConvite extends React.Component {

    static navigationOptions = {
        title: 'Detalhe do Convite',
    };

    state = {
      visibleDateTimePicker: false,
      visibleModal: null,
      carregando: true,
      fabAtivo: false, 
      convite: null,
      conviteAux: null,
      perfil:null,
      contatos:null,      
      convidados:[],
    };

  async componentDidMount() {

    console.log(this.props.navigation.state.params);
    
    const {CodEvento} = this.props.navigation.state.params;
    
    //carrega contatos ja sincronizados
    const contatos = await AsyncStorage.getItem("Contatos");
    this.setState({contatos: JSON.parse(contatos)});
   
    const perfil = await AsyncStorage.getItem("Perfil");
    this.setState({perfil: JSON.parse(perfil)});

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
          
          this.setState({ 
                          convite: response.data.Dados, 
                          conviteAux: JSON.parse(JSON.stringify(response.data.Dados)),
                          carregando: false
                        });

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

  mostraDateTimePicker = () => {

    Alert.alert(
      'Sugerir Data',
      'Você deseja sugerir uma nova data para esse evento?',
      [
        {text: 'Não', onPress: () => console.log('Escolheu não'), style: 'cancel'},
        {text: 'Sim', onPress: () => this.setState({ visibleDateTimePicker: true })},
      ],
      { cancelable: false })   
  }

  sugerirDataEvento = (datetime) => {

    console.log(datetime);

    let eventoAux =  {
                      CodEvento: this.state.convite.CodEvento,
                      Datas:[
                        {
                          DiaEvento: datetime.toISOString(), //"2018-05-23T20:40:00.000+0000"
                          Original: false,                          
                          Participacao:[
                            {
                              CelNumero: this.state.perfil.CelNumero,
                              Voto: true
                            }
                          ],            
                        }
                      ],
                    };

    this.setState({ carregando: true, visibleDateTimePicker: false }); 

    axios({
      method: 'post',        
      url: 'http://www.anjodaguardaeventos.com.br/rangoamigo/api/eventos/SugerirDataEvento',
      headers: { 'content-type': 'application/json;charset=utf-8' },                       
      data: JSON.stringify(eventoAux)
    }).then(response => { 

      if(response.data.Ok){        


          Alert.alert('Ok!', 'Data incluída com sucesso.');
          this.carregaDetalheEventoApi(this.state.convite.CodEvento);

      }
      else{
        Alert.alert('Informação', response.data.Mensagem);
      }
    })
    .catch((err) => {console.log(err);
      Alert.alert('Erro!', 'Erro.');
      this.setState({ carregando: false }); 
    });    

  }

  votarDataEvento = () => {

    //enviar datas com participacao do perfil
    let listaDatas = [];
    

    //percorre conviteAux procurando participaçoes do perfil
    for(const data of this.state.conviteAux.Datas){        
      data.Participacao = data.Participacao.filter(participante => participante.CelNumero == this.state.perfil.CelNumero);
      listaDatas.push(data);
    }

    let eventoAux =  {
                      CodEvento: this.state.conviteAux.CodEvento,
                      Datas: listaDatas,
                     };
/*  
    this.carregaDetalheEventoApi(this.state.conviteAux.CodEvento)
*/
    this.setState({ carregando: true, visibleModal: null}); 

    axios({
      method: 'post',        
      url: 'http://www.anjodaguardaeventos.com.br/rangoamigo/api/eventos/VotarDataEvento',
      headers: { 'content-type': 'application/json;charset=utf-8' },                       
      data: JSON.stringify(eventoAux)
    }).then(response => { 

      if(response.data.Ok){        


          Alert.alert('Ok!', 'Disponibilida regristrada com sucesso.');
          this.carregaDetalheEventoApi(this.state.conviteAux.CodEvento);

      }
      else{
        Alert.alert('Informação', response.data.Mensagem);
      }
    })
    .catch((err) => {console.log(err);
      Alert.alert('Erro!', 'Erro.');
      this.setState({ carregando: false }); 
    });    
  }

  escondeDateTimePicker = () => this.setState({ visibleDateTimePicker: false });

  preservaDadosConvidados = () =>{

    //Cruza com contatos sincronizados para decidir que campos mostrar
    //Se ta na lista de contatos, mostra todos os dados. Senão, só nome, foto e email)
    //Atualiza lista de convidados para atualizar no popup

    let contatoDisp = false;
    
    if(this.state.convidados.length == 0){

      for(const convidado of this.state.convite.Convidados){
        
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
          <Text style={styles.tituloModal}> Lista de Convidados </Text>        
      </View>
      <ListaContatos contatos={this.state.convidados} onSelectContato={this.selecionaContato} />
      <View>
        <Button block style={styles.btn} onPress={() => this.setState({ visibleModal: null }) } >
          <Text style={styles.btnTxt}> Fechar </Text>
        </Button>    
      </View>
    </View>
  );

  carregaModalDatasEventoVoto = () => (
    <View style={styles.modalContent}>      
      <View>        
          <Text style={styles.tituloModal}> Informe sua Diponibilidade </Text>        
      </View>
      <FlatList
          style={{width: '100%'}}
          data={this.state.conviteAux.Datas}
          keyExtractor={data => data.DiaEvento.toString()}
          renderItem={this.renderDataEventoVoto}
      />      
      <View>
        <Button block style={styles.btn} onPress={this.votarDataEvento} >
          <Text style={styles.btnTxt}> Salvar </Text>
        </Button>    
      </View>
      <View>
        <Button block style={styles.btn} onPress={() => this.setState({ visibleModal: null }) } >
          <Text style={styles.btnTxt}> Fechar </Text>
        </Button>    
      </View>
    </View>
   );
  
  
   renderDataEventoVoto = ({ item }) => {
    
    //let voto = false;
    let idxParticipante = 0;

    for(const participante of item.Participacao){
      
      if(participante.CelNumero === this.state.perfil.CelNumero){        
        break;
      }

      idxParticipante++
    }

    return (      

      <TouchableOpacity onPress={() => {this.selecionaVotoDataEvento(item, idxParticipante)}}>
        <View style={{ flexDirection:'row', alignItems: 'center', justifyContent: 'center', paddingTop:20, }} >             
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#607d8b',}} >{ item.DiaEventoFormatado }</Text>
          {
             (item.Participacao[idxParticipante].Voto) 
             ?
              <Icon ios="ios-checkbox" android="ios-checkbox" style={styles.checkbox}/>
             : 
              <Icon ios="ios-square-outline" android="ios-square-outline" style={styles.checkbox}></Icon>
          }
        </View>
      </TouchableOpacity>

    );

  }

  selecionaVotoDataEvento = (item, index) => {

    for(data of this.state.conviteAux.Datas){
      if(item.DiaEvento == data.DiaEvento) {
          data.Participacao[index].Voto = !item.Participacao[index].Voto;
          break;
      }
    }
    this.setState({conviteAux: this.state.conviteAux})
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
              
              <Button style={{ backgroundColor: '#c66600' }} onPress={this.preservaDadosConvidados}>
                <Icon type="FontAwesome" ios="users" android="users" />
              </Button>

              <Button style={{ backgroundColor: '#c66600' }} onPress={this.mostraDateTimePicker} >
                <Icon type="FontAwesome" ios="calendar" android="calendar" />
              </Button>            

              <Button style={{ backgroundColor: '#c66600' }}>
                <Icon type="FontAwesome" ios="check" android="check" onPress={() => this.setState({ visibleModal: 2 }) } />
              </Button>  
        
            </Fab>
            <Modal isVisible={this.state.visibleModal === 1}>
              {this.carregaModalConvidados()}
            </Modal>
            <Modal isVisible={this.state.visibleModal === 2}>
              {this.carregaModalDatasEventoVoto()}
            </Modal>
            <DateTimePicker
              isVisible={this.state.visibleDateTimePicker}
              onConfirm={this.sugerirDataEvento}
              onCancel={this.escondeDateTimePicker}
              mode='datetime'
            />
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

  checkbox: {
    paddingStart: 10, 
    fontSize: 35, 
    color: '#607d8b'
  },

  btnTxt : {
    fontSize: 18,
    fontWeight: 'bold',     
    color: '#ebeeef',
    paddingStart:20,
    paddingEnd:20,
  },

  tituloModal: {        
    fontSize: 24,
    fontWeight: 'bold',    
    color: '#34515e',
  },
});
