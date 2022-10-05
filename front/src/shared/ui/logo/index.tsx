import { Text, View } from 'react-native';

import { styles } from './styles';

/**
 * Логотип
 */

export const Logo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.secondaryColor}>CHARITY </Text>
      <Text style={styles.primaryColor}>RADAR</Text>
    </View>
  );
};
