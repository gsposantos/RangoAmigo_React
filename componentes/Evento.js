import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

export default function Evento({evento, onSelect}) {
  return (    
    <TouchableOpacity onPress={() => onSelect(evento)}>    
      <View style={styles.itemEvento}>
        <View style={styles.imagemEvento}>                       
          <Image 
            style={styles.logo} 
            source={{uri: 'data:image/png;base64,' + evento.Imagem}} 
            //data:image/png;base64 + evento.Imagem
            />          

        </View>
        <View style={styles.dadosEvento}>  
          <View style={styles.infoSuperior}>         
            <Text style={styles.tituloEvento} >{evento.NomeEvento}</Text>
            <Text style={styles.textoEvento} >{evento.Datas[0].DiaEventoFormatado}</Text>          
          </View>
          <View style={styles.infoInferior}>                             
              <Text style={styles.textoEvento}>{evento.NomeLocal}</Text>          
              <Text numberOfLines={1} style={styles.textoEventoMenor}>{evento.Endereco}</Text>    
          </View>
        </View>
      </View> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemEvento: {       
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: 1,
    backgroundColor: '#ebeeef',   
    //marginTop: 50,
    height: 95, /*ou define altura aqui, ou devine na imagem*/
  },
  imagemEvento: {
    flex: 3,    
    alignItems: 'center',
    justifyContent: 'center',
//    backgroundColor: 'blue',
  },
  
  logo: {
    backgroundColor: "#056ecf",
    height: 80,
    width: 110,
  },

  dadosEvento: {
    flex: 7,
    paddingStart:3,
//    backgroundColor: 'green',
    justifyContent: 'flex-start',
    //flexDirection: 'column',   
  },
  infoInferior:{ 
    justifyContent: 'flex-start',
    flex: 2,         
    //flexDirection: 'row',   
//    backgroundColor: 'yellow',    
    //justifyContent: 'space-between',
    //justifyContent: 'flex-end',
  },
  infoSuperior: {
    flex: 3,
    //justifyContent: 'flex-start',       
//    backgroundColor: 'orange',
  },
  tituloEvento: {
    //justifyContent: 'flex-end',   
    //backgroundColor: 'white',
    fontSize: 20, 
    fontWeight: 'bold', 
    color:'#21284f'
  },
  textoEvento: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'#21284f',
    //justifyContent: 'flex-end',
    //backgroundColor: 'red',  
  }, 
  textoEventoMenor: {
    fontSize: 12,   
    color:'#21284f', 
    //justifyContent: 'flex-end',
    //backgroundColor: 'red',  
  }, 
});
  