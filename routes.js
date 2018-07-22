import Principal from './telas/principal';
import LoginStack from './telas/login';
import CadastroStack from './telas/perfil';
import MenuLateral from './componentes/MenuLateral'
import {DrawerNavigator} from 'react-navigation';

export default DrawerNavigator({
  Principal: {
    screen: Principal
  },
  Login: {
    screen: LoginStack
  },  
  Cadastro: {
    screen: CadastroStack
  }, 
}, {
  contentComponent: MenuLateral,
  drawerWidth: 300
});