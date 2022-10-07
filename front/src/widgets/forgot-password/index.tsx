import { View } from 'react-native';

import { styles } from './styles';

import { CustomModal } from '../../shared/ui/custom-modal';
import { CustomTextInput } from '../../shared/ui/custom-text-input';
import { CustomButton } from '../../shared/ui/custom-button';

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
  return (
    <CustomModal title="Востановление пароля" visibility={visibility} onClose={onClose}>
      <View>
        <View style={styles.row}>
          <CustomTextInput name="E-mail" isRequired={true} placeholder="Введите e-mail" />
        </View>
        <CustomButton name="Восстановить" onPress={() => {}} primary={true} />
      </View>
    </CustomModal>
  );
};
