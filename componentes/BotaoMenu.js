import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

export class BotaoMenu extends React.Component  {
    
    render() {
        console.log(this.props);
        return (
            <TouchableOpacity onPress={() => { this.props.navegacao('DrawerOpen'); } }>
                <Text> Menu </Text>
            </TouchableOpacity>
          );
    }
};
