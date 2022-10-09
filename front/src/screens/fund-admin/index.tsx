import { ScrollView, Text, View } from 'react-native';

import { styles } from './styles';

import { HeaderLogo } from '../../widgets/header';

export const FundAdmin = () => {
  return (
    <View style={styles.container}>
      <HeaderLogo />
      <ScrollView style={styles.wrapper}>
        <View>
          <Text>FundAdmin</Text>
        </View>
      </ScrollView>
    </View>
  );
};
