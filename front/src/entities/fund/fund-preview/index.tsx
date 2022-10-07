import { View, Text, Image } from 'react-native';

import { styles } from './styles';

import testPhoto from '../../../static/testImg.png';

export const FundPreview = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerImg}>
        <Image source={testPhoto} style={styles.img} />
      </View>
      <View style={styles.coefficientRow}>
        <Text style={styles.coefficientTitle}>Коэффициент доверия</Text>
        <Text style={styles.coefficient}>4,2</Text>
      </View>
      <Text style={styles.info}>Помогаем детям с онкологи-ческими заболеваниями</Text>
      <Text style={styles.nameFund}>Фонд «Время жизни»</Text>
    </View>
  );
};
