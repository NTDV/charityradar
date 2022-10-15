import { Dimensions, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

import { Controller, useForm } from 'react-hook-form';
import { CustomTextInput } from '../../../shared/ui/custom-text-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemaFees } from '../lib/validation-schema';
import { CustomButton } from '../../../shared/ui/custom-button';
import { MAIN_PADDING } from '../../../shared/constants/styles-global';

export const NewsForm = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchemaFees),
  });

  const onSubmit = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
          <View style={[styles.row, styles.rowAvatar]}>
            <View
              style={{
                height: 180,
                width: Dimensions.get('window').width - MAIN_PADDING * 2,
              }}
            />
            <View style={styles.photo} />
          </View>
          <Text style={styles.photoText}>Выберите фотографию</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          name="name"
          render={({ field: { ref, onChange, onBlur, value }, fieldState: { error } }) => (
            <CustomTextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isRequired={true}
              name="Название новости"
              placeholder="Введите название новости"
              errorMessage={error?.message}
            />
          )}
        />
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          name="description"
          render={({ field: { ref, onChange, onBlur, value }, fieldState: { error } }) => (
            <CustomTextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isRequired={true}
              name="Описание новости"
              placeholder="Описание новости"
              errorMessage={error?.message}
            />
          )}
        />
      </View>
      <CustomButton name="Оправить форму" onPress={handleSubmit(onSubmit)} primary={true} />
    </View>
  );
};
