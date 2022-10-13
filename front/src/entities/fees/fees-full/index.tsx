import { View, Text, Image } from 'react-native';

import { styles } from './styles';

import { ProgressBar } from '../../../shared/ui/progress-bar';
import { BASE_URL } from '../../../shared/api/general';

type FundPreviewProps = {
  coefficient?: string;
  fundName?: string;
  fundDescription?: string;
  image?: string;
  fundraising?: {
    allMoney: number;
    currentMoney: number;
    deadline: number | null;
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
  image,
}: FundPreviewProps) => {
  return (
    <View style={styles.containerLarge}>
      {image && (
        <View style={styles.containerImg}>
          <Image source={{ uri: `${BASE_URL}/images/${image}` }} style={styles.imgLarge} />
        </View>
      )}
      <View style={styles.coefficientRow}>
        <Text style={styles.nameFund}>{fundName}</Text>
        <Text style={styles.coefficient}>{coefficient}</Text>
      </View>
      <Text style={styles.info}>{fundDescription}</Text>
      {fundraising && (
        <View style={styles.fee}>
          <ProgressBar
            allMoney={fundraising.allMoney}
            currentMoney={fundraising.currentMoney}
            deadline={fundraising.deadline}
          />
        </View>
      )}
    </View>
  );
};
