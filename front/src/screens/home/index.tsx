import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { observer } from 'mobx-react';

import { styles } from './styles';

import { HeaderLogo } from '../../widgets/header';
import { YouHelpList } from '../../widgets/you-help';
import { PopularFundsList } from '../../widgets/fund-widgets';
import { ActualFees } from '../../widgets/fees-widgets';
import { PreviewCard } from '../../entities/bank-card';
import { stylesGlobal } from '../../shared/constants/styles-global';
import { Search } from '../../shared/ui/search';
import { useAuth, UserType } from '../../shared/hooks/use-auth';
import { getBalance } from '../../shared/api/bank-card/get-balance';
import { AppNavigationProps } from '../../navigation';
import { bankCardStore } from '../../stores/bank-card-store';
import { getAllFunds, SuccessResponseGetAllFunds } from '../../shared/api/fund/get-all-funds';
import { Fees, getAllFees } from '../../shared/api/fund/get-all-fees';

export const Home = observer(({ appNavigation }: { appNavigation: AppNavigationProps }) => {
  const [fundsList, setFundsList] = useState<null | SuccessResponseGetAllFunds[]>(null);
  const [feesList, setFeesList] = useState<null | Fees[]>(null);

  // После рефреша обновляем данные страницы (делаем повторные запросы)
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const openAllListPopularFund = () => appNavigation.navigation.push('PopularFundScreen');
  const openFund = (id: string) => {
    appNavigation.navigation.push('FundScreen', { id });
  };

  const openActualFeesAll = () => appNavigation.navigation.push('FeesAllScreen');
  const onPressFees = () => appNavigation.navigation.push('FeesFullScreen');

  // Получение баланса карты у авторизованного пользователя и не фонда
  const getBalanceCard = async () => {
    if (!!user && !!user.token && user.type === UserType.user) {
      const payload = await getBalance(user.token);

      if (payload !== null) {
        bankCardStore.setCurrentBalance(payload.amount);
        bankCardStore.setDonations(payload.monthDonations);
      }
    }
  };

  // Получение данный для всей страницы
  const getDatePage = async () => {
    // Получаем все фонды (так как их мало) и сортируем.
    const payloadFunds = await getAllFunds();
    const payloadFees = await getAllFees();
    console.log(payloadFees, 'payloadFunds');
    // Если нет ошибок
    // if (Array.isArray(payloadFunds)) {
    //   setFundsList(payloadFunds);
    // }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getDatePage();
    setRefreshing(false);
  }, []);

  // Если загружаем страницу в первый раз, то отправляем запрос на баланс карты
  useEffect(() => {
    (async () => {
      await getBalanceCard();
      await getDatePage();
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <HeaderLogo />
      <ScrollView
        style={[styles.wrapper, stylesGlobal.mainContainer]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={[styles.rowSection, styles.rowCard]}>
          <Search placeholder="Введите название фонда или сбора" />
        </View>
        {user?.type === UserType.user && bankCardStore.amount !== null && (
          <View style={styles.rowSection}>
            <PreviewCard />
          </View>
        )}
        {/*<View style={styles.rowSection}>*/}
        {/*  <YouHelpList onPressFund={openFund} />*/}
        {/*</View>*/}
        {fundsList !== null && (
          <View style={styles.rowSection}>
            <PopularFundsList
              onPressAll={openAllListPopularFund}
              onPressFund={openFund}
              fundsList={fundsList}
            />
          </View>
        )}
        {/*<View style={styles.rowSection}>*/}
        {/*  <ActualFees onPressAll={openActualFeesAll} onPressFees={onPressFees} />*/}
        {/*</View>*/}
      </ScrollView>
    </View>
  );
});
