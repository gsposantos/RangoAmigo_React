import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity ,
  Image,
  AsyncStorage
} from 'react-native';

import { 
  Container,
  Item, 
  Input,
  Label,   
  Button,
  Icon,  
} from 'native-base';

import axios from 'axios';

import BotaoMenu from '../../../componentes/BotaoMenu';

export default class CadastroPerfil extends React.Component {

    //aqui vai o botao?? EX: https://github.com/react-navigation/react-navigation/issues/1122
   static navigationOptions = ({ navigation }) => {
      return {
        title: 'Cadastro Perfil',
        headerLeft: (
          null
        ),
      };    
    };

    state={      
      perfil: null,
      foto: '',
      area: '',
      fone: '',
      nome: '',
      email: '',

    }

    configuraParamEmail = email => {
      this.setState({email});
    }
  
    configuraParamNome= nome => {
      this.setState({nome});
    }
    
    configuraParamFone = fone => {
      this.setState({fone});
    }

    configuraParamArea = area => {
      this.setState({area});
    }  

    executaVoltar = area => {

      console.log(this.props.navigation.goBack);

      if(this.props.navigation){
        this.props.navigation.goBack();
      }
      else{
        //desvia tela principal
        const navigateAction = NavigationActions.navigate({
          routeName: 'Principal'
        });    
        this.props.navigation.dispatch(navigateAction);
      }
    }    

    async componentDidMount() {    

      //Verifica perfil logado
      var jsonPerfil = await AsyncStorage.getItem("Perfil");
      
      if(jsonPerfil !== null && jsonPerfil !== 'undefined'){
        this.setState({perfil: JSON.parse(jsonPerfil)});
      }    
    }

    apresentaImagem(carregaDados){      
      if(carregaDados){
        return <Image  resizeMode="contain" style={styles.foto} source={{uri: 'data:image/png;base64,' + this.state.perfil.Foto.toString()}} />
      }
      else {
         return <Icon type='FontAwesome' ios='user' android='user' style={{fontSize: 80, color: '#8eacbb'}} />          
      }

    }    

    // apresentaCampoTexto(carregado, label, valor)
    // {
    //   return 
    //   <Item floatingLabel style={{ borderColor: '#34515e' }}>
    //     <Label style={{ color: "#ff950e" }} >label</Label>
    //     <Input  style={{ color: "#ff950e" }} 
    //           maxLength={4} 
    //           keyboardType='numeric' 
    //           editable={!carregado} 
    //           onChangeText={this.configuraParamArea} 
    //           value={carregado ? valor : ''} />
    //   </Item>
    // }
    
    render(){
  
     //this.carregarContatosDipositivo();
     var area = '';
     var telefone = '';
     var carregaDados = false;
     if(this.state.perfil !== null){
        carregaDados = true;
        area = this.state.perfil.CelNumero.toString().substring(0,2); 
        telefone = this.state.perfil.CelNumero.toString().substring(2);
     }
  
      return (
        <ScrollView style={{ backgroundColor: '#fff',  }}>
          <Container style={{ flex: 1, marginTop: 20, marginStart: 10, marginEnd: 10, }}>
            <View style={{flexDirection:'row', flex:2}}>             

                <View style={{flex:4, position: 'relative', justifyContent: 'center', alignItems: 'center', borderWidth:1, }}>   
                  <TouchableOpacity onPress={() => alert('procurar a foto...')}>     
                    {
                      this.apresentaImagem(carregaDados)                  
                    }                
                  </TouchableOpacity>
                </View>      
                

              <View style={{flex:6, marginStart: 20, }}>
                <View style={{ marginEnd: 130, marginTop: 10,}}>

                  <Item floatingLabel style={{ borderColor: '#34515e' }}>
                    <Label style={{ color: "#ff950e" }} >DDD</Label>
                    <Input  style={{ color: "#ff950e" }} 
                            maxLength={4} 
                            keyboardType='numeric' 
                            editable={!carregaDados} 
                            onChangeText={this.configuraParamArea} 
                            value={carregaDados ? area : ''} />
                  </Item>

                </View>    
                <View style={{ marginTop: 10,}}>
                  <Item floatingLabel style={{ borderColor: '#34515e' }}>
                    <Label style={{ color: "#ff950e" }} >Telefone</Label>
                    <Input  style={{ color: "#ff950e" }} 
                            maxLength={4} 
                            keyboardType='numeric' 
                            editable={!carregaDados} 
                            onChangeText={this.configuraParamFone} 
                            value={carregaDados ? telefone : ''} />
                  </Item>
                </View>        
              </View>      
            </View>
            <View style={{flex:8,}}>   
              <View style={{ marginTop: 10,}}>             
                <Item floatingLabel style={{ borderColor: '#34515e' }}>
                  <Label style={{ color: "#ff950e" }} >Nome</Label>
                  <Input style={{ color: "#ff950e" }} 
                         maxLength={100} 
                         keyboardType='numeric' 
                         onChangeText={this.configuraParamNome} 
                         value={carregaDados ? this.state.perfil.Nome : ''} />
                </Item>
              </View>        
              <View style={{ marginTop: 10,}}>
                <Item floatingLabel style={{ borderColor: '#34515e' }}>
                  <Label style={{ color: "#ff950e" }} >Email</Label>
                  <Input style={{ color: "#ff950e" }} 
                         maxLength={40} 
                         keyboardType='numeric'
                         onChangeText={this.configuraParamEmail}
                         value={carregaDados ? this.state.perfil.Email : ''} />
                </Item>
              </View>  
              <View style={{marginTop: 10,}}>
                <Button block style={styles.btn}  >
                  <Text style={styles.btnTxt}> Gravar </Text>
                </Button>   
              </View>    
              <View style={{marginTop: 10,}}>
                <Button block style={styles.btn} onPress={this.executaVoltar} >
                  <Text style={styles.btnTxt}> Voltar </Text>
                </Button>   
              </View>  
          </View>                              
          </Container> 
        </ScrollView>      
      )
    }
  }

  const styles = StyleSheet.create({
     
    botoes: {
      flex: 8,        
      alignContent: 'center',
    },
   
    btn:{
      marginStart: 30,
      marginEnd: 30,
      marginTop: 30,
      backgroundColor: '#607d8b',      
    },
  
    btnTxt : {
      fontSize: 18,
      fontWeight: 'bold',     
      color: '#FFF'
    }, 

    foto: {
      backgroundColor: "#056ecf",
      //flex: 1,
      height: 130, width: 130,
      //width: undefined, height: undefined

    },

  });