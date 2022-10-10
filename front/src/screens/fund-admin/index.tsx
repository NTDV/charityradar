import { ScrollView, View } from 'react-native';

import { styles } from './styles';

import { HeaderLogo } from '../../widgets/header';
import { TitleMore } from '../../shared/ui/title-more';
import { FeesForm, InfoForm } from '../../widgets/fund-forms';

export const FundAdmin = () => {
  return (
    <View style={styles.container}>
      <HeaderLogo />
      <ScrollView style={styles.wrapper}>
        <View>
          <View style={{ marginBottom: 15 }}>
            <TitleMore title="Заполнение основной информации по фонду" />
          </View>
          <InfoForm />
        </View>
        <View>
          <View style={{ marginVertical: 15 }}>
            <TitleMore title="Заполните информацию про сбор" />
          </View>
          <FeesForm />
        </View>
      </ScrollView>
    </View>
  );
};
