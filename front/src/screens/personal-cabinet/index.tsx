import { View } from 'react-native';
import { useEffect, useState } from 'react';

import { AuthUserCabinet } from './auth-user-cabinet';
import { UnAuthUserCabinet } from './un-auth-user-cabinet';
import { useAuth, UserType } from '../../shared/hooks/use-auth';

export const PersonalCabinet = () => {
  const { user } = useAuth();
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    if (user?.type === UserType.user) setAuth(true);
    else setAuth(false);
  }, [user]);

  return <View>{isAuth ? <AuthUserCabinet /> : <UnAuthUserCabinet />}</View>;
};
