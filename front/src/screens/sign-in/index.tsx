import { ScrollView, Text, View } from 'react-native';

import { styles } from './styles';

import { stylesGlobal } from '../../shared/constants/styles-global';

import { SimpleSignInForm } from '../../widgets/simple-sign-in-form';
import { IdSignInForm } from '../../widgets/id-sign-in-form';

import { KeyboardShift } from '../../shared/ui/keyboard-shift';
import { HeaderLogo } from '../../widgets/header/header-logo';
import { SignInProps } from '../../navigation';
import { useState } from 'react';
import { ForgotPassword } from '../../widgets/forgot-password';

/**
 * Страница авторизации
 */

export const SignIn = ({ navigation }: SignInProps) => {
  const [visibilityForgotModal, setVisibilityForgotModal] = useState(false);

  const closeForgotModal = () => setVisibilityForgotModal(false);
  const openForgotModal = () => setVisibilityForgotModal(true);

  const signUpRouting = () => navigation.push('SignUp');

  return (
    <View style={styles.wrapper}>
      <ForgotPassword visibility={visibilityForgotModal} onClose={closeForgotModal} />
      <HeaderLogo />
      <KeyboardShift>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[stylesGlobal.mainContainer, styles.container]}>
            <Text style={styles.title}>Ваша помощь достигнет доброй цели</Text>
            <Text style={[styles.grayColor, styles.subtitle]}>Авторизация</Text>
            <View style={styles.row}>
              <IdSignInForm />
            </View>
            <View style={[styles.additionally, styles.row]}>
              <View style={styles.additionallyLine} />
              <Text style={styles.additionallyText}>или</Text>
              <View style={styles.additionallyLine} />
            </View>
            <View style={styles.row}>
              <SimpleSignInForm />
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
                Нет аккаунта?{' '}
                <Text style={styles.textLink} onPress={signUpRouting}>
                  Регистрация
                </Text>
              </Text>
              <Text style={[styles.textLink, styles.textForgotPassword]} onPress={openForgotModal}>
                Забыли пароль?
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardShift>
    </View>
  );
};
