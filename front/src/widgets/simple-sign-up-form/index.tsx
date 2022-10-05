import { View } from 'react-native';

import { styles } from './styles';

import { CustomTextInput } from '@shared/ui/custom-text-input';
import { CustomButton } from '@shared/ui/custom-button';
import { DatePicker } from '@shared/ui/date-picker';

/**
 * widget регистрации через форму
 */

export const SimpleSignUpForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CustomTextInput name="Фамилия" isRequired={true} placeholder="Введите фамилию" />
      </View>
      <View style={styles.row}>
        <CustomTextInput name="Имя" isRequired={true} placeholder="Введите имя" />
      </View>
      <View style={styles.row}>
        <CustomTextInput name="Отчество" placeholder="Введите отчество" />
      </View>
      <View style={styles.row}>
        <DatePicker name="Дата рождения" isRequired={true} placeholder="Выберите дату рождения" />
      </View>
      <View style={styles.row}>
        <CustomTextInput name="E-mail" isRequired={true} placeholder="Введите e-mail" />
      </View>
      <View style={styles.row}>
        <CustomTextInput
          name="Пароль"
          isRequired={true}
          placeholder="Введите пароль"
          isPassword={true}
        />
      </View>
      <View style={[styles.row, styles.rowLast]}>
        <CustomTextInput
          name="Повторите пароль"
          isRequired={true}
          placeholder="Введите пароль еще раз"
          isPassword={true}
        />
      </View>
      <CustomButton
        name="Регистрация"
        onPress={() => {}}
        primary={true}
        stylesButton={styles.rowButton}
      />
      <CustomButton name="Гость" onPress={() => {}} />
    </View>
  );
};
