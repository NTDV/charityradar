import { FlatList, RefreshControl, View } from 'react-native';
import { styles } from '../../widgets/fund-widgets/popular-funds-list/styles';
import { FundPreview } from '../../entities/fund';
import { COLOR_WHITE } from '../../shared/constants/style-variables';
import { PopularFundScreenProps } from '../../navigation';
import { useCallback, useEffect, useState } from 'react';
import { FeesPreviewType, FundPreviewType } from '../home';
import { getAllFunds } from '../../shared/api/fund/get-all-funds';
import { getAllFees } from '../../shared/api/fund/get-all-fees';
import { useFocusEffect } from '@react-navigation/native';

/**
 * Страница со списком всех фондов
 */

export const PopularFundScreen = ({ navigation }: PopularFundScreenProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [fundsList, setFundsList] = useState<FundPreviewType[]>([]);

  const openFund = (id: string | number) => {
    navigation.push('FundScreen', { id });
  };

  const getDatePage = async () => {
    const fundListPreview: FundPreviewType[] = [];
    // Получаем все фонды (так как их мало) и сортируем.
    const payloadFunds = await getAllFunds();
    const payloadFees = await getAllFees();

    // Если нет ошибок
    if (Array.isArray(payloadFunds)) {
      payloadFunds.forEach((fund) => {
        // Достаем последний сбор
        const fees = payloadFees.find((fees) => fees.fundId == fund.id);
        fundListPreview.push({ ...fund, fees });
      });

      setFundsList(fundListPreview);
    }
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await getDatePage();
      })();
    }, []),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getDatePage();
    setRefreshing(false);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLOR_WHITE, paddingVertical: 15 }}>
      <FlatList
        data={fundsList}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <FundPreview
              onPress={() => openFund(item.id)}
              coefficient={item.rating}
              fundName={item.name}
              fundDescription={item.description}
              image={item.image}
              fees={item.fees}
              isLarge={true}
            />
          </View>
        )}
        initialNumToRender={3}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};
