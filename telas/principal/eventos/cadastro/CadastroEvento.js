import React, { Component } from 'react';
import { 
  Dimensions, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity ,
  Image,
  Alert,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

import { 
  Container,
  Item, 
  Input,
  Label,   
  Button,
  Icon, 
  Header,
  Content,
  Footer,  
  Left,
  Right,
} from 'native-base';

import axios from 'axios';

import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker';

import ListaContatos from '../../../../componentes/ListaContatos';

export default class CadastroEvento extends Component {

static navigationOptions = {
    title: 'Cadastro do Evento',
};

  state={                
        etapa:1,
        perfil:null,
        contatos:[],
        carregando:false,
        isDateTimePickerVisible: false,
        inputDataEvento:'dd/mm/yyyy hh:mm',        
        dataEvento:'',
        nomeEvento:'Evento Teste',
        nomeLocal:'Local Teste',
        endereco:'Av Teste, 123',
        imagemEvento:'',
        eventoTemp:null,
  }

  apresentaImagem(){      

        if(this.state.imagemEvento != ''){
            return <Image  style={styles.foto} source={{uri: 'data:image/(png|tiff|jpg|gif);base64,' + this.state.imagemEvento.toString()}} />
        }
        else {
            return <Icon type='FontAwesome' ios='image' android='image' style={{fontSize: 80, color: '#8eacbb'}} />
        }
    }    
  
  mostraDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  esconteDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  selecionaDateTime = (date) => {
    
    //salvar estado com formato certo
    this.setState({ inputDataEvento: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(), 
                    dataEvento: date.toISOString(), 
                  });
    this.esconteDateTimePicker();
  };

  salvarEventoApi= () => {

    //this.setState({ carregando: true });
    
    //convert contatos para convidados
    let selecionados = this.state.contatos.filter(contato => contato.selecionado);
    
    if(selecionados.length > 0){
      for(const contato of selecionados){
        this.state.eventoTemp.Convidados.push({
                                Organizador: false,
                                CelNumero: contato.phoneNumbers[0].celNumero,
        });
      }
    }
    else{
      Alert.alert('Campos Obrigatórios!', 'Selecione pelo menos um convidado da sua lista de contatos.');
      this.setState({ carregando: false });
    }

    console.log(this.state.eventoTemp);
    //chamada API

    this.setState({ carregando: true });
    axios({
      method: 'post',        
      url: 'http://www.anjodaguardaeventos.com.br/rangoamigo/api/eventos/Incluir',
      headers: { 'content-type': 'application/json;charset=utf-8' },                       
      data: JSON.stringify(this.state.eventoTemp)
    }).then(response => { 

      console.log(response);      
      
      // validar resposta
      if(response.data.Ok){
        if(response.data.Dados != null){
          
          Alert.alert('Sucesso!', 'Evento cadastrado com sucesso.');  
          this.setState({eventoTemp: null, carregando: false});
          
          this.props.navigation.goBack();
        }
        else{
            Alert.alert('Informação', response.Mensagem);            
            this.setState({ carregando: false });
          }
        }
      else{
        Alert.alert('Informação', response.data.Mensagem);
        this.setState({ carregando: false });
      }
    });
  }

  configuraEtapa = () => {
    
    let etapa = 0;

    
    if(this.state.etapa == 1){

        //this.setState({ carregando: true });

        //validaçoes
        if(this.state.nomeEvento.length === 0){
          Alert.alert('Campos Obrigatórios!', 'Preencha o nome do evento adequadamente.');
          this.setState({ carregando: false });
          return;
        }
        
        if(this.state.nomeLocal.length === 0){
          Alert.alert('Campos Obrigatórios!', 'Preencha o local do evento adequadamente.');
          this.setState({ carregando: false });
          return;
        }

        if(this.state.endereco.length === 0){
          Alert.alert('Campos Obrigatórios!', 'Preencha o endereço adequadamente.');
          this.setState({ carregando: false });
          return;
        }

        if(this.state.dataEvento.length === 0){
          Alert.alert('Campos Obrigatórios!', 'Escolha uma data para o evento.');
          this.setState({ carregando: false });
          return;
        }

        if(this.state.imagemEvento.length === 0){
          Alert.alert('Campos Obrigatórios!', 'Escolha uma imagem  para o evento.');
          this.setState({ carregando: false });
          return;
        }

        //inicia criação do evento...
        let eventoTemp =  {
                            NomeEvento: this.state.nomeEvento,
                            NomeLocal: this.state.nomeLocal,
                            Endereco: this.state.endereco,
                            Latitude: 0,
                            Longitude: 0,
                            Imagem: this.state.imagemEvento,                            
                            Datas:[
                              {
                                DiaEvento: this.state.dataEvento, //"2018-05-23T20:40:00.000+0000"
                                Original: false,                          
                                Participacao:[
                                  {
                                    CelNumero: this.state.perfil.CelNumero.toString(),
                                    Voto: true
                                  }
                                ],            
                              }
                            ],
                            Convidados: [
                              {                                                                
                                Organizador: true,
                                CelNumero: this.state.perfil.CelNumero.toString(),
                              }
                            ],
                          };

        this.setState({eventoTemp: eventoTemp,});
        etapa = 2;
    }
    else {
        //reinicia criação do evento...
        this.setState({eventoTemp: null});        
        etapa = 1;
    }

    this.setState({etapa});

  } 

  configuraParamImagem = () => {
     
    ImagePicker.showImagePicker((response) => {
    
      if (response.didCancel) {
        console.log('Usuário cancelou');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {    
        this.setState({imagemEvento: response.data});
      }
    });
  } 

  configuraParamNomeEvento = nomeEvento => {
      this.setState({nomeEvento});
  }

  configuraParamNomeLocal = nomeLocal => {
      this.setState({nomeLocal});
  }

  selecionaContato = item => {    
    item.selecionado = !item.selecionado;
    this.setState({contatos: this.state.contatos});
  }

  configuraParamEndereco = endereco => {
      this.setState({endereco});
  }

  renderListaContatos = () => {
    return <ListaContatos contatos={this.state.contatos} onSelectContato={this.selecionaContato} />;  
  };

  async componentDidMount() {   
    
        //Verifica perfil logado
    let jsonPerfil = await AsyncStorage.getItem("Perfil");    
    let perfil = JSON.parse(jsonPerfil)

     //Verifica contatos em sessao      
     var contatosCache = await AsyncStorage.getItem("Contatos");
      
     if(contatosCache === null || contatosCache === 'undefined'){
      Alert.alert(
        'Convidados do Evento',
        'Sincronize seus contatos antes de continuar com o cadastro do evento.'
      );
     }    
     else{
       contatoCache = JSON.parse(contatosCache).filter(contato => contato.cadastrado); 
       if(contatoCache.length>0) {
         this.setState({perfil: perfil, contatos: contatoCache});
       }
       else{
        Alert.alert(
          'Convidados do Evento',
          'Não foram encontrados contatos na sua agenda que estejam cadastrados no sistema.'
        );
       }

     }
  }

  render() {
    return (
      <Container>               
        <Content>          
          <View style={{ backgroundColor: '#ebeeef', }}>
            {
              this.state.carregando              
                ? 
                  <Container style={{ flex: 1, marginTop: 20, marginStart: 10, marginEnd: 10, }}>
                    <ActivityIndicator size="large" color="#000"/>
                  </Container>
                : 
                  (this.state.etapa == 1) 
                  ?               
                    <Container style={{ flex: 1, marginTop: 20, marginStart: 10, marginEnd: 10, }}>
                      <View style={{flex:3}}>             

                        <View style={{flex:1, position: 'relative', justifyContent: 'center', alignItems: 'center', borderWidth:1, }}>   
                          <TouchableOpacity onPress={this.configuraParamImagem}>     
                            {
                              this.apresentaImagem()                  
                            }                
                          </TouchableOpacity>
                        </View>      

                      </View>                                   

                      <View style={{flex:7,}}>   
                        <View style={{ marginTop: 10,}}>             
                          <Item floatingLabel style={{ borderColor: '#34515e' }}>
                            <Label style={{ color: "#ff950e" }} >Nome do Evento</Label>
                            <Input style={{ color: "#ff950e" }} 
                                  maxLength={40}                             
                                  onChangeText={this.configuraParamNomeEvento} 
                                  value={this.state.nome} />
                          </Item>
                        </View>

                        <View style={{ marginTop: 10,}}>
                          <Item floatingLabel style={{ borderColor: '#34515e' }}>
                            <Label style={{ color: "#ff950e" }} >Local do Evento</Label>
                            <Input style={{ color: "#ff950e" }} 
                                  maxLength={50}                             
                                  onChangeText={this.configuraParamNomeLocal}
                                  value={ this.state.email } />
                          </Item>
                        </View>  

                        <View style={{ marginTop: 10,}}>
                          <Item floatingLabel style={{ borderColor: '#34515e' }}>
                            <Label style={{ color: "#ff950e" }} >Endereço</Label>
                            <Input style={{ color: "#ff950e" }} 
                                  maxLength={120}                             
                                  onChangeText={this.configuraParamEndereco}
                                  value={ this.state.email } />
                          </Item>
                        </View>

                        <View style={{ marginTop: 10,}}>
                          <Item floatingLabel style={{ borderColor: '#34515e' }} onPress={this.mostraDateTimePicker} >
                            <Label style={{ color: "#ff950e" }} >Data do Evento</Label>
                            <Input style={{ color: "#ff950e" }} 
                                  maxLength={40}           
                                  editable={false}    
                                  keyboardType='numeric'                                   
                                  value={ this.state.inputDataEvento } />
                          </Item>
                        </View>
                       
                    </View>                              
                    </Container>  
                  : 
                    <Container>                            
                      <Content>      
                        <View style={{flex:2, backgroundColor:'#34515e', justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={{fontSize: 22, fontWeight: 'bold', color: '#ebeeef',}} >Contatos Cadastrados</Text>
                        </View>                   
                        <View style={{flex:8,}}>
                          { this.renderListaContatos() }
                        </View>                   
                      </Content> 
                    </Container>  
            }
            </View>
             <DateTimePicker
                mode='datetime' 
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.selecionaDateTime}
                onCancel={this.esconteDateTimePicker}
            />
        </Content>        
        <Footer style={{backgroundColor:'#ffc64b', height:35, justifyContent: 'center', alignItems: 'center',}}>
        {
          (this.state.etapa == 1)
          ? <Left />
          : 
            <Left>            
                <Button transparent style={styles.btn} onPress={this.configuraEtapa}>              
                    <Text style={{color: "#34515e", fontWeight:'bold',}} >VOLTAR</Text>
                </Button>            
            </Left>            
        }
        <Text style={{color: "#34515e",}} > {this.state.etapa.toString()} / 2 </Text>
        {
        (this.state.etapa == 2)
        ? 
        <Right>
            <Button transparent style={styles.btn} onPress={this.salvarEventoApi}>                
                <Text style={{color: "#34515e", fontWeight:'bold',}} >GRAVAR</Text>
            </Button>            
        </Right>
        : 
        <Right >
            <Button transparent style={styles.btn} onPress={this.configuraEtapa}>                
            <Text style={{color: "#34515e", fontWeight:'bold',}} >AVANÇAR</Text>
            </Button>            
        </Right >
        }
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
     
    botoes: {
      flex: 8,        
      alignContent: 'center',
    },
   
    btn:{
      margin: 20,            
    },
  
    btnTxt : {
      fontSize: 18,
      fontWeight: 'bold',     
      color: '#ebeeef'
    }, 

    foto: {
      //backgroundColor: "#056ecf",
      //flex: 1,
      height: 190, 
      width: Dimensions.get('window').width - 30,
      //width: undefined, height: undefined

    },

  });