/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {currentFirebaseUser} from '../services/FirebaseApi';

export default class App extends Component {
  _isMounted = false;
  async componentDidMount() {
    this._isMounted = true;
    let resetNavigation = CommonActions.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
    try {
      if (this._isMounted) {
        const user = await currentFirebaseUser();
        if (user) {
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'TaskList'}],
            }),
          );
        }
        this.props.navigation.dispatch(resetNavigation);
      }
    } catch (error) {
      this.props.navigation.dispatch(resetNavigation);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={styles.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: 50,
    height: 50,
  },
});
