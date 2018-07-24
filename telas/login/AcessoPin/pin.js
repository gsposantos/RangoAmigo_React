import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage, 
} from 'react-native';

import { 
  Container,
  Item, 
  Input,
  Label, 
  Button 
} from 'native-base';

import {NavigationActions} from 'react-navigation';

export default class AcessoPin extends React.Component {

  static navigationOptions = {
    title: 'Confirmação de Acesso',
  };

  state = {
    pin: '',
  };

  async componentDidMount() {
    //carrega dados para depois salvar em sessao
    //var perfil = this.props.navigation.state.params;
    //var pin = perfil.PIN;

    //this.setState({perfil, pin});
    //this.setState({pin: this.props.navigation.state.params.PIN});

    //console.log(this.props.navigation.state.params);

    //valPIN = retornoPerfil.getDados().PIN;
    //var sNumTelefone = this.state.oPerfil.CelNumero;
    //alert('(' + sNumTelefone.substring(0,2) + ') ' + sNumTelefone.substring(2));

  }

  configuraParamPin = pin => {
    console.log(pin);
    this.setState({pin});
  }

  confirmaAcessoEventos = async (pin) => {
    
    console.log(pin);

    //carrega dados para depois salvar em sessao
    var perfil = this.props.navigation.state.params;    

    //enquanto nao for implementado o envio de sms
    var backDoor = '1234';    
    
    //verifica pin para então gravar na sessao
    if(pin === backDoor || pin === perfil.PIN) {

      try { 

        await AsyncStorage.setItem("Perfil", JSON.stringify(perfil));
        console.log('Dados carregados');
        
        //desmpilhar tela pin antes de redirecionar ... como?        
        this.props.navigation.popToTop();

        //desvia tela principal
        const navigateAction = NavigationActions.navigate({
          routeName: 'Principal'
        });    
        this.props.navigation.dispatch(navigateAction);
      }
      catch (err) {
        console.error(err);
        Alert.alert("Inesperado", "Não foi possivel carregar os dados.");
      }   
    }  
  };

  render() {

    //console.log(this.props.navigation.state.params);    
    return (
      <View style={styles.container} >        
        <View style={styles.topo}>
          <View style={styles.estiloFone}>        
            <Text style={styles.textoFone}>
            {'(' + this.props.navigation.state.params.CelNumero.toString().substring(0,2) + ') ' + this.props.navigation.state.params.CelNumero.toString().substring(2)}
            </Text>
          </View>
          <View style={styles.estiloTopo}>        
            <Text style={styles.textoTopo}>
              Enviamos um código por SMS para o telefone informado.
            </Text>
            <Text style={styles.textoTopo}>
              Por favor, informe esse código para prosseguir.
            </Text>
        </View>  
        </View>
        <View style={styles.formulario}>
          <View  style={styles.campos}>            
            <View  style={styles.campoPIN}>
              <Item floatingLabel style={{ borderColor: '#34515e' }}>
                <Label style={{ color: "#ff950e" }} >PIN</Label>
                <Input style={{ color: "#ff950e" }} maxLength={4} keyboardType='numeric' onChangeText={this.configuraParamPin} />
              </Item>
            </View>
          </View>
          <View style={styles.botoes}>
            <Button block style={styles.btn} onPress={_ => this.confirmaAcessoEventos(this.state.pin) } >
              <Text style={styles.btnTxt}> Acessar </Text>
            </Button>                            
          </View>
        </View>
      </View>       
    );
  }
}

 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      paddingTop: 25,   
      backgroundColor: '#ebeeef',
    },
    topo: {
      flex:3,
      alignItems: 'center',
      //backgroundColor: 'yellow',     
    },
  
    formulario: {
      flex: 7,
      //backgroundColor: 'blue', 
      //justifyContent:'center',
    },
  
    estiloFone: {
      flex:2,
      //paddingTop: 20,        
      //textAlign: 'center',
      justifyContent:'center',
      //backgroundColor: 'blue', 
    },
  
    estiloTopo: {
      flex:3,
      marginEnd:20,
      marginStart:20,
      //paddingTop: 20,        
      //textAlign: 'center',
      justifyContent:'center',
      //backgroundColor: 'red',            
    },
  
   textoFone: {    
      fontSize: 22,
      fontWeight: 'bold',    
      color: '#34495e',
      //backgroundColor: 'red', 
    },
  
    textoTopo: {
      //flex:1,   
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold',    
      color: '#34495e',        
    },
  
    campos: {   
      flexDirection: 'row',   
      //alignItems: 'flex-start',    
    },
  
    campoPIN: {
  
      flex: 1, 
      // paddingStart: 50,
      // paddingEnd: 50,
  
      marginStart: 100,
      marginEnd: 100,
      marginTop: 10,
  
      // flex: 2,
      // paddingStart: 50,
      // paddingEnd: 5,    
      // alignItems: 'flex-start',
      // justifyContent: 'center',
    },
  
    botoes: {
      flex: 6,
      //paddingTop: 10,
      //flexDirection: 'row',      
      alignContent: 'center',
      //backgroundColor: 'green',
    },
   
    btn:{
      marginStart: 80,
      marginEnd: 80,
      marginTop: 30,
      backgroundColor: '#607d8b',
      //headerTintColor: '#ff950e',
    },
  
    btnTxt : {
      fontSize: 18,
      fontWeight: 'bold',     
      color: '#FFF'
    },

});
