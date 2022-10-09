import { Keyboard, View } from 'react-native';

import { styles } from './styles';

import { CustomTextInput } from '../../../shared/ui/custom-text-input';
import { CustomButton } from '../../../shared/ui/custom-button';
import { useAuth } from '../../../shared/hooks/use-auth';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { validationSchemaSimpleFormSignIn } from '../lib/validation-schema';
/**
 * widget авторизации через форму
 * @param guestCallback
 */

export const SimpleForm = () => {
  const auth = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemaSimpleFormSignIn),
  });

  const guestHandler = () => {
    if (auth.signUpSimple !== null) auth.signInGuest();
  };

  const onSubmit = (values) => {
    console.log(values);
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
      <CustomButton
        name="Войти"
        onPress={handleSubmit(onSubmit)}
        primary={true}
        stylesButton={styles.rowButton}
      />
      <CustomButton name="Гость" onPress={guestHandler} />
    </View>
  );
};
