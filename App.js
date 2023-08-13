//import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import { StyleSheet ,StatusBar } from 'react-native';
import MainNavigation from './components/navigations/MainNavigation';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import colors from './components/constants/colors';
import CameraTest from './components/helpers/Camera';


export default function App() {
  useLayoutEffect(() => {

  }, [])
  return(
    <NavigationContainer theme={{ colors: {...DefaultTheme.colors , background : colors.background}}}>
      <StatusBar backgroundColor={colors.primary}/>
     <MainNavigation/>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});