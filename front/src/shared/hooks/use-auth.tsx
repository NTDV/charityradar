import { createContext, useContext, useState } from 'react';

type User = {
  type: 'user' | 'guest' | 'fund';
};

type AuthContextDefault = {
  user: null;
  signInSimple: null;
  signInGuest: null;
  signUpSimple: null;
};

export type UseProvideAuthExit = {
  user: User | null;
  signInSimple: () => void;
  signInGuest: () => void;
  signUpSimple: () => void;
};

// Контекст
const authContext = createContext<UseProvideAuthExit | AuthContextDefault>({
  user: null,
  signInSimple: null,
  signInGuest: null,
  signUpSimple: null,
});

// Хук, который создает пользователя и обрабатывает состояние
export const useProvideAuth = (): UseProvideAuthExit => {
  const [user, setUser] = useState<User | null>(null);

  // Авторизация через форму
  const signInSimple = () => {};

  // Авторизация гостя
  const signInGuest = () => {
    setUser({ type: 'guest' });
  };

  // Регистрация через форму
  const signUpSimple = () => {};

  return { user, signUpSimple, signInSimple, signInGuest };
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
