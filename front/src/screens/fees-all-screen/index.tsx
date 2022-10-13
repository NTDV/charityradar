import { FlatList, RefreshControl, View } from 'react-native';

import { styles } from './styles';

import { FeesPreview } from '../../entities/fees/fees-preview';
import { TitleMore } from '../../shared/ui/title-more';
import { FeesAllScreenProps } from '../../navigation';
import { useCallback, useEffect, useState } from 'react';
import { getAllFees } from '../../shared/api/fund/get-all-fees';
import { getAllFunds } from '../../shared/api/fund/get-all-funds';
import { FeesPreviewType } from '../home';
import { intervalToDuration } from 'date-fns';

export const FeesAllScreen = ({ navigation }: FeesAllScreenProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [feesList, setFeesList] = useState<FeesPreviewType[]>([]);

  const openFees = (fees: FeesPreviewType) => navigation.push('FeesFullScreen', { fees });

  const getDeadline = (startDate: Date, endDate: Date): number | undefined => {
    return intervalToDuration({ start: new Date(startDate), end: new Date(endDate) }).days;
  };

  const getDatePage = async () => {
    const feesListPreview: FeesPreviewType[] = [];
    // Получаем все фонды (так как их мало) и сортируем.
    const payloadFunds = await getAllFunds();
    const payloadFees = await getAllFees();

    if (Array.isArray(payloadFees)) {
      payloadFees.forEach((fees) => {
        const fund = payloadFunds.find((fund) => fund.id == fees.fundId);
        feesListPreview.push({ ...fees, fund });
      });

      setFeesList(feesListPreview.slice(0, 10));
    }
  };

  useEffect(() => {
    (async () => {
      await getDatePage();
    })();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getDatePage();
    setRefreshing(false);
  }, []);

  return (
    <FlatList
      data={feesList}
      ListHeaderComponent={
        <View style={styles.containerTitle}>
          <TitleMore title="Актуальные сборы" />
        </View>
      }
      renderItem={({ item }) => (
        <View style={[styles.item, styles.itemVertical]}>
          <FeesPreview
            onPress={() => openFees(item)}
            fundName={item.fund.name}
            coefficient={item.fund.rating}
            fundDescription={item.description}
            image={item.image}
            fundraising={{
              allMoney: item.goal,
              currentMoney: item.collected,
              deadline: getDeadline(item.startDate, item.endDate) ?? null,
            }}
            isLarge={true}
          />
        </View>
      )}
      style={styles.section}
      initialNumToRender={3}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
};
