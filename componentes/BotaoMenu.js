import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

export default function BotaoMenu({acaoMenu}) {
//export class BotaoMenu extends React.Component  {
    return (
        // <TouchableOpacity onPress={() => { this.props.navegacao('DrawerOpen'); } }>
        
        <TouchableOpacity onPress={() => acaoMenu.openDrawer()}>  
            <Text> Menu </Text>
        </TouchableOpacity>
        );    
};
