import React from 'react';
import {
  TouchableOpacity,  
  StyleSheet,
} from 'react-native';

import { 
    Icon 
 } from 'native-base';

export default function BotaoMenu({acaoMenu}) {

    return (                                
        <TouchableOpacity onPress={() => acaoMenu.openDrawer()}>          
            {/* <Text> Menu </Text> */}
            <Icon ios='ios-menu' android="md-menu" style={styles.btn}/>
        </TouchableOpacity>
        );    
};

const styles = StyleSheet.create({

    btn: {
        paddingStart: 15, 
        fontSize: 30, 
        color: '#ebeeef'
    }   
});
