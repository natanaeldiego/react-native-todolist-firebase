/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, SafeAreaView} from 'react-native';
import Routes from './src/routes/Routes';
import {name as appName} from './app.json';
import {initializeFirebaseApi} from './src/services/FirebaseApi';

const wrappedRoutes = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Routes />
    </SafeAreaView>
  );
};

AppRegistry.registerComponent(appName, () => {
  initializeFirebaseApi();
  return wrappedRoutes;
});
