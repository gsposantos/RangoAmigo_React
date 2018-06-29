import React from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,  
  StyleSheet,
} from 'react-native';

//import RecipeList from '../../../components/RecipeList';

const buscaEventos = async q => {
//   const res = await fetch(`https://food2fork.com/api/search?key=${food2ForkKey}&q=${q}`);

//   console.log('https://food2fork.com/api/search?key=${food2ForkKey}&q=${q}');
//   const {recipes} = await res.json();

//   return recipes;
};

export default class MeusEventos extends React.Component {
  static navigationOptions = {
    title: 'Meus Eventos',
  };

  state = {
    query: '',
    recipes: [],
    loading: false,
  };

//   handleSearchChange = query => {
//     this.setState({query});
//   };

//   handleSearchSubmit = async () => {
//     this.setState({loading: true});

//     const recipes = await fetchRecipes(this.state.query);

//     this.setState({loading: false, recipes});
//   };

//   handleSelect = item => {
//     this.props.navigation.navigate('Recipe', item);
//   };

//   renderResults = () => {
//     const { recipes } = this.state;

//     return <RecipeList recipes={this.state.recipes} onSelectRecipe={this.handleSelect} />;
//   };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Search recipes:</Text>
          <TextInput
            style={styles.searchInput}           
            returnKeyType="search"
          />
        </View>
        <View style={styles.resultsContainer}>
            <ActivityIndicator size="large" color="#000"/>
          {/* {
            this.state.loading
              ? <ActivityIndicator size="large" color="#000"/>
              : this.renderResults()
          } */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingStart: 10,
    paddingEnd: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },
  headerTitle: {
    fontWeight: 'bold'
  },
  searchInput: {
    marginTop: 10,
    borderRadius: 6,
    borderWidth: 1,
    paddingTop: 5,
    paddingEnd: 10,
    paddingBottom: 5,
    paddingStart: 10,
  },
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
