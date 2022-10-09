import { View, ScrollView, Text } from 'react-native';

import { HeaderLogo } from '../../../widgets/header';
import { COLOR_WHITE } from '../../../shared/constants/style-variables';
import { MAIN_PADDING } from '../../../shared/constants/styles-global';

export const UnAuthUserCabinet = () => {
  return (
    <View>
      <HeaderLogo />
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={{ backgroundColor: COLOR_WHITE, flex: 1 }}>
          <Text>123</Text>
        </View>
      </ScrollView>
    </View>
  );
};
