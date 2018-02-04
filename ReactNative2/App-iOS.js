/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Image, ReactNative, findNodeHandle, NativeEventEmitter} from 'react-native'
import AgoraRTCEngineModule from './components/iOS/agora'
import AgoraRendererView from './components/iOS/AgoraRendererView'

import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  Alert
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class Greeeting extends Component {
  render() {
    //let display = this.state.showText? this.props.text : ' ';
    return (
      <Text> {this.props.text} </Text>
    );
  }
}

const engineEmitter = new NativeEventEmitter(AgoraRTCEngineModule);

export default class App extends Component<{}> {
  componentDidMount() {}

  componentWillUnmount() {
    subscription.remove()
  }
  
  subscription = engineEmitter.addListener(
    'RemoteDidJoineChannel',
    (notify) => AgoraRTCEngineModule.setRemoteView(findNodeHandle(this._remoteView), notify.uid)
 );
  
  _joinChannel() {
    AgoraRTCEngineModule.setLocalView(findNodeHandle(this._localView));
    AgoraRTCEngineModule.startPreview();
    AgoraRTCEngineModule.joinChannel('99099', 0);
  }
  
  _leaveChannel() {
    AgoraRTCEngineModule.stopPreview();
    AgoraRTCEngineModule.leaveChannel();
  }

  render() {
    AgoraRTCEngineModule.createEngine('0c0b4b61adf94de1befd7cdd78a50444');
    AgoraRTCEngineModule.enableVideo();
    AgoraRTCEngineModule.enableAudio();
    AgoraRTCEngineModule.setVideoProfile(360, 640, 15, 300);
    AgoraRTCEngineModule.setChannelProfile(0);
    
    return (
      <View style = {styles.container} >
        <Greeeting text='Greeting from react world' />
        <AgoraRendererView
          ref={component => this._localView = component}
          style = {{width: 360, height: 240}}
        />
        <AgoraRendererView 
          ref={component => this._remoteView = component}
          style = {{width: 360, height: 240}}
        />
        <Button
          onPress={this._joinChannel.bind(this)}
          title="Join Channel"
          color="#841584"
        />
        <Button
          onPress={this._leaveChannel.bind(this)}
          title="Leave Channel"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
