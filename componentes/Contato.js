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
      
      {/* <View style={styles.container}>
        <Image
          style={styles.image}
          //source={getImageSrc(recipe)}
        />
        <View style={styles.content}>
          <Text style={styles.contentTitle} numberOfLines={1}>
            {contato.givenName}
          </Text>
          <View style={styles.contentScore}>
            <Text>
              Fone:
              <Text style={{fontWeight: 'bold'}}>
                {' '}{contato.phoneNumbers[0].number}%
              </Text>
            </Text>
          </View>
        </View>
      </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  itemContato: {
    //marginTop: 50,
    flexDirection: 'row',
    backgroundColor: 'red',
    height: 65,
  },
  imagemContato: {
    flex: 2,
    //backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dadosContato: {
    flex: 8,
    backgroundColor: 'green',
    flexDirection: 'column',
  },
  infoContato:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'yellow',
    //justifyContent: 'space-between',
  },
  nomeContato: {
    flex: 1,
    justifyContent: 'flex-start',
    //backgroundColor: 'orange',
  },
  emailContato: {
    flex:1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: 'orange',
  },
  foneContato: {
    flex:1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'red',
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
