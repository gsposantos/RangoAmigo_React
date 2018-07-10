import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import React from 'react';
import Router from './routes';

export default class App extends React.Component {
  render () {
    return (
      <Router/>
    );
  }
}
