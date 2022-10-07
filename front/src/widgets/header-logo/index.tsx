import { Platform, SafeAreaView, StatusBar, View } from 'react-native';

import { Logo } from '../../shared/ui/logo';

/**
 * Шапка с логотипом
 */

export const HeaderLogo = () => (
  <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
    <View style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
      <Logo />
    </View>
  </SafeAreaView>
);
