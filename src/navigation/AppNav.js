import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default function AppNav() {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator
          size='large'
          color='red'
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
          }}
        />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken != null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
