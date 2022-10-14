import { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { View, Text, Image, FlatList, RefreshControl } from 'react-native';

import { styles } from './styles';

import { CustomButton } from '../../shared/ui/custom-button';
import { TitleMore } from '../../shared/ui/title-more';
import { FeesPreviewInsideFund } from '../../entities/fees/fees-preview-inside-fund';
import { AppNavigationProps } from '../../navigation';
import { FondType, getFundById } from '../../shared/api/fund/get-fund-by-id';
import { IconNullPhoto } from '../../shared/icons/icon-null-photo';
import { BASE_URL } from '../../shared/api/general';
import { getFeesByIdFund } from '../../shared/api/fund/get-fees-by-id-fund';
import { intervalToDuration } from 'date-fns';
import { FeesPreviewType } from '../home';
import { Donation } from '../../widgets/donation';
import { TYPE_PAYMENT } from '../../shared/constants/types';
import { useAuth, UserType } from '../../shared/hooks/use-auth';
import { Rating } from '../../shared/ui/rating';
import { COLOR_WHITE } from '../../shared/constants/style-variables';
import { useFocusEffect } from '@react-navigation/native';

export const FundScreen = (appNavigation: AppNavigationProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  const [visibleDonationModal, setVisibleDonationModal] = useState(false);
  const [fund, setFund] = useState<FondType | null>(null);
  const [feesList, setFeesList] = useState<FeesPreviewType[]>([]);
  const params = appNavigation.route.params;

  const openDonationModal = () => setVisibleDonationModal(true);
  const closeDonationModal = () => setVisibleDonationModal(false);

  const getDeadline = (startDate: Date, endDate: Date) => {
    return intervalToDuration({ start: new Date(startDate), end: new Date(endDate) }).days;
  };

  const openTransactionHistory = () => {
    if (fund !== null) {
      appNavigation.navigation.push('TransactionHistory', { fundId: fund.id });
    }
  };

  const onPressFees = (fees: FeesPreviewType) => {
    appNavigation.navigation.push('FeesFullScreen', {
      id: fees.id,
      fondName: fees.fund.name,
      fondRating: fees.fund.rating,
    });
  };

  const getInfoPage = async () => {
    if (params !== undefined) {
      const fund = await getFundById(params.id);
      const fees = await getFeesByIdFund(fund.id);

      fees.forEach((fees) => {
        fees['fund'] = fund;
      });

      setFeesList(fees);
      setFund(fund);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getInfoPage();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await getInfoPage();
      })();
    }, []),
  );

  if (fund === null) return <View style={{ flex: 1, backgroundColor: COLOR_WHITE }} />;

  return (
    <View style={{ flex: 1 }}>
      <Donation
        visibility={visibleDonationModal}
        onClose={closeDonationModal}
        appNavigation={appNavigation}
        id={fund.id}
        typePayment={TYPE_PAYMENT.fondDonation}
      />
      <FlatList
        data={feesList}
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <>
            <Text style={styles.name}>{fund.name}</Text>
            <View style={styles.containerImg}>
              {!fund.image ? (
                <IconNullPhoto />
              ) : (
                <Image source={{ uri: `${BASE_URL}/${fund.image}` }} style={styles.img} />
              )}
            </View>
            <View style={styles.coefficientRow}>
              <Text style={styles.coefficientTitle}>Коэффициент доверия</Text>
              {fund.rating && <Rating rating={fund.rating} styles={styles.coefficient} />}
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
              onPress={() => onPressFees(item)}
              fundDescription={item.description}
              fundraising={{
                allMoney: item.goal,
                currentMoney: item.collected,
                deadline: getDeadline(item.startDate, item.endDate) ?? null,
              }}
            />
          </View>
        )}
        initialNumToRender={3}
      />
      {user?.type === UserType.user && (
        <View style={styles.footer}>
          <CustomButton name="Пожертвовать" onPress={openDonationModal} primary={true} />
        </View>
      )}
    </View>
  );
};
