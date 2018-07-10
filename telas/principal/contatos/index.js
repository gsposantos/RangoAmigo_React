import React from 'react';
import { View, Text, Button } from 'react-native';
import ListaContatos from '../../../componentes/ListaContatos';

import axios from 'axios';

export default class ContatosStack extends React.Component {

  state={
    carregadndo: true,
    contatosDispositivo: [],
    contatosAtualizados: []
  }
  
  async componentWillMount() {    
    //carregar contatos antes do primeiro render
    this.carregarContatosDipositivo();

    //const retornoContatosApi = await sincronizaContatosApi();
    //this.setState({contatosAtualizados: retornoContatosApi});
  }

  /*
      
  */

  sincronizaContatosApi() {
    
      let lstPerfis = [];

      lstPerfis.push({ "CelArea": 51, "CelNumero": 99999091 });
      lstPerfis.push({ "CelArea": 51, "CelNumero": 99999098 });
      lstPerfis.push({ "CelArea": 51, "CelNumero": 99999891 });
      lstPerfis.push({ "CelArea": 0, "CelNumero": 51999999099 });

      // fetch('http://www.anjodaguardaeventos.com.br/rangoamigo/api/perfis/SincronizarContatos', {
      //   method: 'POST',
      //   headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(lstPerfis),
      // }).then(response => { 
      //     console.log(response); 
      //   })
      //   .catch(() => {console.log('Erro datalhar');
      //   }); 

      // axios.get('http://www.anjodaguardaeventos.com.br/rangoamigo/api/eventos/DetalharEvento?codEvento=30')      
      // .then(response => { 
      //   console.log(response); 
      // })
      // .catch(() => {console.log('Erro datalhar');
      // });         
      
      axios({
        method: 'post',        
        url: 'http://www.anjodaguardaeventos.com.br/rangoamigo/api/perfis/SincronizarContatos',    
        headers: { 'content-type': 'application/json;charset=utf-8' },                       
        data: JSON.stringify(lstPerfis)
      }).then(response => {    

        console.log(response);

      })
      .catch((err) => {console.log(err);
      });          
  }

  carregarContatosDipositivo = () => {

    var Contacts = require('react-native-contacts');
    Contacts.getAll((err, contacts) => {
      if (err){
         throw err; 
      }
      //chamar api para sincronizar somente depois q tiver os contatos do dispositivo
      this.setState({contatosDispositivo: contacts});
      this.sincronizaContatosApi();

    });
  }

  sincronizaContatos = () => {

    
    this.setState({carregadndo: true});
  }

  selecionaContato = item => {    
    alert('Contato selecionado!');
  };

  renderListaContatos = () => {
    
    console.log('render atualizados ->');
    console.log(this.state.contatosAtualizados);

    console.log('render dispositivo ->');
    console.log(this.state.contatosDispositivo);

    if ( this.state.contatosDispositivo !== undefined)
      return <ListaContatos contatos={this.state.contatosDispositivo} onSelectContato={this.selecionaContato} />;
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