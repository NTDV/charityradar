import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { AppNavigation } from './app-navigation';
import { SignIn } from '../screens/sign-in';
import { SignUp } from '../screens/sign-up';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../shared/hooks/use-auth';

const Stack = createStackNavigator();

/**
 * Provider
 */

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type SignInProps = {
  navigation: NativeStackScreenProps<RootStackParamList, 'SignIn'>['navigation'];
};

export type SignUpProps = {
  navigation: NativeStackScreenProps<RootStackParamList, 'SignUp'>['navigation'];
};

export const Provider = () => {
  const auth = useAuth();
  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (auth.user !== null) {
      setSignedIn(true);
    }
  }, [auth.user]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        {isSignedIn ? (
          <Stack.Screen
            name="AppNavigation"
            component={AppNavigation}
            options={{ headerShown: false }}
          />
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
