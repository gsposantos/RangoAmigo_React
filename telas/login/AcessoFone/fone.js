import React from 'react';
import {
  Text,
  View,
  StyleSheet, Button  
} from 'react-native';

class AcessoFone extends React.Component {
  render() {
    return (
      <View style={styles.container}>
       <View style={styles.topo}>
          <Text style={styles.paragraph}>
          Para acessar, por favor, informe seu número de telefone com código de área.
          </Text>
       </View>
       <View style={styles.formulario}>
          <View style={styles.campos}>
            <View style={styles.campoArea}>
              <Text >Texto aqui</Text>
            </View>
            <View style={styles.campoFone}>
              <Text >Texto aqui</Text>
            </View>
          </View>
           <View style={styles.botoes}>
              <Button title='Acessar' />
              <Button title='Novo Acesso' />
          </View>
       </View>
      </View>
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
    backgroundColor: '#cccc',
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

export default AcessoFone;