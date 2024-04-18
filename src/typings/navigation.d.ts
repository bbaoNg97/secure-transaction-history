import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    // https://reactnavigation.org/docs/typescript/#specifying-default-types-for-usenavigation-link-ref-etc
    interface RootParamList extends Navigation.RootStackParamList {}
  }
}

declare namespace Navigation {
  type RootStackParamList = {
    TransactionHistory: undefined;
    TransactionDetails: { transactionId: string };
  };

  type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
}