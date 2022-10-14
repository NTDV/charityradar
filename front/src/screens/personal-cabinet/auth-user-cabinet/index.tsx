import { ScrollView, Text, View } from 'react-native';

import { styles } from './styles';

import { HeaderLogo } from '../../../widgets/header';
import { PreviewCard } from '../../../entities/bank-card';
import { CabinetButtonList } from '../ui/cabinet-button-list';
import { useAuth, UserType } from '../../../shared/hooks/use-auth';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { bankCardStore } from '../../../stores/bank-card-store';

export const AuthUserCabinet = observer(() => {
  const [fio, setFio] = useState('');
  const [email, setEmail] = useState('');
  const { logout, user } = useAuth();

  const exitAccount = () => {
    if (logout !== null) logout();
  };

  useEffect(() => {
    if (user !== null && user !== undefined && user.type === UserType.user) {
      setFio(`${user.user.name} ${user.user.surname} ${user.user.patronymic}`);
      setEmail(user.user.email);
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <HeaderLogo />
      <ScrollView style={styles.wrapper}>
        {(!!fio || !!email) && user?.type === UserType.user && (
          <View style={styles.header}>
            <Text style={styles.headerName}>{fio}</Text>
            <Text style={styles.headerEmail}>{email}</Text>
          </View>
        )}
        {bankCardStore.amount !== null && <PreviewCard />}
        <View style={styles.buttons}>
          <CabinetButtonList buttons={[{ name: 'Выйти', onPress: exitAccount, isWarning: true }]} />
        </View>
      </ScrollView>
    </View>
  );
});
