import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { Navigation } from '../typings/navigation';
import { TransactionsHistoryScreen } from '../core/views/TransactionHistoryScreen';
import { TransactionDetailsScreen } from '../core/views/TransactionDetailsScreen';

const Stack = createNativeStackNavigator<Navigation.RootStackParamList>();

const RootNavigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="TransactionHistory" component={TransactionsHistoryScreen} />
        <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} options={{ headerBackTitleVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;