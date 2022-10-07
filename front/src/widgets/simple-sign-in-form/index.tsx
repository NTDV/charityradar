import { View } from 'react-native';

import { styles } from './styles';

import { CustomTextInput } from '../../shared/ui/custom-text-input';
import { CustomButton } from '../../shared/ui/custom-button';
import { useAuth } from '../../shared/hooks/use-auth';
/**
 * widget авторизации через форму
 * @param guestCallback
 */

export const SimpleSignInForm = () => {
  const auth = useAuth();

  const guestHandler = () => {
    if (auth !== null) auth.signInGuest();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CustomTextInput name="E-mail" isRequired={true} placeholder="Введите E-mail" />
      </View>
      <View style={[styles.row, styles.rowLast]}>
        <CustomTextInput
          name="Пароль"
          isRequired={true}
          placeholder="Введите пароль"
          isPassword={true}
        />
      </View>
      <CustomButton
        name="Войти"
        onPress={() => {}}
        primary={true}
        stylesButton={styles.rowButton}
      />
      <CustomButton name="Гость" onPress={guestHandler} />
    </View>
  );
};
