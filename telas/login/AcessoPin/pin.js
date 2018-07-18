import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet, Button  
} from 'react-native';

import { 
  Container,
  Item, 
  Input,
  Label, 
  Button 
} from 'native-base';

import axios from 'axios';

export default class AcessoPin extends React.Component {

  static navigationOptions = {
    title: 'Confirmação de Acesso',
  };

  state = {
    oPerfil: null,
    pin: '',
  };

  async componentDidMount() {
    //carrega dados para depois salvar em sessao
    this.setState({oPerfil: this.props.navigation.state.params});
  }

  configuraParamPin = pin => {
    this.setState({pin});
  }

  confirmaAcessoEventos = (pin, oPerfil) => {
    
    //enquanto nao for implementado o envio de sms
    var backDoor = 1234;    
    
    //verifica pin para então gravar na sessao
    if(pin === backDoor || pin === oPerfil.PIN) {

      try { 
        AsyncStorage.setItem("oPerfil", oPerfil).then(() => {
          console.log('Dados carregados');
        })
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

      <Container>        
        <View style={styles.topo}>
          <Text style={styles.textoTopo}>
            Para acessar, por favor, informe seu número de telefone com código de área.
          </Text>
        </View>
        <View style={styles.formulario}>
          <View  style={styles.campos}>
            <View style={styles.campoArea}> 
              <Item floatingLabel style={{ borderColor: '#34515e' }}>
                <Label style={{ color: "#ff950e" }} >DDD</Label>
                <Input style={{ color: "#ff950e" }} maxLength={2} keyboardType='numeric' onChangeText={this.configuraParamArea} />
              </Item>
            </View>
            <View  style={styles.campoFone}>
              <Item floatingLabel last style={{ borderColor: '#34515e' }}>
                <Label style={{ color: "#ff950e" }} >Telefone</Label>
                <Input style={{ color: "#ff950e" }} maxLength={9} keyboardType='numeric' onChangeText={this.configuraParamFone} />
              </Item>
            </View>
          </View>
          <View>
            <Button block style={styles.btn} onPress={_ => this.confirmaAcessoEventos(this.state.pin. this.state.oPerfil) } >
               <Text style={styles.btnTxt}> Acessar </Text>
            </Button>                            
          </View>
        </View>
      </Container> 

      // <View style={styles.container}>
      //  <View style={styles.topo}>
      //     <Text style={styles.paragraph}>
      //     Para acessar, por favor, informe seu número de telefone com código de área.
      //     </Text>
      //  </View>
      //  <View style={styles.formulario}>
      //     <View style={styles.campos}>
      //       <View style={styles.campoArea}>
      //         <Text >Texto aqui</Text>
      //       </View>            
      //     </View>
      //      <View style={styles.botoes}>
      //         <Button title='Acessar' onPress={_ => this.confirmaAcessoEventos(this.state.pin. this.state.oPerfil) }/>              
      //     </View>
      //  </View>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
    backgroundColor: '#ebeeef',
  },
  topo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#cccc',
  },
  formulario: {
    flex: 3,
    //margin: 20,
    alignItems: 'center',
    //justifyContent: 'flex-start',
  },
  campos: {
    flex: 2,
    //margin: 10,
    flexDirection: 'row',
    backgroundColor: '#aabbcc',
    //alignItems: 'space-between',
    //justifyContent: 'space-between',
  },
  campoArea: {
    flex: 1,
    paddingEnd: 20,
    backgroundColor: '#11aa11',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  campoFone: {
    flex: 1,
    paddingStart: 20,
    backgroundColor: '#00ffff',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  botoes: {
    flex: 8,
    //backgroundColor: 'red',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  paragraph: {
    //margin: 20,
    padding: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
