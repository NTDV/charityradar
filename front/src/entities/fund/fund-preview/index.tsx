import { View, Text, Image, TouchableOpacity } from 'react-native';
import { format, intervalToDuration, parse } from 'date-fns';

import { styles } from './styles';

import { ProgressBar } from '../../../shared/ui/progress-bar';
import { IconNullPhoto } from '../../../shared/icons/icon-null-photo';
import { FundPreviewType } from '../../../screens/home';
import { BASE_URL } from '../../../shared/api/general';

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
  const getDeadline = (startDate: Date, endDate: Date): number | undefined => {
    const start = format(new Date(startDate), 'dd.MM.yyyy', new Date());
    const end = parse(new Date(endDate), 'dd.MM.yyyy', new Date());

    // return intervalToDuration({ start, end }).days;
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
            source={{ uri: `${BASE_URL}/images/${image}` }}
            style={[styles.img, isLarge && styles.imgLarge]}
          />
        )}
      </View>
      <View style={styles.coefficientRow}>
        <Text style={styles.coefficientTitle}>Коэффициент доверия</Text>
        {coefficient !== null && <Text style={styles.coefficient}>{coefficient}</Text>}
      </View>
      {fundDescription !== null && <Text style={styles.info}>{fundDescription}</Text>}
      <Text style={styles.nameFund}>{fundName}</Text>
      {fees !== undefined && (
        <View style={styles.fee}>
          <Text style={styles.feeText}>Текущий сбор:</Text>
          <ProgressBar
            allMoney={fees.goal}
            currentMoney={fees.collected}
            deadline={getDeadline(fees.startDate, fees.endDate) ?? null}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
