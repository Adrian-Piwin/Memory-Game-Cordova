import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CardList from './CardList';
import { ScreenOrientation } from 'expo';
import WelcomPage from './WelcomePage';
import GamePage from './GamePage';


export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="WelcomPage"
          component={WelcomPage}
          options={{ title: 'Welcome' }}
          style={styles.container}
        />
        <Stack.Screen name="GamePage" component={GamePage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
