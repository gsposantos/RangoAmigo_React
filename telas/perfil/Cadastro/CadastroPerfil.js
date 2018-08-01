import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity ,
  Image,
  Alert,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

import { 
  Container,
  Item, 
  Input,
  Label,   
  Button,
  Icon, 
} from 'native-base';

import {NavigationActions} from 'react-navigation';

import ImagePicker from 'react-native-image-picker';

import axios from 'axios';

//import BotaoMenu from '../../../componentes/BotaoMenu';

export default class CadastroPerfil extends React.Component {
    
   static navigationOptions = ({ navigation }) => {
      return {
        title: 'Cadastro Perfil',   
        headerLeft: (
          null
        ),     
      };          
    };

    state={            
      carregando:true,
      editar: false,
      perfil: null,
      foto: '',
      area: '',
      fone: '',
      nome: '',
      email: '',

    }

    configuraParamEmail = email => {
      this.setState({email});
    }
  
    configuraParamNome= nome => {
      this.setState({nome});
    }
    
    configuraParamFone = fone => {
      this.setState({fone});
    }

    configuraParamArea = area => {
      this.setState({area});
    }  

    configuraParamFoto = () => {
     
      ImagePicker.showImagePicker((response) => {
      
        console.log('Response :: ', response);
      
        if (response.didCancel) {
          console.log('Usuário cancelou');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else {
          this.setState({foto: response.data});
        }
      });
    }  

    emailValido = (email) =>{
      
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());      
      
    }

    executaSalvar = () => {      
      
      let perfil = this.state.perfil;      
      let servico = this.state.editar ? 'AlterarPerfil' : 'CriarPerfil';

      /* VALIDACOES */

      //Numero do Celular
      if(this.state.area.length == 0 || this.state.fone.length == 0){        
        Alert.alert("Campos Obrigatórios!", "Preencha os campos DDD e Telefone adequadamente.");
        return false;
      }

      //Nome
      if(this.state.nome.length == 0){
        Alert.alert("Campos Obrigatórios!", "Preencha o campo Nome adequadamente.");
        return false;
      }

      //Email
      if(this.state.email.length == 0){
        Alert.alert("Campos Obrigatórios!", "Preencha o campo Email adequadamente.");
        return false;
      }
      else if(!this.emailValido(this.state.email)){
        Alert.alert("Formato Incorreto!", "Preencha o campo Email adequadamente.");
          return false;
      }

      perfil.Foto = this.state.foto;
      perfil.CelNumero = this.state.area + this.state.fone;
      perfil.Nome = this.state.nome;
      perfil.Email = this.state.email;

      console.log(perfil);

      this.setState({ carregando: true });

      axios({
        method: 'post',        
        url: 'http://www.anjodaguardaeventos.com.br/rangoamigo/api/perfis/' + servico,    
        headers: { 'content-type': 'application/json;charset=utf-8' },                       
        data: JSON.stringify(perfil)
      }).then(response => { 

        if(response.data.Ok){
          if(response.data.Dados == 1){

            this.salvarSessao(perfil);        
            
            //redireciona para os eventos
            const navigateAction = NavigationActions.navigate({
              routeName: 'Principal'
            });    
            this.props.navigation.dispatch(navigateAction);

          }
          else{
            Alert.alert('Informação', response.Mensagem);
          }
        }
        else{
          Alert.alert('Informação', response.data.Mensagem);
        }

        this.setState({ carregando: false }); 

      })
      .catch((err) => {console.log(err);
        Alert.alert('Erro!', 'Erro.');
        this.setState({ carregando: false }); 
      });   
      
    }

    executaVoltar = () => {

      if(!this.state.editar){
        this.props.navigation.goBack();
      }
      else{       
        //tenta desviar tela principal
        const navigateAction = NavigationActions.navigate({
          routeName: 'Principal'
        });    
        this.props.navigation.dispatch(navigateAction);
      }

    }    

    async salvarSessao(perfil) {    
      try {
        await AsyncStorage.setItem("Perfil", JSON.stringify(perfil));
      }
      catch (err) {
        console.error(err);
        Alert.alert("Inesperado", "Não foi possivel carregar os dados.");
      }   
    }

    async componentDidMount() {    

      //Verifica perfil logado
      let perfil = null;
      var jsonPerfil = await AsyncStorage.getItem("Perfil");
      console.log(this.state.carregando);
      
      if(jsonPerfil !== null && jsonPerfil !== 'undefined'){
        
        perfil = JSON.parse(jsonPerfil)

        this.setState({
          carregando: false,
          editar: true,
          perfil: perfil,
          foto: perfil.Foto.toString(),
          area: perfil.CelNumero.toString().substring(0,2),
          fone: perfil.CelNumero.toString().substring(2),
          nome: perfil.Nome.toString(),
          email: perfil.Email.toString(),
        });    

      }
      else{

        //perfil vazio para ser preenchido e enviado para API
        perfil = {CelNumero: 0, Nome: '', Foto:'', Email:''}
        this.setState({ carregando: false, editar: false, perfil: perfil, });
      }
    }

