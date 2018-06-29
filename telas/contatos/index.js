import React from 'react';
import { View,Text } from 'react-native';


const ContatosStack = ({ screenProps: { state }, navigation }) => (
  <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
    <Text>
        Lista de contatos!!!
    </Text>
  </View>
);

// export default class App extends Component {
 
//   buscarContatos = () => {
//       return Contacts.getAll((err, contacts) => {
//             contacts = contacts.sort((a, b)=>{
//               if (a.givenName < b.givenName) return -1;
//               if (a.givenName > b.givenName) return 1;
//               return 0;
//             });
//         });
//   }
  
//   render() {
    
//     const contatos = this.buscarContatos();
    
//     return (
//       <View style={styles.container}>
//         <Text style={styles.paragraph}>
//           {contatos}
//         </Text>
//       </View>
//     );
//   }
// }

export default ContatosStack;