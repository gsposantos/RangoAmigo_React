import PropTypes from 'prop-types';
import React from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, StyleSheet} from 'react-native';

export default class MenuLateral extends React.Component {
  
    navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
            <Text style={styles.sectionHeadingStyle}>
              CABECALHO AQUI
            </Text>            
        </View>
        <ScrollView>
          
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Section 2
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Login')}>
                Page2
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Principal')}>
                Page3
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>RODAPE AQUI</Text>
        </View>
      </View>
    );
  }
}

MenuLateral.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
container: {
    paddingTop: 20,
    flex: 1
  },
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  }
});
