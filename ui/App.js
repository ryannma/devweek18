/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Content, InputGroup } from 'native-base';

import WelcomeScreen from './src/WelcomeScreen/index.js';

export default class App extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
        patientId: '',
    }
  }

  render() {
    return <WelcomeScreen/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
