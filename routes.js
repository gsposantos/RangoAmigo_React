import Principal from './telas/principal';
import LoginStack from './telas/login';
import MenuLateral from './componentes/MenuLateral'
import {DrawerNavigator} from 'react-navigation';

export default DrawerNavigator({
  Principal: {
    screen: Principal
  },
  Login: {
    screen: LoginStack
  },  
}, {
  contentComponent: MenuLateral,
  drawerWidth: 300
});