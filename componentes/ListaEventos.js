import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
//import Evento from './Evento';

export default class ListaEventos extends Component {
 
  static defaultProps = {
    textoEventos: 'Não há eventos cadastrados.',
  };

  renderEvento = ({ item }) => <Text> Dados do Evento aqui ...</Text>; 
  //'<Contato contato={item} onSelect={this.props.onSelectContato}/>;' 

  render() {
    
    const { eventos, textoEventos } = this.props;    

    // if (eventos.length === 0) {
    //   return <Text>{textoEventos}</Text>
    // }

    return <Text>{textoEventos}</Text>

    /*
    return (
      <FlatList
        style={{width: '100%'}}
        data={eventos}
        //keyExtractor={recipe => recipe.recipe_id}
        renderItem={this.renderEvento}
      />
    );
    */
  }
}