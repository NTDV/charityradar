import { View, Text, ScrollView } from 'react-native';

import { styles } from './styles';

import { HeaderLogo } from '../../../widgets/header';
import { CustomButton } from '../../../shared/ui/custom-button';
import { useAuth } from '../../../shared/hooks/use-auth';

export const UnAuthUserCabinet = () => {
  const { logout } = useAuth();

  const signInHandler = () => {
    if (logout !== null) return logout();
  };

  return (
    <View style={styles.container}>
      <HeaderLogo />
      <ScrollView style={styles.wrapper}>
        <Text style={styles.title}>Войдите в личный кабинет</Text>
        <Text style={styles.subTitle}>Если вы хотите помочь то сможете:</Text>
        <View style={styles.ul}>
          <Text style={styles.li}>- Получать полный отчет о своих пожертвованиях</Text>
          <Text style={styles.li}>- Стать Филантропом, подключив ежемесячное пожертвование</Text>
          <Text style={styles.li}>- Формировать рейтинг доверия с другими участниками</Text>
        </View>
        <CustomButton name="Войти" onPress={signInHandler} primary={true} />
      </ScrollView>
    </View>
  );
};
