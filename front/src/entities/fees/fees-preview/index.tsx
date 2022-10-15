import { View, Text, Image, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import { ProgressBar } from '../../../shared/ui/progress-bar';
import { BASE_URL } from '../../../shared/api/general';

type FundPreviewProps = {
  onPress: () => void;
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
          resizeMode="cover"
        />
      </View>
      <View style={styles.coefficientRow}>
        <Text style={styles.nameFund}>{fundName}</Text>
      </View>
      <Text style={styles.info}>
        {fundDescription.length >= 99 ? fundDescription.substring(0, 99) + '...' : fundDescription}
      </Text>

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
