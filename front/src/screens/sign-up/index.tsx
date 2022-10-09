import { ScrollView, Text, View } from 'react-native';

import { styles } from './styles';

import { SignUpProps } from '../../navigation';
import { HeaderLogo } from '../../widgets/header';
import { IdSignUpForm, SimpleSignUpForm } from '../../widgets/sign-up';
import { KeyboardShift } from '../../shared/ui/keyboard-shift';
import { stylesGlobal } from '../../shared/constants/styles-global';
import { CustomModal } from '../../shared/ui/custom-modal';
import { useState } from 'react';
import { CustomButton } from '../../shared/ui/custom-button';

/**
 * Страница регистрации
 */

export const SignUp = ({ navigation }: SignUpProps) => {
  const [visibleConfirmedModal, setVisibleConfirmedModal] = useState(false);
  const signInRouting = () => navigation.push('SignIn');

  const closeConfirmedModal = () => {
    setVisibleConfirmedModal(false);
    signInRouting();
  };

  // callback при успешной регистрации
  const successCallback = () => {
    setVisibleConfirmedModal(true);
  };

  return (
    <View style={styles.wrapper}>
      <CustomModal
        title="Подтверждени E-mail"
        visibility={visibleConfirmedModal}
        onClose={closeConfirmedModal}
      >
        <View>
          <Text style={styles.modalText}>
            На вашу почту отправлено письмо с подтверждением E-mail. Для авторизации вам необходимо
            выполнить подтверждение
          </Text>
          <CustomButton name="Ок" onPress={closeConfirmedModal} primary={true} />
        </View>
      </CustomModal>
      <HeaderLogo />
      <KeyboardShift>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[stylesGlobal.mainContainer, styles.container]}>
            <Text style={styles.title}>Ваша помощь достигнет доброй цели</Text>
            <Text style={[styles.grayColor, styles.subtitle]}>Регистрация</Text>
            <View style={styles.row}>
              <IdSignUpForm />
            </View>
            <View style={[styles.additionally, styles.row]}>
              <View style={styles.additionallyLine} />
              <Text style={styles.additionallyText}>или</Text>
              <View style={styles.additionallyLine} />
            </View>
            <View style={styles.row}>
              <SimpleSignUpForm successCallback={successCallback} />
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
                Есть аккаунт?{' '}
                <Text style={styles.textLink} onPress={signInRouting}>
                  Войти
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardShift>
    </View>
  );
};
