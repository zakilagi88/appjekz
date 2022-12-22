import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import TambahArtikelScreen from '../screens/TambahArtikelScreen';
import DetailArtikelScreen from '../screens/DetailArtikelScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Tab' component={TabNavigator} />
      <Stack.Screen name='TambahArtikel' component={TambahArtikelScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='DetailArtikel' component={DetailArtikelScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
