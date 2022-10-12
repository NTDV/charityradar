import { ScrollView, View } from 'react-native';
import { observer } from 'mobx-react';

import { styles } from './styles';
import { stylesGlobal } from '../../shared/constants/styles-global';

import { HeaderLogo } from '../../widgets/header';
import { PreviewCard } from '../../entities/bank-card';
import { Search } from '../../shared/ui/search';
import { YouHelpList } from '../../widgets/you-help';
import { PopularFundsList } from '../../widgets/fund-widgets';
import { AppNavigationProps } from '../../navigation';
import { ActualFees } from '../../widgets/fees-widgets';
import { useAuth, UserType } from '../../shared/hooks/use-auth';
import { useEffect } from 'react';
import { getBalance } from '../../shared/api/bank-card/get-balance';
import { bankCardStore } from '../../stores/bank-card-store';

export const Home = observer(({ appNavigation }: { appNavigation: AppNavigationProps }) => {
  const { user } = useAuth();
  const openAllListPopularFund = () => appNavigation.navigation.push('PopularFundScreen');
  const openFund = () => appNavigation.navigation.push('FundScreen');

  const openActualFeesAll = () => appNavigation.navigation.push('FeesAllScreen');
  const onPressFees = () => appNavigation.navigation.push('FeesFullScreen');

  const getBalanceCard = async () => {
    if (!!user && !!user.token) {
      const payload = await getBalance(user.token);

      if (payload !== null) {
        bankCardStore.setCurrentBalance(payload.amount);
        bankCardStore.setDonations(payload.monthDonations);
      }
    }
  };

  // Если загружаем страницу в первый раз, то отправляем запрос на баланс карты
  useEffect(() => {
    (async () => {
      await getBalanceCard();
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <HeaderLogo />
      <ScrollView style={[styles.wrapper, stylesGlobal.mainContainer]}>
        <View style={[styles.rowSection, styles.rowCard]}>
          <Search placeholder="Введите название фонда или сбора" />
        </View>
        {user?.type === UserType.user && bankCardStore.amount !== null && (
          <View style={styles.rowSection}>
            <PreviewCard />
          </View>
        )}
        <View style={styles.rowSection}>
          <YouHelpList onPressFund={openFund} />
        </View>
        <View style={styles.rowSection}>
          <PopularFundsList onPressAll={openAllListPopularFund} onPressFund={openFund} />
        </View>
        <View style={styles.rowSection}>
          <ActualFees onPressAll={openActualFeesAll} onPressFees={onPressFees} />
        </View>
      </ScrollView>
    </View>
  );
});
