import React, { Component } from 'react';
import { DrawerNavigator, StackNavigator} from 'react-navigation';

import WelcomeScreen from './WelcomeScreen.js';
import PatientScreen from '../PatientScreen/index.js';

const WelcomeScreenRouter = DrawerNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    Patient: { screen: PatientScreenNavigator },
  },
);
export default WelcomeScreenRouter;