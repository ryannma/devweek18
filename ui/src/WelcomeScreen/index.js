import React, { Component } from "react";

import WelcomeScreen from "./WelcomeScreen.js";
import PatientScreen from "../PatientScreen/index.js";
import { DrawerNavigator, StackNavigator} from "react-navigation";

const WelcomeScreenRouter = DrawerNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    Patient: { screen: PatientScreenNavigator },
  },
);
export default WelcomeScreenRouter;