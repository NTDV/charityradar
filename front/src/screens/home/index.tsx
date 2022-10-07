import { ScrollView, View } from 'react-native';

import { styles } from './styles';
import { stylesGlobal } from '../../shared/constants/styles-global';

import { HeaderLogo } from '../../widgets/header-logo';
import { PreviewCard } from '../../entities/bank-card';
import { Search } from '../../shared/ui/search';
import { TitleMore } from '../../shared/ui/title-more';
import { FundPreview } from '../../entities/fund';

export const Home = () => {
  return (
    <ScrollView style={[styles.wrapper, stylesGlobal.mainContainer]}>
      <HeaderLogo />
      <View style={[styles.rowSection, styles.rowCard]}>
        <Search placeholder="Введите название фонда или сбора" />
      </View>
      <View style={styles.rowSection}>
        <PreviewCard />
      </View>
      <View style={styles.rowSection}>
        <TitleMore title="Кому вы помогали" nameLink="Смотреть все" onPress={() => {}} />
        <View style={styles.listContainer}>
          <FundPreview />
        </View>
      </View>
      <View style={styles.rowSection}>
        <TitleMore title="Популярные фонды" nameLink="Смотреть все" onPress={() => {}} />
        <View style={styles.listContainer}>
          <FundPreview />
        </View>
      </View>
    </ScrollView>
  );
};
