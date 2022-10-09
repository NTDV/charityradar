import { Dimensions, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import { styles } from './styles';

import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemaFund } from '../lib/validation-schema';
import { CustomTextInput } from '../../../shared/ui/custom-text-input';
import { CustomButton } from '../../../shared/ui/custom-button';
import { Avatar } from '../../../shared/ui/avatar';
import { MAIN_PADDING } from '../../../shared/constants/styles-global';

export const InfoForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemaFund),
  });

  const onSubmit = () => {};

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.rowAvatar]}>
        <Avatar height={180} width={Dimensions.get('window').width - MAIN_PADDING * 2} />
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
              isRequired={true}
              name="Название фонда"
              placeholder="Введите название фонда"
              errorMessage={errors?.['name']?.message}
            />
          )}
        />
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          name="description"
          render={({ field: { ref, onChange, onBlur, value } }) => (
            <CustomTextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isRequired={true}
              name="Описание фонда"
              placeholder="Введите описание фонда"
              errorMessage={errors?.['description']?.message}
              multiline={true}
            />
          )}
        />
      </View>
      <CustomButton name="Оправить форму" onPress={handleSubmit(onSubmit)} primary={true} />
    </View>
  );
};
