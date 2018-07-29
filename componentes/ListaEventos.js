import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import Evento from './Evento';

export default class ListaEventos extends Component {
 
  static defaultProps = {
    textoEventos: 'Não há eventos cadastrados.',
  };
  
  renderEvento = ({ item }) => <Evento evento={item} onSelect={this.props.onSelect}/>; 

  render() {
    
    const { eventos, textoEventos } = this.props;    

    if (eventos.length === 0) {
      return <Text>{textoEventos}</Text>
    }

    return (
      <FlatList
        style={{width: '100%'}}
        data={eventos}
        keyExtractor={evento => evento.CodEvento.toString()}
        renderItem={this.renderEvento}
      />
    );
    
  }
}