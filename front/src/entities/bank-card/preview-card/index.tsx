import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import { IconCard } from '../../../shared/icons/icon-card';

/**
 * Превьюшка банковской карты
 */

export const PreviewCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <View style={[styles.header, styles.row]}>
          <IconCard />
          <Text style={styles.headerText}>1032,11 ₽</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.subtitle}>В этом месяце вы пожертвовали</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.balance}>5 000 ₽</Text>
        </View>
      </View>
      <View style={styles.rightColumn}>
        <TouchableOpacity style={styles.button} activeOpacity={0.9}>
          <Text style={styles.buttonName}>Пополнить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
