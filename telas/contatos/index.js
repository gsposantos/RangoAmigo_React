import React from 'react';
import { View, Text, Button } from 'react-native';
import ListaContatos from '../../componentes/ListaContatos';

/*
const buscarContatos = () => {

  //alert('buscando contatos...');
  //return null;

  // return Contacts.getAll((err, contacts) => {
  //       contacts = contacts.sort((a, b)=>{
  //         if (a.givenName < b.givenName) return -1;
  //         if (a.givenName > b.givenName) return 1;
  //         return 0;
  //       });
  //   });

  return Contacts.getAll((err, contacts) => {
    if (err) throw err;

    // contacts returned
    //console.log(contacts);

  });

}
*/

export default class ContatosStack extends React.Component {

  state={
    retornoContatos: [],
  }

  //async componentDidMount() {
  async componentWillMount() {    
    //carregar contatos antes do primeiro rander
    //this.setState({retornoContatos: this.carregarContatosDipositivo()});
    this.carregarContatosDipositivo();
  }

  carregarContatosDipositivo = () => {

    var Contacts = require('react-native-contacts');

    Contacts.getAll((err, contacts) => {
      if (err){ throw err; }
    
      console.log(contacts);
      alert('achou contatos');
      this.setState({retornoContatos: contacts});

    });
  }

  selecionaContato = item => {    
    alert('Contato selecionado!');
  };

  renderListaContatos = () => {
    
    if ( this.state.retornoContatos !== undefined)
      return <ListaContatos contatos={this.state.retornoContatos} onSelectContato={this.selecionaContato} />;
    else
      return <Text>Carregando ... </Text>
  };

  render(){

   //this.carregarContatosDipositivo();

    return (
      <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        {this.renderListaContatos()}
      </View>
    )
  }
}