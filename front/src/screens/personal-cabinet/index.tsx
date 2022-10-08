import { View } from 'react-native';
import { useState } from 'react';

import { AuthUserCabinet } from './auth-user-cabinet';
import { UnAuthUserCabinet } from './un-auth-user-cabinet';

export const PersonalCabinet = () => {
  const [isAuth, setAuth] = useState(true);
  return <View>{isAuth ? <AuthUserCabinet /> : <UnAuthUserCabinet />}</View>;
};
