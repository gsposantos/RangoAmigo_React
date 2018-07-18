import React from 'react';
import { View, Text, Button } from 'react-native';
import ListaContatos from '../../../../componentes/ListaContatos';

import BotaoMenu from '../../../../componentes/BotaoMenu';

import Contato from '../../../../modelos/contato';
import ContatoEmail from '../../../../modelos/contatoemail';
import ContatoFone from '../../../../modelos/contatofone';

import axios from 'axios';

export default class MeusContatos extends React.Component {

    //aqui vai o botao?? EX: https://github.com/react-navigation/react-navigation/issues/1122
   static navigationOptions = ({ navigation }) => {
      return {
        title: 'Meus Contatos',
        headerLeft: (
        <BotaoMenu acaoMenu={navigation} />      
        ),
      };    
    };

    state={
      carregando: true,
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
    Contato={
      id, //contacts[0].recordID
      nome, // contacts[0].givenName + ' ' + contacts[0].middleName + ' ' + contacts[0].familyName
      foto64, // retornado da api
      fotoUri, //contacts[0].thumbnailPath
      //emails: [], // if contacts[0].emailAddresses.length > 0
      //numeros: [], // if contacts[0].phoneNumbers.length > 0  ... for each ..if(contacts[0].phoneNumbers[0].label === 'mobile') contacts[0].phoneNumbers[0].number
    }
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
        
        //this.setState({contatosDispositivo: contacts});

        //Filtrar contatos para ter apenas os com telefone celalar cadastrados
        //carrega no estado uma estrutura simplificada que será renderizada
        this.filtrarContatos(contacts);

        //chamar api para sincronizar somente depois q tiver os contatos do dispositivo
        this.sincronizaContatosApi();
  
      });
    }

    filtrarContatos  = (contatos) => {

      var contatosConsulta = Array();      
      var fonesContato = Array();    
      var emailsContatos = Array();
      
      contatos.forEach(function(contato){

        //mapear o objeto e suas listas de emails e numeros

        //contacts[0].recordID
        //contacts[0].givenName + ' ' + contacts[0].middleName + ' ' + contacts[0].familyName
        
        //contacts[0].thumbnailPath
        //if contacts[0].emailAddresses.length > 0
        //if contacts[0].phoneNumbers.length > 0  ... for each ..if(contacts[0].phoneNumbers[0].label === 'mobile') contacts[0].phoneNumbers[0].number  

        var nomeContato = contato.givenName !== null ? contato.givenName : '';
        nomeContato =+ ' ' + contato.middleName !== null ? contato.middleName : '';
        nomeContato =+ ' ' + contato.familyName !== null ? contato.familyName : '';

        var auxContato = new Contato(contato.recordID, nomeContato, contato.thumbnailPath);
        var emailContato;
        var foneContato;


        emailsContatos = Array();

        contato.emailAddresses.forEach(function(email){        
          //emailsContatos.push(new ContatoEmail(email.email, email.label));
        });

        contato.phoneNumbers.forEach(function(fone){
          //fonesContato.push(new ContatoFone(email.email, email.label));
          //fone.label;
          //fone.number;
        });

        //contatosConsulta.push(auxContato);

      }

    );
  }
/*

      Contato={
        id, //contacts[0].recordID
        nome, // contacts[0].givenName + ' ' + contacts[0].middleName + ' ' + contacts[0].familyName
        foto64, // retornado da api
        fotoUri, //contacts[0].thumbnailPath
        emails: [], // if contacts[0].emailAddresses.length > 0
        numeros: [], // if contacts[0].phoneNumbers.length > 0  ... for each ..if(contacts[0].phoneNumbers[0].label === 'mobile') contacts[0].phoneNumbers[0].number
      }


      this.state.contatosDispositivo.forEach((contatoDisp) => {

          alert(contatoDisp.recordID);

      }); 
      
*/
  
    sincronizaContatos = () => {

      this.setState({carregando: true});
      
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
/*
  class Contato {

    constructor(id, nome, foto) {

        this.id = id;
        this.nome = nome;
        this.fotoUri = foto;
        
        this.foto64 = '';
        this.cadastrado = false;

        this.emails = Array();
        this.numeros = Array();
    }
}
*/