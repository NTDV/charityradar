import { View } from 'react-native';

import { styles } from './styles';

import { IconSber } from '../../../shared/icons/icon-sber';
import { CustomButton } from '../../../shared/ui/custom-button';
import { IconTinkoff } from '../../../shared/icons/icon-tinkoff';
import { IconVtb } from '../../../shared/icons/icon-vtb';

/**
 * widget авторизации через внешнее api
 */

export const IdForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CustomButton name="Войти по Сбер ID" onPress={() => {}} icon={<IconSber />} />
      </View>
      <View style={styles.row}>
        <CustomButton name="Войти по Tinkoff ID" onPress={() => {}} icon={<IconTinkoff />} />
      </View>
      <View>
        <CustomButton name="Войти по ВТБ ID" onPress={() => {}} icon={<IconVtb />} />
      </View>
    </View>
  );
};
