import { View } from 'react-native';

import { styles } from './styles';
import { stylesGlobal } from '@shared/constants/styles-global';

import { HeaderLogo } from '@widgets/header-logo';
import { Search } from '@shared/ui/search';

export const Home = () => {
  return (
    <View style={[styles.wrapper, stylesGlobal.mainContainer]}>
      <HeaderLogo />
      <View style={{ marginVertical: 15 }}>
        <Search placeholder="Введите название фонда или сбора" />
      </View>
      {/*<View style={{ width: 300, height: 300, backgroundColor: '#000' }} />*/}
    </View>
  );
};
