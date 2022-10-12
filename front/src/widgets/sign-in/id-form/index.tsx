import { useState } from 'react';
import { View } from 'react-native';

import { styles } from './styles';

import { CustomButton } from '../../../shared/ui/custom-button';
import { IconVtb } from '../../../shared/icons/icon-vtb';
import { VtbModal } from '../vtb-modal';
import { validationSchemaVtbFormProps } from '../vtb-modal/validation-schema';
import { getToken } from '../../../shared/api/sign-in/get-token';

/**
 * widget авторизации через внешнее api
 */

export const IdForm = () => {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  const openPopup = () => setVisible(true);
  const closePopup = () => setVisible(false);

  const onSubmit = async (value: validationSchemaVtbFormProps) => {
    const payload = await getToken(value);
    console.log(payload, value);
  };

  return (
    <View style={styles.container}>
      <VtbModal visibility={visible} onClose={closePopup} onSubmit={onSubmit} error={error} />
      <CustomButton name="Войти по ВТБ ID" onPress={openPopup} icon={<IconVtb />} />
    </View>
  );
};
