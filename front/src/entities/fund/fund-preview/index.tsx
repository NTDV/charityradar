import { View, Text, Image, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import testPhoto from '../../../static/testImg.png';
import { ProgressBar } from '../../../shared/ui/progress-bar';

type FundPreviewProps = {
  onPress: () => void;
  coefficient: string;
  fundName: string;
  fundDescription: string;
  isLarge?: boolean;
  fundraising?: {
    allMoney: number;
    currentMoney: number;
    deadline: number;
  };
};

/**
 * Компонент, отображающий превью фонда
 * @param onPress - Клик на плашку
 * @param coefficient - Коэффициент доверия
 * @param fundraising - информация о сборах
 * @param isLarge - большое отображение для списка
 */

export const FundPreview = ({
  onPress,
  coefficient,
  fundName,
  fundraising,
  fundDescription,
  isLarge,
}: FundPreviewProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, isLarge && styles.containerLarge]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.containerImg}>
        <Image source={testPhoto} style={[styles.img, isLarge && styles.imgLarge]} />
      </View>
      <View style={styles.coefficientRow}>
        <Text style={styles.coefficientTitle}>Коэффициент доверия</Text>
        <Text style={styles.coefficient}>{coefficient}</Text>
      </View>
      <Text style={styles.info}>{fundDescription}</Text>
      <Text style={styles.nameFund}>{fundName}</Text>
      {!!fundraising && (
        <View style={styles.fee}>
          <Text style={styles.feeText}>Текущий сбор:</Text>
          <ProgressBar
            allMoney={fundraising.allMoney}
            currentMoney={fundraising.currentMoney}
            deadline={fundraising.deadline}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
