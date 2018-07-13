import React from 'react';
import {
  View,  
  Image,
  ScrollView,  
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const buscaDetalheConvite = async eventoId => {
//   const res = await fetch(`https://food2fork.com/api/get?key=${food2ForkKey}&rId=${recipeId}`);
//   const {recipe} = await res.json();
//   return recipe;
};


export default class DetalheConvite extends React.Component {

    static navigationOptions = {
        title: 'Detalhe do Convite',
    };

  state = {
    fullRecipe: null,
  };

//   async componentDidMount() {
//     const {recipe_id} = this.props.navigation.state.params;

//     const fullRecipe = await fetchFullRecipe(recipe_id);

//     this.setState({fullRecipe});
//   }

//   renderItem = ({item}) => <RecipeIngredient ingredient={item}/>;

render() {
    return(
      <ScrollView style={styles.container}>
      <Image
        style={styles.headerImage}
        source={'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'}
      />
      <View style={styles.content}>
        
      </View>
      </ScrollView>
    );
  }

//   render() {
//     const {params: recipe} = this.props.navigation.state;
//     const {fullRecipe} = this.state;
//     const { state: { favorites }, toggleFavorite } = this.props.screenProps;

//     return (
//       <ScrollView style={styles.container}>
//         <Image
//           style={styles.headerImage}
//           source={getImageSrc(recipe)}
//         />
//         <View style={styles.content}>
//           <View style={styles.contentHeader}>
//             <View>
//               <Text>
//                 Score:
//                 <Text style={styles.strongText}>
//                   {' '}{Math.round(recipe.social_rank)}%
//                 </Text>
//               </Text>
//               <Text style={{ marginTop: 5 }}>
//                 Publisher:
//                 <Text style={styles.strongText}>
//                   {' '}{recipe.publisher}
//                 </Text>
//               </Text>
//             </View>
//             <View>
//               <TouchableOpacity onPress={() => toggleFavorite(recipe)}>
//                 <MaterialIcons
//                   name="favorite"
//                   size={34}
//                   color="#f00"
//                   style={{ opacity: favorites.has(recipe.recipe_id) ? 1 : 0.6 }}
//                 />;
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={styles.sectionSpacing}>
//             <Text style={styles.sectionTitle}>
//               Ingredients
//             </Text>
//             <View>
//               {
//                 !fullRecipe
//                   ? <ActivityIndicator style={styles.sectionSpacing} size="large" color="#000"/>
//                   : (
//                     <FlatList
//                       style={{width: '100%'}}
//                       data={getIngredients(fullRecipe)}
//                       renderItem={this.renderItem}
//                     />
//                   )
//               }
//             </View>
//           </View>
//           <View style={styles.sectionSpacing}>
//             <Text style={styles.sectionTitle}>Instructions</Text>
//             <Button onPress={this.handleSeeInstructions} title="See Instructions"/>
//           </View>
//         </View>
//       </ScrollView>
//     );
//   }
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