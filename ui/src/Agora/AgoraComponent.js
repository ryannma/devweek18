import React, { Component } from 'react';
import { AppRegistry, Button, ReactNative, findNodeHandle, StyleSheet,View} from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Body, Content,Text, Card, CardItem } from 'native-base';

import SurfaceView from './components/android/SurfaceView.js';
import APPID from './components/android/Constants.js';
import RtcEnine from './components/RtcEngine.js';

export default class AgoraComponent extends Component<{}> {
  componentDidMount() {
  }

  componentWillUnmount() {
    //AgoraModule.removeView('1111');
  }

  _joinChannel() {
    // var reactTag = findNodeHandle(this._surfaceView);
    //Alert.alert(reactTag + '')

    RtcEnine.setupLocalVideo(this._localView, 480, 340, 0)
    RtcEnine.callAPI('startPreview', [])
    //token, channelName, String optionalInfo, int optionalUid
    RtcEnine.callAPI('joinChannel', ['', 'react', '', 0])

    /*
    AgoraModule.setupLocalVideo('1111', 0);
    AgoraModule.startPreview();
    AgoraModule.joinChannel();
    */
  }

  _leaveChannel() {
  	RtcEnine.callAPI('leaveChannel', [])
  }

  render() {
    //AgoraModule.show('Call java method', AgoraModule.SHORT);
    console.log('rendering');
    var handler = {
      'onJoinChannelSuccess': (channel, uid, elapsed) => {
      	console.log('success');
      },
      'onRejoinChannelSuccess': (channel, uid, elapsed) => {
      },
      'onError': (error) => {
        console.log('error');
      },
      'onUserJoined': (uid, elapsed) => {
      	console.log('user joined');
        RtcEnine.setupRemoteVideo(this._remoteView1, 480, 340, uid)
      },
      'onUserOffline': (uid, reason) => {
      },
      'onFirstRemoteVideoDecoded': (uid, width, height, elapsed) => {
        // RtcEnine.setupRemoteVideo(this._remoteView1, 96, 96, uid)
      },
    };
    RtcEnine.create(APPID, handler);

    let pic = {
      uri: 'http://g.hiphotos.baidu.com/image/pic/item/241f95cad1c8a786c7dedcc46e09c93d71cf5007.jpg'
    };

    return (
      <Container>
      	<Header>
	        <Body>
	          <Title>Doctor Connect via Agora.io</Title>
	        </Body>
	      </Header>
        <SurfaceView 
          style = { {width: 480, height: 280}}
          ref={component => this._localView = component}
        />
        <SurfaceView 
          style = { {width: 480, height: 280}}
          ref={component => this._remoteView1 = component}
        />
        <Button style={styles.buttons}
          onPress={this._joinChannel.bind(this)}
          title='Join Channel'
          color='#841584'
        />
        <Button style={styles.buttons}
          onPress={this._leaveChannel.bind(this)}
          title='Leave Channel'
          color='#841584'
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
	buttons: {
		flexDirection: 'row',
	},
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  remote: {
    width: 360,
    height: 96,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
