import { View } from 'react-native';

import { styles } from './styles';

import { CustomButton } from '../../../shared/ui/custom-button';
import { IconVtb } from '../../../shared/icons/icon-vtb';

/**
 * widget регистрации через внешнее api
 */

export const IdForm = () => {
  return (
    <View style={styles.container}>
      <CustomButton name="Войти по ВТБ ID" onPress={() => {}} icon={<IconVtb />} />
    </View>
  );
};
