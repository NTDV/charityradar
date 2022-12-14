import { View, Text, Image, TouchableOpacity } from 'react-native';
import { intervalToDuration } from 'date-fns';

import { styles } from './styles';

import { ProgressBar } from '../../../shared/ui/progress-bar';
import { IconNullPhoto } from '../../../shared/icons/icon-null-photo';
import { FundPreviewType } from '../../../screens/home';
import { BASE_URL } from '../../../shared/api/general';
import { Rating } from '../../../shared/ui/rating';

type FundPreviewProps = {
  onPress: () => void;
  coefficient: number | null; // rating
  fundName: string;
  fundDescription: string | null;
  image: string | null;
  isLarge?: boolean;
  fees?: FundPreviewType['fees'];
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
  image,
  fundDescription,
  isLarge,
  fees,
}: FundPreviewProps) => {
  const getDeadline = (startDate: Date, endDate: Date) => {
    return intervalToDuration({ start: new Date(startDate), end: new Date(endDate) }).days;
  };

  return (
    <TouchableOpacity
      style={[styles.container, isLarge && styles.containerLarge]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.containerImg}>
        {image === null ? (
          <View style={[styles.img, styles.imgEmpty, isLarge && styles.imgLarge]}>
            <IconNullPhoto />
          </View>
        ) : (
          <Image
            source={{ uri: `${BASE_URL}/${image}` }}
            style={[styles.img, isLarge && styles.imgLarge]}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={styles.coefficientRow}>
        <Text style={styles.coefficientTitle}>Коэффициент доверия</Text>
        {coefficient !== null && <Rating rating={coefficient} styles={styles.coefficient} />}
      </View>
      {fundDescription !== null && (
        <Text style={styles.info}>
          {fundDescription.length >= 99
            ? fundDescription.substring(0, 99) + '...'
            : fundDescription}
        </Text>
      )}
      <Text style={styles.nameFund}>{fundName}</Text>
      {fees !== undefined ? (
        <View style={styles.fee}>
          <Text style={styles.feeText}>Информация о сборе:</Text>
          <ProgressBar
            allMoney={fees.goal}
            currentMoney={fees.collected}
            deadline={getDeadline(fees.startDate, fees.endDate) ?? null}
          />
        </View>
      ) : (
        <Text style={{ marginTop: 10 }}>Нет сборов</Text>
      )}
    </TouchableOpacity>
  );
};
