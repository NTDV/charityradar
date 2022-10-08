import { View, ScrollView, Text } from 'react-native';

import { styles } from './styles';

import { HeaderLogo } from '../../../widgets/header';
import { COLOR_WHITE } from '../../../shared/constants/style-variables';
import { MAIN_PADDING } from '../../../shared/constants/styles-global';
import { PreviewCard } from '../../../entities/bank-card';

export const AuthUserCabinet = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR_WHITE }}>
      <HeaderLogo />
      <ScrollView style={{ flexGrow: 1, paddingHorizontal: MAIN_PADDING }}>
        <View style={styles.header}>
          <Text style={styles.headerName}>Сафохин Артем</Text>
          <Text style={styles.headerEmail}>asafohin@test.com</Text>
        </View>
        <View>
          <PreviewCard />
        </View>
      </ScrollView>
    </View>
  );
};
