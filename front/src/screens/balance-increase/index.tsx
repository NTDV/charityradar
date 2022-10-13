import { ScrollView, Text, View } from 'react-native';

import { styles } from './styles';

import { KeyboardShift } from '../../shared/ui/keyboard-shift';
import { CustomTextInput } from '../../shared/ui/custom-text-input';

export const BalanceIncrease = () => {
  return (
    <View style={styles.container}>
      <KeyboardShift>
        <ScrollView style={styles.wrapper}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>По карте</Text>
            <View>
              <View>
                <CustomTextInput
                  name={''}
                  value={''}
                  onChangeText={() => {}}
                  styles={styles.cardInput}
                  placeholder="Номер карты"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardShift>
    </View>
  );
};
