import { View, Text, Image, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import testPhoto from '../../../static/testImg.png';
import { ProgressBar } from '../../../shared/ui/progress-bar';

type FundPreviewProps = {
  coefficient: string;
  fundName: string;
  fundDescription: string;
  fundraising: {
    allMoney: number;
    currentMoney: number;
    deadline: number;
  };
};

/**
 * Компонент, отображающий превью фонда
 * @param coefficient - Коэффициент доверия
 * @param fundName - Название фонда
 * @param fundraising - информация о сборах
 * @param fundDescription - Описание фонда
 */

export const FeesFull = ({
  coefficient,
  fundName,
  fundraising,
  fundDescription,
}: FundPreviewProps) => {
  return (
    <View style={styles.containerLarge}>
      <View style={styles.containerImg}>
        <Image source={testPhoto} style={styles.imgLarge} />
      </View>
      <View style={styles.coefficientRow}>
        <Text style={styles.nameFund}>{fundName}</Text>
        <Text style={styles.coefficient}>{coefficient}</Text>
      </View>
      <Text style={styles.info}>{fundDescription}</Text>

      <View style={styles.fee}>
        <ProgressBar
          allMoney={fundraising.allMoney}
          currentMoney={fundraising.currentMoney}
          deadline={fundraising.deadline}
        />
      </View>
    </View>
  );
};
