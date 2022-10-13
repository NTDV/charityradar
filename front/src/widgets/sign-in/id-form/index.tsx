import { useState } from 'react';
import { View } from 'react-native';

import { styles } from './styles';

import { CustomButton } from '../../../shared/ui/custom-button';
import { IconVtb } from '../../../shared/icons/icon-vtb';
import { VtbModal } from '../vtb-modal';
import { validationSchemaVtbFormProps } from '../vtb-modal/validation-schema';
import { useAuth } from '../../../shared/hooks/use-auth';

/**
 * widget авторизации через внешнее api
 */

export const IdForm = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  const openPopup = () => setVisible(true);
  const closePopup = () => setVisible(false);

  const onSubmit = async (value: validationSchemaVtbFormProps) => {
    setLoading(true);
    if (auth.signInVtbId !== null) {
      const payload = await auth.signInVtbId(value);

      if (payload?.['err']?.['message']) {
        setError(payload['err']['message']);
      } else {
        closePopup();
      }
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <VtbModal
        visibility={visible}
        onClose={closePopup}
        onSubmit={onSubmit}
        error={error}
        loading={loading}
      />
      <CustomButton name="Войти по ВТБ ID" onPress={openPopup} icon={<IconVtb />} />
    </View>
  );
};
