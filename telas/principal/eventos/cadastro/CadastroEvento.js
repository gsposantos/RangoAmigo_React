import React, { Component } from 'react';
import { 
  ScrollView, 
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

import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker';

export default class CadastroEvento extends Component {

static navigationOptions = {
    title: 'Cadastro do Evento',
};

  state={                
        etapa:1,

        carregando:false,
        isDateTimePickerVisible: false,
        inputDataEvento:'dd/mm/yyyy hh:mm',        
        dataEvento:'',
        nomeEvento:'',
        nomeLocal:'',
        endereco:'',
        imagemEvento:'',
  }

  apresentaImagem(){      

        if(this.state.imagemEvento != ''){
            return <Image  resizeMode="contain" style={styles.foto} source={{uri: 'data:image/(png|tiff|jpg|gif);base64,' + this.state.imagemEvento.toString()}} />
        }
        else {
            return <Icon type='FontAwesome' ios='image' android='image' style={{fontSize: 80, color: '#8eacbb'}} />
        }
    }    
  
  mostraDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  esconteDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  selecionaDateTime = (date) => {
    
    //salvar estado com formato certo
    this.setState({ inputDataEvento: date.toString(), dataEvento: date.toISOString(), });
    this.esconteDateTimePicker();
  };

  configuraEtapa = () => {
    
    let etapa = 0;
    if(this.state.etapa == 1){

        //inicia criação do evento...

        etapa = 2;
    }
    else {
        //reinicia criação do evento...

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

        //let source = { uri: response.uri };  
        let source = { uri: 'data:image/(png|tiff|jpg|gif);base64,' + response.data };

        
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

  configuraParamEndereco = endereco => {
      this.setState({endereco});
  }

  render() {
    return (
      <Container>               
        <Content>          
          <View style={{ backgroundColor: '#fff', }}>
            {
              this.state.carregando
                ? <ActivityIndicator size="large" color="#000"/>
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
                                  //onChangeText={this.configuraParamEmail}
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
                        <Text > Contatos... </Text>
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
      height: 130, width: 130,
      //width: undefined, height: undefined

    },

  });