import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Navigation } from '../typings/navigation';
import { TransactionsHistoryScreen } from '../core/views/TransactionHistoryScreen';
import { TransactionDetailsScreen } from '../core/views/TransactionDetailsScreen';
import { AuthenticationScreen } from '../core/views/AuthenticationScreen';
import { AuthenticationContext } from '../context/authenticationContext';

const Stack = createNativeStackNavigator<Navigation.RootStackParamList>();

const RootNavigator = (): JSX.Element => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthenticationContext) as Authentication.ContextType;

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        {isAuthenticated ?
          <>
            <Stack.Screen name="TransactionHistory" component={TransactionsHistoryScreen}
              options={{
                title: "History",
                headerRight: () => (
                  <Pressable onPress={() => setIsAuthenticated(false)}>
                    <Text style={styles.buttonText}>Logout</Text>
                  </Pressable>
                )
              }} />
            <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen}
              options={{
                headerBackTitleVisible: false,
                title: "Details"
              }} />
          </>
          :
          <Stack.Screen name="Authentication" component={AuthenticationScreen} options={{ headerShown: false }} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  buttonText: {
    color: '#000000'
  }
})