import { Text, View } from 'react-native';

import { styles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import { CustomTextInput } from '../../../shared/ui/custom-text-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemaFees } from '../lib/validation-schema';
import { CustomButton } from '../../../shared/ui/custom-button';
import { DatePicker } from '../../../shared/ui/date-picker';

export const FeesForm = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchemaFees),
  });

  const onSubmit = () => {};

  return (
    <View style={styles.container}>
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
              name="Название сбора"
              placeholder="Введите название сбора"
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
              name="Информация о сборе"
              placeholder="Введите информацию о сборе"
              errorMessage={error?.message}
            />
          )}
        />
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          name="allMoney"
          render={({ field: { ref, onChange, onBlur, value }, fieldState: { error } }) => (
            <CustomTextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isRequired={true}
              name="Сумма сбора"
              keyboardType="numeric"
              placeholder="Введите сумму сбора"
              errorMessage={error?.message}
            />
          )}
        />
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          name="dateStart"
          render={({ field: { ref, onChange, onBlur, value }, fieldState: { error } }) => (
            <DatePicker
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isRequired={true}
              name="Дата начала сбора"
              placeholder="Выберите дату начала сбора"
              errorMessage={error?.message}
            />
          )}
        />
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          name="dateEnd"
          render={({ field: { ref, onChange, onBlur, value }, fieldState: { error } }) => (
            <DatePicker
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isRequired={true}
              name="Дата окончания сбора"
              placeholder="Выберите дату окончания сбора"
              errorMessage={error?.message}
            />
          )}
        />
      </View>
      <CustomButton name="Оправить форму" onPress={handleSubmit(onSubmit)} primary={true} />
    </View>
  );
};
