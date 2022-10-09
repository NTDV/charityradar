import { Platform, SafeAreaView, StatusBar, View } from 'react-native';

import { Logo } from '../../../shared/ui/logo';
import { COLOR_WHITE } from '../../../shared/constants/style-variables';

/**
 * Шапка с логотипом
 */

export const HeaderLogoBack = () => (
  <SafeAreaView
    style={{
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: COLOR_WHITE,
    }}
  >
    <View style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
      <Logo />
    </View>
  </SafeAreaView>
);
