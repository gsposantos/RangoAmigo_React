import React from 'react';
import { View, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import { 
  Fab, Icon, Button
} from 'native-base';

import ListaContatos from '../../../../componentes/ListaContatos';

import BotaoMenu from '../../../../componentes/BotaoMenu';

import axios from 'axios';

export default class MeusContatos extends React.Component {

   static navigationOptions = ({ navigation }) => {
      return {
        title: 'Meus Contatos',
        headerLeft: (
          <BotaoMenu acaoMenu={navigation} />      
        ),
      };    
    };

    state={
      //fabAtivo: false,   
      carregando: true,
      contatos: [],
    }
    
    async salvarSessao(contatos) {    

      try {
        await AsyncStorage.setItem("Contatos", JSON.stringify(contatos));
      }
      catch (err) {
        console.error(err);
        Alert.alert("Inesperado", "Não foi possivel carregar os dados.");
      }   

    }

    async componentDidMount() {    
      
      //Verifica contatos em sessao
      var contatosCache = await AsyncStorage.getItem("Contatos");
      
      if(contatosCache === null || contatosCache === 'undefined'){
        
        //sincronizaaaa
        this.sincronizaContatos();

      }    
      else{
        this.setState({carregando: false, contatos: contatosCache});
      }
    }
  
    sincronizaContatosApi(contatos) {
      
        var lstPerfis = [];
  
        contatos.forEach(function(contato){

          contato.phoneNumbers.forEach(function(phone){
            
            // parse para pegar apenas números
            let foneAux = phone.number.replace(new RegExp('[^\\d]', 'g'), '');

            //armazena fone limpo para bater com retorno da API
            phone.celNumero = foneAux; //cria o atributo na hora ... e funciona :/

            //considera que numero de celular deve ter 11 digitos
            if (foneAux.length > 11){
              foneAux = foneAux.substring(foneAux.length - 11);
            }

            lstPerfis.push({ "CelArea": 0, "CelNumero": foneAux });

          });

        });
        
        
        axios({
          method: 'post',        
          url: 'http://www.anjodaguardaeventos.com.br/rangoamigo/api/perfis/SincronizarContatos',    
          headers: { 'content-type': 'application/json;charset=utf-8' },                       
          data: JSON.stringify(lstPerfis)
        }).then(response => {    
  
          console.log(response);

          // aqui a magia acontece...

          for(const contato of contatos){
            for(const phone of contato.phoneNumbers){
              for(const perfil of response.data.Dados){
                
                if(phone.celNumero === perfil.CelNumero){                      
                     
                  // - limpa os telefones (dispositivo) e adiciona o telefone encontrado (API).
                  contato.phoneNumbers = [{
                                            label:phone.label, 
                                            number:phone.number, 
                                            celNumero: phone.celNumero
                                          }];

                  // - pega o email cadastrado na API se nao tiver email no contato do dispositivo.
                  if(contato.emailAddresses.length === 0){
                    contato.emailAddresses = [{
                                                label: '',
                                                email: perfil.Email,
                                              }]
                  }

                  // - pega o foto cadastrada na API  se nao tiver imagem no contato do dispositivo.
                  if(!contato.hasThumbnail){
                    contato.foto64 = perfil.Foto;
                  }

                  // - marca contato (dispositivo) como cadastrado.
                  contato.cadastrado = true;
                  return;

                }

              }
            }
          }         
          
          //console.log(contatos);
          this.salvarSessao(contatos);
          this.setState({carregando: false, contatos: contatos});
  
        })
        .catch((err) => {console.log(err);
        });          
    };
  
    carregarContatosDipositivo = () => {
  
      var reactContacts = require('react-native-contacts');
      reactContacts.getAll((err, contatosDisp) => {
        if (err){
           throw err; 
        }

        //chamar api para sincronizar somente depois q tiver os contatos do dispositivo
        this.sincronizaContatosApi(contatosDisp);
  
      });
    };

    sincronizaContatos = () => {

      this.setState({carregando: true});
      this.carregarContatosDipositivo();
      
    };
  
    selecionaContato = item => {    
      alert('Contato selecionado!');
    };
  
    renderListaContatos = () => {
      return <ListaContatos contatos={this.state.contatos} onSelectContato={this.selecionaContato} />;  
    };
  
    render(){
 
      return (

        <View style={styles.container}>        
          <View style={styles.resultsContainer}>
          {
            this.state.carregando
              ? <ActivityIndicator size="large" color="#000"/>
              : this.renderListaContatos()          
          }
            <Fab
            active={this.state.fabAtivo}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#34515e' }}
            position="bottomRight"
            onPress={this.sincronizaContatos}>
              <Icon type='FontAwesome' ios='refresh' android='refresh' />  
            </Fab>  
          </View>
        </View>
      )
    };
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ebeeef',
    },  
    resultsContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
