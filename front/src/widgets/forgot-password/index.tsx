import { View, Text } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { styles } from './styles';

import { CustomModal } from '../../shared/ui/custom-modal';
import { CustomTextInput } from '../../shared/ui/custom-text-input';
import { CustomButton } from '../../shared/ui/custom-button';
import { validationSchemaForget, validationSchemaForgetProps } from './lib/validation-schema';
import { forgotPassword } from '../../shared/api/sign-in/forgot-password';
import { useState } from 'react';
import Toast from 'react-native-root-toast';
import { settingsToastDelay } from '../../shared/constants/settings-toast';

const defaultValues = __DEV__ ? { email: 'asafohin55@gmail.com' } : { email: '' };

type ForgotPasswordProps = {
  visibility: boolean;
  onClose: () => void;
};

/**
 * Modal - забыл пароль
 * @param visibility - отображение popup
 * @param onClose - callback для закрытия popup
 */

export const ForgotPassword = ({ visibility, onClose }: ForgotPasswordProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchemaForget),
  });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: validationSchemaForgetProps) => {
    let err = '';
    setLoading(true);
    const isSuccess: boolean = await forgotPassword(values.email);

    if (isSuccess) {
      onClose();
      Toast.show('На вашу почту отправлено письмо для восстановления пароля', settingsToastDelay);
      err = '';
    } else {
      err = 'Почта не зарегистрирована в системе';
    }

    setErr(err);
    setLoading(false);
  };

  return (
    <CustomModal title="Востановление пароля" visibility={visibility} onClose={onClose}>
      <View>
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
        {!!err && <Text style={styles.err}>{err}</Text>}
        <CustomButton
          name="Восстановить"
          onPress={handleSubmit(onSubmit)}
          primary={true}
          loading={loading}
        />
      </View>
    </CustomModal>
  );
};
