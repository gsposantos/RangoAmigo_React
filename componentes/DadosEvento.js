import React from 'react';
import {
  View,
  Text,  
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { Icon } from 'native-base';

export default class DadosEvento extends React.Component {

    render() {

        const { evento } = this.props;

        return(       
            <View style={styles.conteudo}>    
                <View style={styles.topo}>              
                    <Image style={styles.logo} source={{uri: 'data:image/(png|tiff|jpg|gif);base64,' + evento.Imagem.toString()}} />
                    <View style={styles.fundoTitulo}>
                        <Text style={styles.tituloEvento}>
                            {evento.NomeEvento}
                        </Text>
                    </View>  
                </View>
                <View style={styles.local}> 
                    <View style={styles.estiloMapa}>
                        <Icon type="FontAwesome" name="map" style={styles.iconeMapa} />
                    </View>
                    <View style={styles.dadosLocal}>
                    <Text style={styles.textoLocal}>
                        {evento.NomeLocal}
                    </Text>          
                    <Text style={styles.textoEndereco}>
                        {evento.Endereco}
                    </Text>                 
                    </View>              
                </View>
                <View style={{ flex:4,}}>          
                    <View>
                    <Text >
                        Participação              
                    </Text>     
                    </View>
                    <View style={{ flexDirection:'row', alignItems: 'center', }} >
                    <View>
                        {/* <Progress.Bar progress={0.3} />  */}
                    </View>
                    <View>              
                        <Text> 3/7 </Text>
                    </View>
                    </View>
                </View>          
            </View>
        );
    }
};

const styles = StyleSheet.create({

    conteudo:{
        flex:1, 
        marginStart: 10,
        marginEnd: 10,
        marginTop: 10
    },
    
    topo: { 
        flex:4,
    },    

    fundoTitulo: {
        opacity: 0.7, 
        backgroundColor: '#34515e', 
        height: 45, 
        width: Dimensions.get('window').width - 120, 
        marginTop: -45, 
        paddingStart: 10, 
        paddingEnd: 10, 
        paddingTop: 5, 
        paddingBottom: 5 
    },

    logo: {
        backgroundColor: "#056ecf",    
        height: Dimensions.get('window').height/3,
        width: Dimensions.get('window').width - 20,
      },
    
      tituloEvento: {    
        //opacity: 1,
        fontSize: 24,
        fontWeight: 'bold',    
        color: '#ebeeef',
      },

    local:{
        flex:1, 
        flexDirection:'row', 
        alignItems:'center' 
    },

    estiloMapa: { 
        flex:1, 
        alignItems: 'center', 
    },

    iconeMapa:{ 
        fontSize: 40, 
        color: '#34515e', 
    },

    dadosLocal: { 
        flex:4,
    },

    textoLocal: { 
        fontSize: 18,
        fontWeight: 'bold', 
        color: '#34515e', 
    },

    textoEndereco: {
        fontSize: 12,
        color: '#34515e',  
    },

    
  });
  