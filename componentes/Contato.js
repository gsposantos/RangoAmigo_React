import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

function apresentaImagem(contato){     

  if(!contato.hasThumbnail){
    return <Image  resizeMode="contain" style={styles.foto} source={{uri: 'data:image/png;base64,' + contato.foto()}} />
  }
  else{
    //return <Image  resizeMode="contain" style={styles.foto} source={{uri: contato.thumbnailPath}} />
    return <Image 
      resizeMode="contain"
      style={styles.foto}
      source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
    />        
  }

  //return <Text>sem img</Text>
}    

export default function Contato({contato, onSelect}) {

  let nomeContato = (contato.givenName.length>0) ? contato.givenName : '' + ' ';
    nomeContato += (contato.middleName.length) ? contato.middleName :'' + ' ';
    nomeContato += (contato.familyName.length) ? contato.familyName : '' + ' ';

  return (    
    <TouchableOpacity onPress={() => onSelect(contato)}>    
      <View style={styles.itemContato}>
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
                <Text style={styles.txtEmail}>{ contato.emailAddresses[0].email }</Text>          
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
    color: 'blue',
  },

  txtFone: {   
    fontSize: 18,
    fontWeight: 'bold',    
    color: 'blue',
  },

  txtEmail: {   
    fontSize: 14,
    color: 'blue',
  },

   foto: {     
      backgroundColor: 'red',
      height: 55, 
      width: 55,
    },

});
