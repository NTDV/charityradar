import { ScrollView, View } from 'react-native';

import { styles } from './styles';
import { stylesGlobal } from '../../shared/constants/styles-global';

export const TransactionHistory = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.wrapper, stylesGlobal.mainContainer]}></ScrollView>
    </View>
  );
};
