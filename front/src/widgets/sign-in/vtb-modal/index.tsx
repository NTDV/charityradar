import { Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import { styles } from './styles';

import { CustomModal } from '../../../shared/ui/custom-modal';
import { CustomTextInput } from '../../../shared/ui/custom-text-input';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { validationSchemaVtbForm, validationSchemaVtbFormProps } from './validation-schema';
import { CustomButton } from '../../../shared/ui/custom-button';

type VtbModalProps = {
  visibility: boolean;
  loading: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (value: validationSchemaVtbFormProps) => void;
};

const defaultValues = __DEV__
  ? {
      login: '',
      password: '',
    }
  : {
      login: '',
      password: '',
    };

export const VtbModal = ({ visibility, onClose, onSubmit, error, loading }: VtbModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchemaVtbForm),
  });

  return (
    <CustomModal title="Авторизация ВТБ" visibility={visibility} onClose={onClose}>
      <View>
        <View style={styles.row}>
          <Controller
            control={control}
            name="login"
            render={({ field: { ref, onChange, onBlur, value } }) => (
              <CustomTextInput
                ref={ref}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                name="Логин"
                placeholder="Введите логин"
                errorMessage={errors?.['login']?.message}
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
                name="Пароль"
                placeholder="Введите пароль"
                errorMessage={errors?.['password']?.message}
                isPassword={true}
              />
            )}
          />
        </View>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        <CustomButton
          name={'Войти'}
          onPress={handleSubmit(onSubmit)}
          primary={true}
          loading={loading}
        />
      </View>
    </CustomModal>
  );
};
