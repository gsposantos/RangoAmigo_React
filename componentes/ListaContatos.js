import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import Contato from './Contato';

export default class ListaContatos extends Component {
  static defaultProps = {
    textoSemContatos: 'Não há contatos cadastrados.',
  };

  renderContato = ({ item }) => <Contato contato={item} onSelect={this.props.onSelectContato}/>;

  render() {
    
    const { contatos, textoSemContatos } = this.props;

    if (contatos.length === 0) {
      return <Text>{textoSemContatos}</Text>
    }

    return (
      <FlatList
        style={{width: '100%'}}
        data={contatos}
        keyExtractor={contato => contato.recordID}
        renderItem={this.renderContato}
      />
    );
  }
}
