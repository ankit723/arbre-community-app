import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../index';
import ForgotPasswordScreen from '../ForgotPasswordScreen';
import PageOne from '../PageOne';
import PageTwo from '../PageTwo';
import PageThree from '../PageThree';
import PageFour from '../PageFour';
import PageFive from '../PageFive';
import PageSix from '../PageSix';

export type RootStackParamList = {
  Home: undefined;
  index: undefined;
  ForgotPasswordScreen: undefined;
  PageOne: undefined;
  PageTwo: { formData: any };
  PageThree: { formData: any };
  PageFour:{formData:any};
  PageFive:{formData:any};
  PageSix:{formData:any};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" component={HomeScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="PageOne" component={PageOne} />
      <Stack.Screen name="PageTwo" component={PageTwo} />
      <Stack.Screen name="PageThree" component={PageThree} />
      <Stack.Screen name="PageFour" component={PageFour} />
      <Stack.Screen name="PageFive" component={PageFive} />
      <Stack.Screen name="PageSix" component={PageSix} />
    </Stack.Navigator>
  );
}
