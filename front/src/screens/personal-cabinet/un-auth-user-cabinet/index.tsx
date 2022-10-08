import { View, ScrollView } from 'react-native';

import { HeaderLogo } from '../../../widgets/header';
import { COLOR_WHITE } from '../../../shared/constants/style-variables';
import { MAIN_PADDING } from '../../../shared/constants/styles-global';

export const UnAuthUserCabinet = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR_WHITE }}>
      <HeaderLogo />
      <ScrollView style={{ flexGrow: 1, paddingHorizontal: MAIN_PADDING }}></ScrollView>
    </View>
  );
};
