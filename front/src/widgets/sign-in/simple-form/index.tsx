import { Keyboard, View, Text } from 'react-native';

import { styles } from './styles';

import { CustomTextInput } from '../../../shared/ui/custom-text-input';
import { CustomButton } from '../../../shared/ui/custom-button';
import { useAuth } from '../../../shared/hooks/use-auth';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  validationSchemaSimpleFormSignIn,
  validationSchemaSimpleFormSignInProps,
} from '../lib/validation-schema';
import { useState } from 'react';
import { sendRepeatEmail } from '../../../shared/api/sign-in/send-repeat-email';
import { settingsToast } from '../../../shared/constants/settings-toast';
import Toast from 'react-native-root-toast';
import { ERRORS } from '../../../shared/constants/types';

const defaultValues = __DEV__
  ? { email: 'asafohin987@gmail.com', password: 'qwerty123QQW' }
  : { email: '', password: '' };

/**
 * widget авторизации через форму
 * @param guestCallback
 */

export const SimpleForm = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingRepeatEmail, setLoadingRepeatEmail] = useState(false);
  const [showButtonRepeatMail, setShowButtonRepeatMail] = useState(false);
  const [err, setErr] = useState('');
  const auth = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchemaSimpleFormSignIn),
  });

  const sendEmail = async () => {
    setLoadingRepeatEmail(true);
    const payload = await sendRepeatEmail(token);
    const res = payload['data']?.['sendLetterToConfirmEmail'];

    if (res) {
      setShowButtonRepeatMail(false);
      setErr('');
      Toast.show('Сообщение на почту успешно доставлено', settingsToast);
    }

    setLoadingRepeatEmail(false);
  };

  const guestHandler = async () => {
    if (auth.signInGuest !== null) {
      await auth.signInGuest();
    }
  };

  const onSubmit = async (values: validationSchemaSimpleFormSignInProps) => {
    setLoading(true);
    if (auth.signInSimple !== null) {
      let showButtonRepeatMail = false;
      let err = '';
      const payload = await auth.signInSimple(values);

      if (
        payload?.['err']?.['type'] === 'incorrect' ||
        payload?.['err']?.['type'] === ERRORS.server // Сервер пал
      ) {
        err = payload['err']['message'];
        showButtonRepeatMail = false;
      } else if (payload?.['err']?.['type'] === 'noConfirmed') {
        err = payload['err']['message'];
        showButtonRepeatMail = true;
        setToken(payload['token']); // сохраняем токен
      }

      setErr(err);
      setShowButtonRepeatMail(showButtonRepeatMail);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Controller
          control={control}
          name="email"
          render={({ field: { ref, onChange, onBlur, value } }) => (
            <CustomTextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isRequired={true}
              name="E-mail"
              placeholder="Введите e-mail"
              errorMessage={errors?.['email']?.message}
            />
          )}
        />
      </View>
      <View style={[styles.row, styles.rowLast]}>
        <Controller
          control={control}
          name="password"
          render={({ field: { ref, onChange, onBlur, value } }) => (
            <CustomTextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isRequired={true}
              name="Пароль"
              placeholder="Введите пароль"
              errorMessage={errors?.['password']?.message}
              isPassword={true}
              textContentType={'oneTimeCode'}
              blurOnSubmit={false}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          )}
        />
      </View>
      {!!err && <Text style={styles.errorText}>{err}</Text>}
      {showButtonRepeatMail && (
        <CustomButton
          name="Отправить повторно"
          onPress={sendEmail}
          stylesButton={styles.rowButton}
          loading={loadingRepeatEmail}
        />
      )}
      <CustomButton
        name="Войти"
        onPress={handleSubmit(onSubmit)}
        primary={true}
        stylesButton={styles.rowButton}
        loading={loading}
      />
      <CustomButton name="Гость" onPress={guestHandler} />
    </View>
  );
};
