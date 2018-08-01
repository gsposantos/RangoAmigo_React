import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import {   
  Icon,  
} from 'native-base';

function apresentaImagem(contato){     

  if(!contato.hasThumbnail){
    if(contato.foto64 != null && contato.foto64 != 'undefined'){
      return <Image  resizeMode="contain" style={styles.foto} source={{uri: 'data:image/png;base64,' + contato.foto64}} />
    }
    else{      
      return <Icon type='FontAwesome' ios='user' android='user' style={{fontSize: 40, color: '#8eacbb'}}/>
    }
  }
  else{    
    return <Image 
      resizeMode="contain"
      style={styles.foto}
      source={{uri: contato.thumbnailPath}}
    />        
  }

  //return <Text>sem img</Text>
}    

export default function Contato({contato, onSelect}) {


  let nomeContato = '';
  let email = '';
  if (contato.givenName !== null && contato.givenName !== undefined) {
    nomeContato = contato.givenName.toString();
  }

  // if (contato.middleName !== null && contato.middleName !== undefined) {
  //   nomeContato += (contato.middleName.length) ? contato.middleName :'' + ' ';
  // }

  if (contato.familyName !== null && contato.familyName !== undefined) {
    nomeContato += ' ' + contato.familyName.toString();
  }

  if(contato.emailAddresses[0] !== undefined){
    email = contato.emailAddresses[0].email;
  }

  let estiloContato = [];
  estiloContato.push(styles.itemContato);

  if(!contato.cadastrado){
    estiloContato.push(styles.contatoSemCadastro);
  }

  if(contato.selecionado){
    estiloContato.push(styles.contatoSelecionado);
  }

  return (    
    <TouchableOpacity onPress={() => onSelect(contato)}>    
      <View style={estiloContato}>
          <View style={styles.imagemContato}>  
            {
              apresentaImagem(contato)
            }                     
          </View>
          <View style={styles.dadosContato}>  

            <View style={styles.infoContato}>                 
              <View style={styles.nomeContato }>      
                <Text style={styles.txtNome} >{ nomeContato }</Text>   
              </View>
              <View style={styles.foneContato}>
                <Text style={styles.txtFone} >{ contato.phoneNumbers[0].number }</Text>    
              </View>
            </View>

            <View style={styles.emailContato}> 
                <Text style={styles.txtEmail}>{ email }</Text>          
            </View>
            
          </View>
        </View> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  itemContato: {   
    
    flexDirection: 'row',
    borderBottomWidth: 1,    
    //backgroundColor: 'red',   
    //marginTop: 50,
    height: 60, /*ou define altura aqui, ou devine na imagem*/
  },

  contatoSemCadastro : {
    opacity:0.5,
  },

  contatoSelecionado: {
    backgroundColor: '#ffc64b'
  },

  imagemContato: {
    flex: 2,  
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'blue',
  },
  dadosContato: {
    flex: 8,
    //backgroundColor: 'green',
    flexDirection: 'column',   
    margin:3,
  },
  infoContato:{ 
    flex: 1,         
    flexDirection: 'row',   
    //backgroundColor: 'yellow',
    justifyContent: 'space-between',
  },
  emailContato: {
    flex: 1,
    justifyContent: 'flex-end',   
    //backgroundColor: 'orange',
  },
  nomeContato: {
    justifyContent: 'flex-start',   
    //backgroundColor: 'white',
  },
  foneContato: {
    justifyContent: 'flex-start',
    //backgroundColor: 'red',  
  }, 

  txtNome: {    
    fontSize: 18,
    fontWeight: 'bold',    
    color:'#21284f'
  },

  txtFone: {   
    fontSize: 18,
    fontWeight: 'bold',    
    color:'#21284f'
  },

  txtEmail: {   
    fontSize: 14,
    color:'#21284f'
  },

   foto: {     
      //backgroundColor: 'red',
      height: 55, 
      width: 55,
    },

});
