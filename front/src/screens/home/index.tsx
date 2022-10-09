import { ScrollView, View } from 'react-native';

import { styles } from './styles';
import { stylesGlobal } from '../../shared/constants/styles-global';

import { HeaderLogo } from '../../widgets/header';
import { PreviewCard } from '../../entities/bank-card';
import { Search } from '../../shared/ui/search';
import { YouHelpList } from '../../widgets/you-help';
import { PopularFundsList } from '../../widgets/fund-widgets';
import { AppNavigationProps } from '../../navigation';
import { ActualFees } from '../../widgets/fees-widgets';

export const Home = ({ appNavigation }: { appNavigation: AppNavigationProps }) => {
  const openAllListPopularFund = () => appNavigation.navigation.push('PopularFundScreen');
  const openFund = () => appNavigation.navigation.push('FundScreen');

  const openActualFeesAll = () => appNavigation.navigation.push('FeesAllScreen');
  const onPressFees = () => appNavigation.navigation.push('FeesFullScreen');

  return (
    <View style={{ flex: 1 }}>
      <HeaderLogo />
      <ScrollView style={[styles.wrapper, stylesGlobal.mainContainer]}>
        <View style={[styles.rowSection, styles.rowCard]}>
          <Search placeholder="Введите название фонда или сбора" />
        </View>
        <View style={styles.rowSection}>
          <PreviewCard />
        </View>
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
};
