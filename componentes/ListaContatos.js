import React, { Component } from 'react';
import { Text, FlatList, View  } from 'react-native';
import Contato from './Contato';

export default class ListaContatos extends Component {
  static defaultProps = {
    textoSemContatos: 'Não há contatos cadastrados.',
    textoTitulo: 'Contatos',
  };

  renderContato = ({ item }) => 
    <Contato contato={item} onSelect={this.props.onSelectContato}/>;

  renderTitulo  = ({ titulo }) => (
    <View>
      <Text style={{fontSize: 24, fontWeight: 'bold', color: '#21284f',}}>{titulo}</Text>
    </View>
  )

  render() {
    
    const { contatos, textoSemContatos, textoTitulo } = this.props;

    if (contatos.length === 0) {
      return <Text >{textoSemContatos}</Text>
    }

    return (
      <FlatList
        //ListHeaderComponent={this.renderTitulo(textoTitulo)}
        style={{width: '100%'}}
        data={contatos}
        keyExtractor={contato => contato.recordID.toString()}
        renderItem={this.renderContato}
      />
    );
  }
}
