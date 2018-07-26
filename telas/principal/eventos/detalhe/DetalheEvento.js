import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Button,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Container, Fab } from 'native-base';


export default class DetalheEvento extends React.Component {


  static navigationOptions = {
      title: 'Detalhe do Evento',
  };

  state = {
    fabAtivo: false, 
    evento: null,
  };

  async componentDidMount() {

    console.log(this.props.navigation.state.params);
    
    // const {recipe_id} = this.props.navigation.state.params;
    // const fullRecipe = await fetchFullRecipe(recipe_id);
    // this.setState({fullRecipe});

  }

//   renderItem = ({item}) => <RecipeIngredient ingredient={item}/>;

render() {
    return(
      <Container style={styles.container}>
        <View style={styles.content}>
            <Text> Evento aqui... </Text>
        </View>
        <Fab
            active={this.state.fabAtivo}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#3B5998' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.fabAtivo })}>
            
            <Icon type="FontAwesome" name="ellipsis-v" />
            
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon type="FontAwesome" name="users" />
            </Button>

            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon type="FontAwesome" name="edit" />
            </Button>            
      
          </Fab>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 280,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingStart: 10,
    paddingEnd: 10,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  strongText: {
    fontWeight: 'bold',
  },
  sectionSpacing: {
    marginTop: 20,
  },
  sectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
