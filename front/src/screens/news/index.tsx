import { View } from 'react-native';
import { FilterNews } from '../../widgets/news-widgets/filter-news';
import { HeaderLogo } from '../../widgets/header';
import { COLOR_WHITE } from '../../shared/constants/style-variables';
import { MAIN_PADDING } from '../../shared/constants/styles-global';
import { AppNavigationProps } from '../../navigation';

export const News = ({ appNavigation }: { appNavigation: AppNavigationProps }) => {
  const openFund = () => appNavigation.navigation.push('FundScreen');

  return (
    <View style={{ flex: 1, backgroundColor: COLOR_WHITE }}>
      <HeaderLogo />
      <View style={{ padding: MAIN_PADDING }}>
        <FilterNews openFund={openFund} />
      </View>
    </View>
  );
};
