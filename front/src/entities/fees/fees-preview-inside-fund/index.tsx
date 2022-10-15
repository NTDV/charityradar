import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import { ProgressBar } from '../../../shared/ui/progress-bar';

type FundPreviewProps = {
  onPress: () => void;
  fundDescription: string;
  feesName: string;
  fundraising: {
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
 * @param fundDescription - Описание фонда
 */

export const FeesPreviewInsideFund = ({
  onPress,
  fundraising,
  fundDescription,
  feesName,
}: FundPreviewProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.nameFundContainer}>
        <Text style={styles.nameFund}>{feesName}</Text>
      </View>
      <Text style={styles.info}>
        {' '}
        {fundDescription.length >= 150
          ? fundDescription.substring(0, 150) + '...'
          : fundDescription}
      </Text>
      <View style={styles.fee}>
        <ProgressBar
          allMoney={fundraising.allMoney}
          currentMoney={fundraising.currentMoney}
          deadline={fundraising.deadline}
        />
      </View>
    </TouchableOpacity>
  );
};
