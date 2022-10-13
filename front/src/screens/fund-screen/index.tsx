import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';

import { styles } from './styles';

import { CustomButton } from '../../shared/ui/custom-button';
import { TitleMore } from '../../shared/ui/title-more';
import { FeesPreviewInsideFund } from '../../entities/fees/fees-preview-inside-fund';
import { AppNavigationProps } from '../../navigation';
import { FondType, getFundById } from '../../shared/api/fund/get-fund-by-id';
import { IconNullPhoto } from '../../shared/icons/icon-null-photo';
import { BASE_URL } from '../../shared/api/general';
import { getFeesByIdFund } from '../../shared/api/fund/get-fees-by-id-fund';

export const FundScreen = (appNavigation: AppNavigationProps) => {
  const [fund, setFund] = useState<FondType | null>(null);
  const [feesList, setFeesList] = useState([]);
  const params = appNavigation.route.params;

  const openTransactionHistory = () => {
    appNavigation.navigation.push('TransactionHistory');
  };

  const getInfoPage = async () => {
    if (params !== undefined) {
      const fund = await getFundById(params.id);
      const fees = await getFeesByIdFund(fund.id);
      console.log(fees);
      setFund(fund);
    }
  };

  useEffect(() => {
    (async () => {
      await getInfoPage();
    })();
  }, []);

  if (fund === null) return <View />;

  return (
    <View style={styles.container}>
      <FlatList
        data={feesList}
        ListHeaderComponent={
          <>
            <Text style={styles.name}>{fund.name}</Text>
            <View style={styles.containerImg}>
              {!fund.image ? (
                <IconNullPhoto />
              ) : (
                <Image source={{ uri: `${BASE_URL}/images/${fund.image}` }} style={styles.img} />
              )}
            </View>
            <View style={styles.coefficientRow}>
              <Text style={styles.coefficientTitle}>Коэффициент доверия</Text>
              {fund.rating && <Text style={styles.coefficient}>{fund.rating}</Text>}
            </View>
            <View style={styles.reporting}>
              <Text style={styles.reportingTitle}>Отчетность организации:</Text>
              <CustomButton
                name="Посмотреть историю платежей"
                onPress={openTransactionHistory}
                primary={true}
                rect={true}
              />
            </View>
            <View style={styles.description}>
              <View style={styles.descriptionTitle}>
                <TitleMore title="Описание" />
              </View>
              <Text style={styles.descriptionText}>
                {!!fund.description ? fund.description : 'Описание отсутствует'}
              </Text>
            </View>
            <View style={styles.feesTitle}>
              <TitleMore title="Текущие сборы:" />
            </View>
          </>
        }
        ListEmptyComponent={<Text>Нет активных сборов</Text>}
        renderItem={({ item }) => (
          <View style={styles.itemFees}>
            <FeesPreviewInsideFund
              onPress={() => {}}
              fundDescription={'Помогаем детям с онкологи-ческими заболеваниями'}
              fundraising={{
                allMoney: 20000,
                currentMoney: 5000,
                deadline: 1,
              }}
            />
          </View>
        )}
        initialNumToRender={3}
      />
    </View>
  );
};
