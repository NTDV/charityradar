import { View } from 'react-native';
import { useEffect, useState } from 'react';

import { AuthUserCabinet } from './auth-user-cabinet';
import { UnAuthUserCabinet } from './un-auth-user-cabinet';
import { useAuth, UserType } from '../../shared/hooks/use-auth';
import { AuthFundCabinet } from './auth-fund-cabinet';

export const PersonalCabinet = () => {
  const { user } = useAuth();
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    if (user?.type === UserType.user || user?.type === UserType.fund) setAuth(true);
    else setAuth(false);
  }, [user]);

  if (user?.type === UserType.fund) {
    return <AuthFundCabinet />;
  }

  if (user?.type === UserType.user) {
    return <AuthUserCabinet />;
  }

  if (user?.type === UserType.guest) {
    return <UnAuthUserCabinet />;
  }

  return <View />;
};
