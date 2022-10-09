import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import { signUpFormApi } from '../api/sign-up/sign-up-form-api';
import { validationSchemaSimpleFormProps } from '../../widgets/sign-up/lib/validation-schema';

export enum UserType {
  'guest',
  'user',
  'fund',
}

type User = {
  type: UserType;
  token?: string;
  id?: string;
  login?: string;
};

// Пока не сработает хук
type AuthContextDefault = {
  user: undefined;
  signInSimple: null;
  signInGuest: null;
  signUpSimple: null;
  logout: null;
};

// После того, как сработал хук
export type UseProvideAuthExit = {
  user: User | null | undefined;
  signInSimple: () => void;
  signInGuest: () => void;
  logout: () => void;
  signUpSimple: (values: validationSchemaSimpleFormProps) => void;
};

// Контекст
const authContext = createContext<UseProvideAuthExit | AuthContextDefault>({
  user: undefined,
  signInSimple: null,
  signInGuest: null,
  signUpSimple: null,
  logout: null,
});

// Хук, который создает пользователя и обрабатывает состояние
export const useProvideAuth = (): UseProvideAuthExit => {
  // undefined - ждем пока получим данные из Storage
  // null - если получили данные и пользователь не авторизован
  // User - авторизованный пользователь
  const [user, setUser] = useState<User | null | undefined>(undefined);

  // Авторизация через форму
  const signInSimple = () => {};

  // Авторизация гостя
  const signInGuest = () => {
    setUser({ type: UserType.guest });
  };

  // Регистрация через форму
  const signUpSimple = async (values: validationSchemaSimpleFormProps) => {
    const payload = await signUpFormApi(values);

    // Если нет ошибок
    if (payload?.['data']?.['addUserAuth']) {
      const userData = payload['data']['addUserAuth'];
      const user = {
        type: userData['type'],
        token: userData['token'] || '',
        id: userData['id'],
        login: userData['login'],
      };

      await SecureStore.setItemAsync('user', JSON.stringify(user));
      setUser(user);
    }
  };

  // Выход
  const logout = async () => {
    await SecureStore.deleteItemAsync('user');
    setUser(null);
  };

  // Проверка при первом входе в приложении
  useEffect(() => {
    (async () => {
      const userStorage = await SecureStore.getItemAsync('user');

      // Если есть пользователь
      if (userStorage !== null) {
        setUser(JSON.parse(userStorage));
      } else {
        setUser(null);
      }
    })();
  }, []);

  return { user, signUpSimple, signInSimple, signInGuest, logout };
};

// Обертка приложения
export const ProvideAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// Хук авторизации
export const useAuth = (): UseProvideAuthExit | AuthContextDefault => {
  return useContext(authContext);
};
