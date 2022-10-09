import { View, ScrollView, Text } from 'react-native';

import { styles } from './styles';

import { HeaderLogo } from '../../../widgets/header';
import { PreviewCard } from '../../../entities/bank-card';
import { CabinetButtonList } from '../ui/cabinet-button-list';
import { useAuth } from '../../../shared/hooks/use-auth';

export const AuthUserCabinet = () => {
  const { logout } = useAuth();

  const exitAccount = () => {
    if (logout !== null) logout();
  };

  return (
    <View style={styles.container}>
      <HeaderLogo />
      <ScrollView style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.headerName}>Сафохин Артем</Text>
          <Text style={styles.headerEmail}>asafohin@test.com</Text>
        </View>
        <View>
          <PreviewCard />
        </View>
        <View style={styles.buttons}>
          <CabinetButtonList buttons={[{ name: 'Выйти', onPress: exitAccount, isWarning: true }]} />
        </View>
      </ScrollView>
    </View>
  );
};