    apresentaImagem(){      
      if(this.state.editar){
        return <Image  resizeMode="contain" style={styles.foto} source={{uri: 'data:image/(png|tiff|jpg|gif);base64,' + this.state.foto.toString()}} />
      }
      else {
        if(this.state.foto.toString() != ''){
          return <Image  resizeMode="contain" style={styles.foto} source={{uri: 'data:image/(png|tiff|jpg|gif);base64,' + this.state.foto.toString()}} />
        }
        else{
         return <Icon type='FontAwesome' ios='user' android='user' style={{fontSize: 80, color: '#8eacbb'}} />          
        }
      }
    }    
    
    render(){
     
      return (
        <ScrollView style={{ backgroundColor: '#fff', }}>
        {
          this.state.carregando          
            ? <Container style={{ flex: 1, marginTop: 20, marginStart: 10, marginEnd: 10, }}>
                <ActivityIndicator size="large" color="#000"/>
              </Container>
            : <Container style={{ flex: 1, marginTop: 20, marginStart: 10, marginEnd: 10, }}>
                <View style={{flexDirection:'row', flex:2}}>             

                    <View style={{flex:4, position: 'relative', justifyContent: 'center', alignItems: 'center', borderWidth:1, }}>   
                      <TouchableOpacity onPress={this.configuraParamFoto}>     
                        {
                          this.apresentaImagem()                  
                        }                
                      </TouchableOpacity>
                    </View>      

                  <View style={{flex:6, marginStart: 20, }}>

                    <View style={{ marginEnd: 130, marginTop: 10,}}>
                      <Item floatingLabel style={{ borderColor: '#34515e' }}>
                        <Label style={{ color: "#ff950e" }} >DDD</Label>
                        <Input  style={{ color: "#ff950e" }} 
                                maxLength={2} 
                                keyboardType='numeric' 
                                editable={!this.state.editar} 
                                onChangeText={this.configuraParamArea} 
                                value={ this.state.area } />
                      </Item>
                    </View>    

                    <View style={{ marginTop: 10,}}>
                      <Item floatingLabel style={{ borderColor: '#34515e' }}>
                        <Label style={{ color: "#ff950e" }} >Telefone</Label>
                        <Input  style={{ color: "#ff950e" }} 
                                maxLength={9} 
                                keyboardType='numeric' 
                                editable={!this.state.editar} 
                                onChangeText={this.configuraParamFone} 
                                value={ this.state.fone } />
                      </Item>
                    </View>        

                  </View>      
                </View>

                <View style={{flex:8,}}>   
                  <View style={{ marginTop: 10,}}>             
                    <Item floatingLabel style={{ borderColor: '#34515e' }}>
                      <Label style={{ color: "#ff950e" }} >Nome</Label>
                      <Input style={{ color: "#ff950e" }} 
                            maxLength={100}                             
                            onChangeText={this.configuraParamNome} 
                            value={this.state.nome} />
                    </Item>
                  </View>

                  <View style={{ marginTop: 10,}}>
                    <Item floatingLabel style={{ borderColor: '#34515e' }}>
                      <Label style={{ color: "#ff950e" }} >Email</Label>
                      <Input style={{ color: "#ff950e" }} 
                            maxLength={40}                             
                            onChangeText={this.configuraParamEmail}
                            value={ this.state.email } />
                    </Item>
                  </View>  

                  <View style={{marginTop: 10,}}>
                    <Button block style={styles.btn} onPress={this.executaSalvar} >
                      <Text style={styles.btnTxt}> Gravar </Text>
                    </Button>   
                  </View>   

                  <View style={{marginTop: 10,}}>
                    <Button block style={styles.btn} onPress={this.executaVoltar} >
                      <Text style={styles.btnTxt}> Voltar </Text>
                    </Button>   
                  </View>  
              </View>                              
              </Container>               
         }
         </ScrollView>          
      )
    }
  }

  const styles = StyleSheet.create({
     
    botoes: {
      flex: 8,        
      alignContent: 'center',
    },
   
    btn:{
      paddingStart: 20,
      paddingEnd: 20,
      marginStart: 30,
      marginEnd: 30,
      marginTop: 30,
      backgroundColor: '#607d8b',      
    },
  
    btnTxt : {
      fontSize: 18,
      fontWeight: 'bold',     
      color: '#ebeeef'
    }, 

    foto: {
      //backgroundColor: "#056ecf",
      //flex: 1,
      height: 130, width: 130,
      //width: undefined, height: undefined

    },

  });