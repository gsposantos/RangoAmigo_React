import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

export default function Contato({contato, onSelect}) {
  return (    
    <TouchableOpacity onPress={() => onSelect(contato)}>    
      <View style={styles.itemContato}>
        <View style={styles.imagemContato}>             
          <Text>IMG</Text>
        </View>
        <View style={styles.dadosContato}>  
          <View style={styles.nomeContato}> 
            <Text>Nome do juca</Text>       
          </View>
          <View style={styles.infoContato}>                 
            <View style={styles.emailContato}>      
              <Text>email@juca.com</Text>          
            </View>
            <View style={styles.foneContato}>
              <Text>9999999898</Text>    
            </View>
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
    padding: 5,
    //backgroundColor: 'red',   
    //marginTop: 50,
    height: 60, /*ou define altura aqui, ou devine na imagem*/
  },
  imagemContato: {
    flex: 3,    
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'blue',
  },
  dadosContato: {
    flex: 7,
    //backgroundColor: 'green',
    flexDirection: 'column',   
  },
  infoContato:{ 
    flex: 1,         
    flexDirection: 'row',   
    //backgroundColor: 'yellow',    
    justifyContent: 'space-between',
  },
  nomeContato: {
    flex: 1,
    justifyContent: 'flex-start',   
    //backgroundColor: 'orange',
  },
  emailContato: {
    justifyContent: 'flex-end',   
    //backgroundColor: 'white',
  },
  foneContato: {
    justifyContent: 'flex-end',
    //backgroundColor: 'red',  
  }, 

  /*
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  image: {
    width: 60,
    height: 60,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  contentTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  contentScore: {
    marginTop: 5,
  }
  */
});
