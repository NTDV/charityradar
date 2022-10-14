import { ScrollView, Text, View } from 'react-native';

import { styles } from './styles';

import { HeaderLogo } from '../../../widgets/header';
import { CabinetButtonList } from '../ui/cabinet-button-list';
import { useAuth, UserType } from '../../../shared/hooks/use-auth';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { bankCardStore } from '../../../stores/bank-card-store';
import { getBalance } from '../../../shared/api/bank-card/get-balance';
import { numberWithSpaces } from '../../../shared/utils/number-with-spaces';

export const AuthFundCabinet = observer(() => {
  const [fundData, setFundData] = useState({});
  const { logout, user } = useAuth();

  const exitAccount = () => {
    if (logout !== null) logout();
  };

  const getBalanceCard = async () => {
    if (!!user && !!user.token) {
      const payload = await getBalance(user.token);

      if (payload !== null) {
        bankCardStore.setCurrentBalance(payload.amount);
      }
    }
  };

  useEffect(() => {
    if (user !== null && user !== undefined && user.type === UserType.fund) {
      setFundData({
        name: user.fund?.name,
        email: user.fund?.email,
      });
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      await getBalanceCard();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderLogo />
      <ScrollView style={styles.wrapper}>
        {user?.type === UserType.fund && (
          <View style={styles.header}>
            <Text style={styles.headerName}>{fundData.name}</Text>
            <Text style={styles.headerEmail}>{fundData.email}</Text>
          </View>
        )}
        {bankCardStore.amount !== null && (
          <View style={styles.money}>
            <Text style={styles.moneyTitle}>Баланс:</Text>
            <Text style={styles.moneySubtitle}>{numberWithSpaces(bankCardStore.amount)}</Text>
          </View>
        )}
        <View style={styles.buttons}>
          <CabinetButtonList buttons={[{ name: 'Выйти', onPress: exitAccount, isWarning: true }]} />
        </View>
      </ScrollView>
    </View>
  );
});
