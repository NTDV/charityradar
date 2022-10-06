import { View, Text } from 'react-native';

import { styles } from './styles';

// import { Ionicons } from '@expo/vector-icons';
// import { COLOR_WHITE } from '@shared/constants/style-variables';

/**
 * Превьюшка банковской карты
 */

export const PreviewCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <View style={styles.header}>
          {/*<Ionicons size={25} name={name} style={{ color: COLOR_WHITE }} />*/}
        </View>
      </View>
      <View style={styles.rightColumn}></View>
      <Text>PreviewCard</Text>
    </View>
  );
};
