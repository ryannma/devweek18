import React, { Component } from "react";
import { DrawerNavigator, StackNavigator, TabNavigator } from "react-navigation";
import {
  Button,
  Text,
  Icon,
  Item,
  Footer,
  FooterTab,
  Label
} from "native-base";

import PatientScreen from "./PatientScreen.js"
import JadeChat from "./WriteShit.js"


export default (PatientScreenNavigator = TabNavigator(
  {
    PatientScreen: {screen: PatientScreen},
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}>
              <Icon name="bowtie" />
              <Text>Lobotomy</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("PatientScreen")}>
              <Icon name="briefcase" />
              <Text>Amputate</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}>
              <Icon name="headset" />
              <Text>Defib</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
));