import PropTypes from 'prop-types';
import React from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, StyleSheet, Alert, AsyncStorage, BackHandler} from 'react-native';

export default class MenuLateral extends React.Component {
  
    navegarTela = (route) => () => {

    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);

  }

  executarFechar = () => {

    // BackHandler funciona apenas no android... :-( 
    // Pesquisar alternativa para o iOS 
    // react-native-exit-app parece que fundiona para ambos
    Alert.alert(
      'Fechar do Aplicativo',
      'Você deseja encerrar o applicativo?',
      [
        {text: 'Não', onPress: () => console.log('Escolheu não'), style: 'cancel'},
        {text: 'Sim', onPress: () => BackHandler.exitApp()},
      ],
      { cancelable: false })
  }

  confirmaSair = () => {
    Alert.alert(
      'Sair do Aplicativo',
      'Você deseja efetuar novo acesso?',
      [
        {text: 'Não', onPress: () => console.log('Escolheu não'), style: 'cancel'},
        {text: 'Sim', onPress: this.navegarTela('Login')},
      ],
      { cancelable: false })
  }

  /*
  executarSair = async () => {

    // executarSair    
    await AsyncStorage.removeItem("Perfil");
    this.navegarTela('Login');
  }
  */

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.estiloCabecalho}>
            <Text style={styles.textoCabecalho}>
              Rango Amigo
            </Text>            
        </View>
        <ScrollView>          
          <View style={styles.estiloMenuTitulo}>
            <Text style={styles.textoMenuTitulo}>
              Opções
            </Text>
            <View style={styles.estiloMenu}>

              {/* <Text style={styles.textoMenu} onPress={this.navegarTela('Login')}>
                Login
              </Text> */}

              <Text style={styles.textoMenu} onPress={this.navegarTela('Principal')}>
                Eventos
              </Text>
              <Text style={styles.textoMenu} onPress={this.navegarTela('Cadastro')}>
                Perfil
              </Text>              
              <Text style={styles.textoMenu} onPress={this.confirmaSair}>
                Sair
              </Text>
              <Text style={styles.textoMenu} onPress={this.executarFechar}>
                Fechar
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.estiloRodape}>
          <Text>RODAPE AQUI</Text>
        </View>
      </View>
    );
  }
}

MenuLateral.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({

  container: {
    //paddingTop: 20,
    flex: 1,
    backgroundColor: '#ebeeef'
  },

  textoMenu: {
    padding: 15,
    fontSize: 18,
    color: '#c66600'
  },

  estiloMenu: {
    flex: 1,
    backgroundColor: '#dfe8ec'
  },

  estiloMenuTitulo: {
    backgroundColor: '#34515e',
  },

  textoMenuTitulo: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',    
    color: '#fff', //ffc64b    
  },

  estiloCabecalho: {
    height: 140,
    paddingVertical: 20,   
    backgroundColor: '#607d8b',
    //alignItems: 'flex-start'
    justifyContent: 'flex-end',
  },

  textoCabecalho: {
    paddingHorizontal: 15,
    fontSize: 26,
    fontWeight: 'bold',    
    color: '#ff950e', //ffc64b    
  },

  estiloRodape: {
    padding: 20,
    backgroundColor: '#34515e'
  }

});
