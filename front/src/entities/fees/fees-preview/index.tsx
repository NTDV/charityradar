import { View, Text, Image, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import { ProgressBar } from '../../../shared/ui/progress-bar';
import { BASE_URL } from '../../../shared/api/general';
import { Rating } from '../../../shared/ui/rating';

type FundPreviewProps = {
  onPress: () => void;
  coefficient: string | number | null;
  fundName: string;
  fundDescription: string;
  isLarge?: boolean;
  image: string;
  fundraising?: {
    allMoney: number;
    currentMoney: number;
    deadline: number | null;
  };
};

/**
 * Компонент, отображающий превью фонда
 * @param onPress - Клик на плашку
 * @param coefficient - Коэффициент доверия
 * @param fundName - Название фонда
 * @param fundraising - информация о сборах
 * @param fundDescription - Описание фонда
 * @param isLarge - большое отображение для списка
 */

export const FeesPreview = ({
  onPress,
  coefficient,
  fundName,
  fundraising,
  fundDescription,
  isLarge,
  image,
}: FundPreviewProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, isLarge && styles.containerLarge]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.containerImg}>
        <Image
          source={{ uri: `${BASE_URL}/${image}` }}
          style={[styles.img, isLarge && styles.imgLarge]}
        />
      </View>
      <View style={styles.coefficientRow}>
        <Text style={styles.nameFund}>{fundName}</Text>
        {coefficient !== null && <Rating rating={coefficient} styles={styles.coefficient} />}
      </View>
      <Text style={styles.info}>{fundDescription}</Text>

      {!!fundraising && (
        <View style={styles.fee}>
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
