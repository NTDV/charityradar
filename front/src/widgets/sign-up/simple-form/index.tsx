import { useState } from 'react';
import { View, Text, Keyboard } from 'react-native';
import Toast from 'react-native-root-toast';
import MaskInput from 'react-native-mask-input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { styles } from './styles';

import { CustomTextInput } from '../../../shared/ui/custom-text-input';
import { CustomButton } from '../../../shared/ui/custom-button';
import { DatePicker } from '../../../shared/ui/date-picker';
import {
  PHONE_MASK,
  validationSchemaSimpleForm,
  validationSchemaSimpleFormProps,
} from '../lib/validation-schema';
import { COLOR_PLACEHOLDER } from '../../../shared/constants/style-variables';
import { useAuth } from '../../../shared/hooks/use-auth';
import { settingsToastError } from '../../../shared/constants/settings-toast';
/**
 * widget регистрации через форму
 */

const defaultValues = __DEV__
  ? {
      surname: '123456',
      name: '123456',
      patronymic: '123',
      phone: '89998670934',
      birthday: '29.10.1999',
      email: 'asafohin987@gmail.com',
      password: 'qwerty123QQW',
      passwordRepeat: 'qwerty123QQW',
    }
  : {
      surname: '',
      name: '',
      phone: '',
      birthday: '',
      email: '',
      password: '',
      passwordRepeat: '',
    };

type SimpleFormProps = {
  successCallback: () => void;
};

export const SimpleForm = ({ successCallback }: SimpleFormProps) => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchemaSimpleForm),
  });

  const onSubmit: SubmitHandler<validationSchemaSimpleFormProps> = async (values) => {
    if (auth.signUpSimple !== null) {
      setLoading(true);
      const payload = await auth.signUpSimple(values);

      // Если регистрация прошла успешно, то уведомляем popup-ом и переносим на авторизацию
      if (payload?.['err'] === null) {
        successCallback();
      }

      if (payload?.['err']?.['message']) {
        Toast.show(payload['err']['message'], settingsToastError);
      }

      setLoading(false);
    }
  };

  const guestHandler = () => {
    if (auth.signUpSimple !== null) auth.signInGuest();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Controller
          control={control}
          name="surname"
          render={({ field: { ref, onChange, onBlur, value } }) => (
            <CustomTextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              name="Фамилия"
              isRequired={true}
              placeholder="Введите фамилию"
              errorMessage={errors?.['surname']?.message}
            />
          )}
        />
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          name="name"
          render={({ field: { ref, onChange, onBlur, value } }) => (
            <CustomTextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              name="Имя"
              isRequired={true}
              placeholder="Введите имя"
              errorMessage={errors?.['name']?.message}
            />
          )}
        />
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          name="patronymic"
          render={({ field: { ref, onChange, onBlur, value } }) => (
            <CustomTextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              name="Отчество"
              placeholder="Введите отчество"
              errorMessage={errors?.['patronymic']?.message}
            />
          )}
        />
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          name="phone"
          render={({ field: { ref, onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.name}>
                Телефон <Text style={styles.isRequired}>*</Text>
              </Text>
              <MaskInput
                ref={ref}
                value={value || ''}
                onChangeText={(_, unmaskedText) => onChange('8' + unmaskedText)}
                onBlur={onBlur}
                placeholder="Мобильный телефон"
                placeholderTextColor={COLOR_PLACEHOLDER}
                mask={PHONE_MASK}
                keyboardType="numeric"
                style={[
                  styles.inputPhone,
                  errors?.['phone']?.message ? styles.inputPhoneError : {},
                ]}
              />
              {errors?.['phone']?.message && (
                <Text style={styles.errorMessage}>{errors['phone'].message}</Text>
              )}
            </View>
          )}
        />
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          name="birthday"
          render={({ field: { ref, onChange, onBlur, value } }) => (
            <DatePicker
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isRequired={true}
              name="Дата рождения"
              placeholder="Выберите дату рождения"
              errorMessage={errors?.['birthday']?.message}
              maximumDate={new Date()}
            />
          )}
        />
      </View>
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
      <View style={styles.row}>
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
      <View style={[styles.row, styles.rowLast]}>
        <Controller
          control={control}
          name="passwordRepeat"
          render={({ field: { ref, onChange, onBlur, value } }) => (
            <CustomTextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isRequired={true}
              name="Повторите пароль"
              placeholder="Введите пароль еще раз"
              errorMessage={errors?.['passwordRepeat']?.message}
              isPassword={true}
              textContentType={'oneTimeCode'}
              blurOnSubmit={false}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          )}
        />
      </View>
      <CustomButton
        name="Регистрация"
        onPress={handleSubmit(onSubmit)}
        primary={true}
        stylesButton={styles.rowButton}
        loading={loading}
      />
      <CustomButton name="Гость" onPress={guestHandler} />
    </View>
  );
};
