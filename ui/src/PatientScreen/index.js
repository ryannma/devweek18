import React, { Component } from 'react';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';
import {
  Button,
  Text,
  Icon,
  Item,
  Footer,
  FooterTab,
  Label
} from 'native-base';

import PatientScreen from './PatientScreen.js'
import JadeChat from './WriteShit.js'
import AgoraComponent from '../Agora/AgoraComponent';
import AudioExample from '../Veritone';


export default (PatientScreenNavigator = TabNavigator(
  {
    PatientScreen: {screen: PatientScreen},
    JadeChat: {screen: JadeChat},
    AgoraComponent: {screen: AgoraComponent},
    AudioExample: {screen: AudioExample}
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate('JadeChat')}>
              <Icon name='bowtie' />
              <Text>Lobotomy</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate('PatientScreen')}>
              <Icon name='briefcase' />
              <Text>Amputate</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate('AgoraComponent')}>
              <Icon name='headset' />
              <Text>Defib</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 3}
              onPress={() => props.navigation.navigate('AudioExample')}>
              <Icon name='fa-headphones' />
              <Text>Audio</Text>
            </Button>

          </FooterTab>
        </Footer>
      );
    }
  }
));