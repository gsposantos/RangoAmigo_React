import React from 'react';
import {
  View,
  Text,  
  Image,
  StyleSheet,
  Dimensions,
  FlatList
} from 'react-native';

import { Icon, Card } from 'native-base';
//npm install react-native-progress --save
import * as Progress from 'react-native-progress';

export default class DadosEvento extends React.Component {

    renderDataEvento = ({ item }) => {

        let confirmados = 0;
        let adesao = 0;

        for(const participante of item.Participacao){
            if(participante.Voto){
                confirmados++;
            }
        }

        adesao = confirmados/item.Participacao.length;

        return (
            <View style={{ flexDirection:'row', alignItems: 'center', paddingTop:10 }} >                        
                <View style={{paddingStart:5, paddingEnd:5, }}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#3B5998',}}>
                        {item.DiaEventoFormatado}
                    </Text>     
                </View>
                <View style={{paddingStart:5, paddingEnd:5, }}>
                    <Progress.Bar progress={adesao} />
                </View>
                <View style={{paddingStart:5, paddingEnd:5, }}>              
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#3B5998',}}> {confirmados} / {item.Participacao.length} </Text>
                </View>
            </View>
        )
    } 

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
                <View style={[styles.local, styles.cardStyle]}> 
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
                <View style={{flex:4, marginBottom:10}} >       
                    <View style={styles.cardStyle}>       
                        <View style={{paddingStart:10, paddingTop:5, paddingBottom:5, backgroundColor:'#34515e'}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#ebeeef',}}>
                                Participação              
                            </Text>     
                        </View>

                        <FlatList
                            style={{width: '100%'}}
                            data={evento.Datas}
                            keyExtractor={data => data.DiaEvento.toString()}
                            renderItem={this.renderDataEvento}
                        />

                    </View>          
                </View> 
            </View>
        );
    }
};

const styles = StyleSheet.create({

    cardStyle: {
        flex:1,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },

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
  