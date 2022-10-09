import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import { signUpFormApi } from '../api/sign-up/sign-up-form-api';
import { validationSchemaSimpleFormProps } from '../../widgets/sign-up/lib/validation-schema';
import { validationSchemaSimpleFormSignInProps } from '../../widgets/sign-in/lib/validation-schema';
import { signInFormApi } from '../api/sign-in/sign-in-form-api';
import { AuthUser } from '../api/sign-in/auth-user';
import { AuthFund } from '../api/sign-in/auth-fund';

export enum UserType {
  'guest',
  'user',
  'fund',
}

interface UserDynamic {
  [key: string]: any;
}

export type User =
  | {
      type: UserType;
      user?: {
        token: string;
        email: string;
        id: string;
        name: string;
        patronymic: string;
        phone: string;
        surname: string;
      };
      fund?: {
        id: string;
        name: string;
        email: string;
        phone: string;
        image: string;
        description: string;
        rating: number;
      };
    }
  | UserDynamic;

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
  signInSimple: (values: validationSchemaSimpleFormSignInProps) => void;
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
  const signInSimple = async (values: validationSchemaSimpleFormSignInProps) => {
    const user: User | UserDynamic = {};
    const payload = await signInFormApi(values);

    if (payload?.['data']?.['authByLoginPass'] === null) {
      return { err: { message: 'Логин или пароль введены неверно', type: 'incorrect' } };
    } else if (payload?.['data']?.['authByLoginPass']?.['confirmed'] === false) {
      return {
        err: { message: 'Ваша почта не подтверждена', type: 'noConfirmed' },
        token: payload['data']['authByLoginPass']['token'],
      };
    } else {
      // Если успешно, то отправляем запрос на получение данных у фонда или физ лица
      const type: UserType = payload['data']['authByLoginPass']['type'];
      const link = payload['data']['authByLoginPass']['link'];

      // Присваиваем тип
      user['type'] = type;

      if (type === UserType.fund) {
        const fundData = await AuthFund(link);
        user['fund'] = fundData;
      }

      if (type === UserType.user) {
        const userData = await AuthUser(link);
        user['user'] = userData;
      }
    }

    await SecureStore.setItemAsync('user', JSON.stringify(user));
    setUser(user);
  };

  // Авторизация гостя
  const signInGuest = () => {
    setUser({ type: UserType.guest });
  };

  // Регистрация через форму
  const signUpSimple = async (values: validationSchemaSimpleFormProps) => {
    const payload = await signUpFormApi(values);

    // Если нет ошибок
    if (payload?.['data']?.['addUserAuth']) {
      return { err: null };
    } else {
      return { err: { message: 'Что-то пошло не так' } };
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
