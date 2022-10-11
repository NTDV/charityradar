import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import { styles } from './styles';

import { CustomButton } from '../../../shared/ui/custom-button';
import { IconVtb } from '../../../shared/icons/icon-vtb';
import { getToken } from '../../../shared/api/sign-in/get-token';
import { AuthVtb } from '../../../shared/api/sign-in/auth-vtb';
import { useState } from 'react';

/**
 * widget авторизации через внешнее api
 */

export const IdForm = () => {
  const [html, setHtml] = useState(null);
  // const [];
  const authHandler = async () => {
    const payload = await getToken();
    const html = await AuthVtb(payload);
    setHtml(html);
  };

  return (
    <View style={styles.container}>
      <CustomButton name="Войти по ВТБ ID" onPress={authHandler} icon={<IconVtb />} />
      {/*{html && (*/}
      {/*  <WebView style={{ width: 300, height: 300 }} originWhitelist={['*']} source={{ html }} />*/}
      {/*)}*/}
    </View>
  );
};
