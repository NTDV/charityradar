import { ScrollView, View } from 'react-native';

import { styles } from './styles';

import { HeaderLogo } from '../../widgets/header';
import { TitleMore } from '../../shared/ui/title-more';
import { InfoForm } from '../../widgets/fund-forms/info-form';

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
      </ScrollView>
    </View>
  );
};
