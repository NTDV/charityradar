import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { AppNavigation } from './app-navigation';
import { SignIn } from '../screens/sign-in';
import { SignUp } from '../screens/sign-up';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../shared/hooks/use-auth';
import { PopularFundScreen } from '../screens/popular-fund-screen';
import { COLOR_BLACK } from '../shared/constants/style-variables';
import { FundScreen } from '../screens/fund-screen';
import { FeesAllScreen } from '../screens/fees-all-screen';
import { FeesFullScreen } from '../screens/fees-full-screen';
import { View } from 'react-native';
import { TransactionHistory } from '../screens/transaction-history';
import { BalanceIncrease } from '../screens/balance-increase';
import { FeesPreviewType } from '../screens/home';
import { TYPE_PAYMENT } from '../shared/constants/types';

const Stack = createStackNavigator();

/**
 * Provider
 */

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  AppNavigation: undefined;
  PopularFundScreen: undefined;
  FundScreen: { id: string | number };
  FeesAllScreen: undefined;
  FeesFullScreen: { id: number | string; fondName: string; fondRating: number | null };
  TransactionHistory: { fundId: number | string };
  BalanceIncrease: {
    title?: string;
    paramPayment?: {
      typePayment: TYPE_PAYMENT.fondDonation;
      idFund?: string | number;
    };
  };
};

export type SignInProps = {
  navigation: NativeStackScreenProps<RootStackParamList, 'SignIn'>['navigation'];
};

export type SignUpProps = {
  navigation: NativeStackScreenProps<RootStackParamList, 'SignUp'>['navigation'];
};

export type AppNavigationProps = {
  navigation: NativeStackScreenProps<RootStackParamList, 'AppNavigation'>['navigation'];
  route: NativeStackScreenProps<RootStackParamList, 'AppNavigation'>['route'];
};

export type PopularFundScreenProps = {
  navigation: NativeStackScreenProps<RootStackParamList, 'PopularFundScreen'>['navigation'];
};

export type FeesAllScreenProps = {
  navigation: NativeStackScreenProps<RootStackParamList, 'FeesAllScreen'>['navigation'];
};

export const Provider = () => {
  const { user } = useAuth();
  const [isSignedIn, setSignedIn] = useState<null | boolean>(null);

  // Роутиг пользователей
  useEffect(() => {
    // Неавторизованный пользователь
    if (user === null) setSignedIn(false);

    // Авторизованный пользователь
    if (user !== null && user !== undefined) setSignedIn(true);
  }, [user]);

  if (isSignedIn === null) return <View />;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        {isSignedIn ? (
          <Stack.Group>
            <Stack.Screen
              name="AppNavigation"
              component={AppNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PopularFundScreen"
              component={PopularFundScreen}
              options={{
                title: 'Популярные фонды',
                headerBackTitle: 'Назад',
                headerTintColor: COLOR_BLACK,
              }}
            />
            <Stack.Screen
              name="FeesAllScreen"
              component={FeesAllScreen}
              options={{
                title: 'Актуальные сборы',
                headerBackTitle: 'Назад',
                headerTintColor: COLOR_BLACK,
              }}
            />
            <Stack.Screen
              name="FeesFullScreen"
              component={FeesFullScreen}
              options={{
                title: 'Информация о сборе',
                headerBackTitle: 'Назад',
                headerTintColor: COLOR_BLACK,
              }}
            />
            <Stack.Screen
              name="FundScreen"
              component={FundScreen}
              options={{
                title: 'Информация о фонде',
                headerBackTitle: 'Назад',
                headerTintColor: COLOR_BLACK,
              }}
            />
            <Stack.Screen
              name="TransactionHistory"
              component={TransactionHistory}
              options={{
                title: 'История транзакций',
                headerBackTitle: 'Назад',
                headerTintColor: COLOR_BLACK,
              }}
            />
            <Stack.Screen
              name="BalanceIncrease"
              component={BalanceIncrease}
              options={{
                title: 'Пополнение баланса',
                headerBackTitle: 'Назад',
                headerTintColor: COLOR_BLACK,
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="SignIn"
              children={(props) => <SignIn {...props} />}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              children={(props) => <SignUp {...props} />}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
