import React from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet, 
  AsyncStorage,
  Alert
} from 'react-native';



export default class AcessoFone extends React.Component {

  static navigationOptions = {
    title: 'Dados de Acesso',
  };

  async componentWillMount() {    
    //console.log('Acesso!!');
  }

  state = {
    area: '',
    fone: '',    
  };

  configuraParamFone = fone => {
    this.setState({fone});
  }

  configuraParamArea = area => {
    this.setState({area});
  }

  verificaPerfilApi(area, fone) {

    //verifica campos preenchidos.
    var isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
    if(!isNumeric.test(area) || !isNumeric.test(fone)){
      Alert.alert('Campos iválidos!', 'Informe valores numéricos para os campos DDD e Telefone');
      return;
    }
    if(area.length === 0 || fone.length === 0){
      Alert.alert('Campos Obrigatórios!', 'Preencha os campos DDD e Telefone adequadamente.');
      return;
    }
    
    //faz a chamada para verificar o perfil
    axios({
      method: 'post',        
      url: 'http://www.anjodaguardaeventos.com.br/rangoamigo/api/perfis/ObterPerfil',    
      headers: { 'content-type': 'application/json;charset=utf-8' },                       
      data: { "CelNumero": 51999999093 } //data: { "CelNumero": area+fone } //51999999093 - teste
    }).then(response => {  

      console.log(response);
      //salva dados na sessao      
      if(response.data.Ok){
        if(response.data.Dados !== null){

          

          //desvia proxima                   
          this.props.navigation.navigate('AcessoPin', response.data.Dados);

        }
        else{
          Alert.alert("Informação", "Perfil não cadastrado.");
        }        
      }  
      else
      {
        Alert.alert("Informação", response.data.Mensagem);
      }
      

    })
    .catch((err) => {
      console.log(err);

    });    
  }


  render() {
    return (
      <Container>        
        <View style={styles.topo}>
          <Text style={styles.textoTopo}>
            Para acessar, por favor, informe seu número de telefone com código de área.
          </Text>
        </View>
        <View style={styles.formulario}>
          <View  style={styles.campos}>
            <View style={styles.campoArea}> 
              <Item floatingLabel style={{ borderColor: '#34515e' }}>
                <Label style={{ color: "#ff950e" }} >DDD</Label>
                <Input style={{ color: "#ff950e" }} maxLength={2} keyboardType='numeric' onChangeText={this.configuraParamArea} />
              </Item>
            </View>
            <View  style={styles.campoFone}>
              <Item floatingLabel last style={{ borderColor: '#34515e' }}>
                <Label style={{ color: "#ff950e" }} >Telefone</Label>
                <Input style={{ color: "#ff950e" }} maxLength={9} keyboardType='numeric' onChangeText={this.configuraParamFone} />
              </Item>
            </View>
          </View>
          <View>
            <Button block style={styles.btn} onPress={_ => this.verificaPerfilApi(this.state.area, this.state.fone)} >
               <Text style={styles.btnTxt}> Avançar </Text>
            </Button>             
            <Button block style={styles.btn}  >
               <Text style={styles.btnTxt}> Novo Acesso </Text>
             </Button>    
          </View>
        </View>
      </Container> 

      // <View style={styles.container}>
      //  <View style={styles.topo}>
      //     <Text style={styles.textoTopo}>
      //       Para acessar, por favor, informe seu número de telefone com código de área.
      //     </Text>
      //  </View>
      //  <View style={styles.formulario}>
      //     <View style={styles.campos}>
      //       <View style={styles.campoArea}>
      //         <Item floatingLabel style={{ borderColor: '#ED4A6A' }} >
      //           <Label style={{ color: "#ED4A6A" }}>DDD</Label>
      //           <Input style={{ color: "#ED4A6A" }} maxLength={2} keyboardType='numeric' onChangeText={this.configuraParamArea} />
      //         </Item>
      //       </View>
      //       <View style={styles.campoFone}>
      //         <Item floatingLabel style={{ borderColor: '#ED4A6A' }} >
      //           <Label style={{ color: "#ED4A6A" }} >Telefone</Label>
      //           <Input style={{ color: "#ED4A6A" }} maxLength={9} keyboardType='numeric' onChangeText={this.configuraParamFone} />
      //         </Item>
      //       </View>
      //     </View>
      //      <View style={styles.botoes}>
      //       <Button block style={styles.btn} onPress={_ => this.verificaPerfilApi(this.state.area, this.state.fone)} >
      //         <Text style={styles.btnTxt}> Acessar </Text>
      //       </Button>             
      //       <Button block style={styles.btn}  >
      //         <Text style={styles.btnTxt}> Novo Acesso </Text>
      //       </Button>             
      //     </View>
      //  </View>
      // </View>


    );
  }
}



const styles = StyleSheet.create({

  

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,   
    backgroundColor: '#ffffff',//'#ebeeef',
  },
  topo: {
    flex:2,
    justifyContent:'center'       
  },
  formulario: {
    flex: 8,   
  },
  campos: {   
    flexDirection: 'row',   
  },

  campoArea: {

    flex: 3, 
    padding: 10,

    // flex: 2,
    // paddingStart: 50,
    // paddingEnd: 5,    
    // alignItems: 'flex-start',
    // justifyContent: 'center',
  },

  campoFone: {
    
    flex: 7, 
    padding: 10,

    // flex: 6,
    // paddingStart: 5,
    // paddingEnd: 50,    
    // justifyContent: 'center',
    // alignItems: 'flex-start',
  },

  botoes: {
    flex: 8,
    //paddingTop: 10,
    //flexDirection: 'row',      
    alignContent: 'center',
  },
 
  btn:{
    margin: 15,
    backgroundColor: '#607d8b',
    //headerTintColor: '#ff950e',
  },

  btnTxt : {
    fontSize: 20,
    fontWeight: 'bold',     
    color: '#FFF'
  },

  textoTopo: {
    margin: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
