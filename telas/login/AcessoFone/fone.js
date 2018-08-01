import React from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet,   
  Alert,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import { 
  Container,
  Item, 
  Input,
  Label, 
  Button 
} from 'native-base';

//import {NavigationActions} from 'react-navigation';

import axios from 'axios';

export default class AcessoFone extends React.Component {

  static navigationOptions = {
    title: 'Dados de Acesso',
  };

  state = {
    carregando: false,
    area: '',
    fone: '',    
  };

  async componentDidMount() {
    
    //limpa dados para fazer novo acesso sempre que essa tela aparecer
    await AsyncStorage.removeItem("Perfil");
    console.log('limpou sessao;');

  }

  desviaCadastro = () =>{

    //desvia para cadastro passando area e fone (opcional) se preenchidos    
    this.props.navigation.navigate('CadastroPerfil');

  }

  configuraParamFone = fone => {
    this.setState({fone});
  }

  configuraParamArea = area => {
    this.setState({area});
  }

  verificaPerfilApi(area, fone) {

    this.setState({ carregando: true });

    //verifica campos preenchidos.
    var isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
    if(!isNumeric.test(area) || !isNumeric.test(fone)){
      Alert.alert('Campos Inválidos!', 'Informe valores numéricos para os campos DDD e Telefone');
      this.setState({ carregando: false });
      return;      
    }
    if(area.length === 0 || fone.length === 0){
      Alert.alert('Campos Obrigatórios!', 'Preencha os campos DDD e Telefone adequadamente.');
      this.setState({ carregando: false });
      return;
    }
    
    //faz a chamada para verificar o perfil
    axios({
      method: 'post',        
      url: 'http://www.anjodaguardaeventos.com.br/rangoamigo/api/perfis/ObterPerfil',    
      headers: { 'content-type': 'application/json;charset=utf-8' },                       
      //data: { "CelNumero": 51999999093 } 
      data: { "CelNumero": area+fone }, //51999999093 - teste
    }).then(response => {  

      console.log(response);
      //salva dados na sessao      
      if(response.data.Ok){
        if(response.data.Dados !== null){

          //desvia proxima etapa passando os dados               
          this.props.navigation.navigate('AcessoPin', response.data.Dados);

        }
        else{
          Alert.alert("Informação", "Perfil não cadastrado.");
        }                
      }  
      else
      {
        Alert.alert("Informação", response.data.Mensagem);
      }      
    })
    .catch((err) => {
      console.log(err);

    });    
  }


  render() {
    return (          
            <Container>
            {
            this.state.carregando            
              ? <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}> 
                  <ActivityIndicator size="large" color="#000"/> 
                </View>
              : <View style={styles.container}>
                  <View style={styles.topo}>
                    <Text style={styles.textoTopo}>
                      Para acessar, por favor, informe seu número de telefone com código de área.
                    </Text>
                  </View>
                  <View style={styles.formulario}>
                    <View  style={styles.campos}>
                      <View style={styles.campoArea}> 
                        <Item floatingLabel style={{ borderColor: '#34515e' }}>
                          <Label style={{ color: "#ff950e", }} >DDD</Label>
                          <Input style={{ color: "#ff950e" }} maxLength={2} keyboardType='numeric' onChangeText={this.configuraParamArea} />
                        </Item>
                      </View>
                      <View  style={styles.campoFone}>
                        <Item floatingLabel style={{ borderColor: '#34515e' }}>
                          <Label style={{ color: "#ff950e", }} >Telefone</Label>
                          <Input style={{ color: "#ff950e" }} maxLength={9} keyboardType='numeric' onChangeText={this.configuraParamFone} />
                        </Item>
                      </View>
                    </View>
                    <View>
                      <Button block style={styles.btn} onPress={_ => this.verificaPerfilApi(this.state.area, this.state.fone)} >
                        <Text style={styles.btnTxt}> Avançar </Text>
                      </Button>             
                      <Button block style={styles.btn} onPress={this.desviaCadastro} >
                        <Text style={styles.btnTxt}> Novo Acesso </Text>
                      </Button>    
                    </View>
                  </View>
                </View>
            }
            </Container>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: 25,   
    backgroundColor: '#ebeeef',
  },
  topo: {
    flex:2,
    justifyContent:'center',    
    //backgroundColor: 'red',   
  },
  formulario: {
    flex: 8,   
  },
  campos: {   
    flexDirection: 'row',   
    //alignItems: 'flex-start',    
  },

  campoArea: {

    flex: 3, 
    paddingStart: 30,
    paddingEnd: 5,
    //backgroundColor: 'yellow',   

    // flex: 2,
    // paddingStart: 50,
    // paddingEnd: 5,    
    alignItems: 'flex-start',
    // justifyContent: 'center',
  },

  campoFone: {
    //backgroundColor: '#95ff0e',
    flex: 7, 
    paddingStart: 5,
    paddingEnd: 30,

    // flex: 6,
    // paddingStart: 5,
    // paddingEnd: 50,    
    // justifyContent: 'center',
    // alignItems: 'flex-start',
  },

  botoes: {
    flex: 8,
    //paddingTop: 10,
    //flexDirection: 'row',      
    alignContent: 'center',
  },
 
  btn:{
    paddingStart: 20,
    paddingEnd: 20,
    marginStart: 80,
    marginEnd: 80,
    marginTop: 30,
    backgroundColor: '#607d8b',
    //headerTintColor: '#ff950e',
  },

  btnTxt : {
    fontSize: 18,
    fontWeight: 'bold',     
    color: '#ebeeef'
  },

  textoTopo: {
    margin: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
