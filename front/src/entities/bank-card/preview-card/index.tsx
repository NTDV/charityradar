import { observer } from 'mobx-react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { IconCard } from '../../../shared/icons/icon-card';
import { bankCardStore } from '../../../stores/bank-card-store';
import { numberWithSpaces } from '../../../shared/utils/number-with-spaces';
import { TYPE_PAYMENT } from '../../../shared/constants/types';

/**
 * Превьюшка банковской карты
 */

export const PreviewCard = observer(() => {
  const navigation = useNavigation();
  const { amount, monthDonations } = bankCardStore;

  const onPress = () =>
    navigation.navigate('BalanceIncrease', {
      title: 'Пополнение счета',
      paramPayment: { typePayment: TYPE_PAYMENT.addUserBalance },
    });

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <View style={[styles.header, styles.row]}>
          <IconCard />
          {amount !== null && <Text style={styles.headerText}>{numberWithSpaces(amount)} ₽</Text>}
        </View>
        <View style={styles.row}>
          <Text style={styles.subtitle}>В этом месяце вы пожертвовали</Text>
        </View>
        <View style={styles.row}>
          {monthDonations !== null && (
            <Text style={styles.balance}>{numberWithSpaces(monthDonations)} ₽</Text>
          )}
        </View>
      </View>
      <View style={styles.rightColumn}>
        <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={onPress}>
          <Text style={styles.buttonName}>Пополнить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
