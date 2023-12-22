import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { AppRoutes } from "./src/routes/app.routes";
import { NavigationContainer } from '@react-navigation/native';

import {
  useFonts,
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium
} from '@expo-google-fonts/rubik';
import { RegisterLoginData } from './src/screens/RegisterLoginData';

export default function App() {
  const [fontsLoader] = useFonts({
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium
  })

  if (!fontsLoader) return null;


  return (
    <NavigationContainer>
       <StatusBar 
         barStyle="light-content"
         backgroundColor="transparent"
         translucent
       />
      <AppRoutes />
    </NavigationContainer>
  )
}


