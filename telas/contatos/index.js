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
    retornoContatos: null,
  }

  async componentDidMount() {

    //const {recipe_id} = this.props.navigation.state.params;

    const retornoContatos = this.carregarContatosDipositivo();
    this.setState({retornoContatos});
  }

  carregarContatosDipositivo = () => {

    var Contacts = require('react-native-contacts');

    return Contacts.getAll((err, contacts) => {
      if (err){ throw err; }
    
      console.log(contacts);
      alert('achou contatos');
      //this.setState({contacts});
  
    });
  }

  selecionaContato = item => {
    //this.props.navigation.navigate('Recipe', item);
    alert('Contato selecionado!');
  };

  renderListaContatos = () => {
    //const { contatos } = this.state;
    return <ListaContatos contatos={this.state.contatos} onSelectContato={this.selecionaContato} />;
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