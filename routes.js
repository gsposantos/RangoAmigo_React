import Principal from './telas/principal';
import Login from './telas/login';
import MenuLateral from './componentes/MenuLateral'
import {DrawerNavigator} from 'react-navigation';

export default DrawerNavigator({
  Principal: {
    screen: Principal
  },
  Login: {
    screen: Login
  },  
}, {
  contentComponent: MenuLateral,
  drawerWidth: 300
});