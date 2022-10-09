import { ScrollView, View } from 'react-native';

import { FeesFull } from '../../entities/fees/fees-full';
import { COLOR_WHITE } from '../../shared/constants/style-variables';
import { MAIN_PADDING } from '../../shared/constants/styles-global';

export const FeesFullScreen = () => {
  return (
    <ScrollView style={{ flexGrow: 1, backgroundColor: COLOR_WHITE }}>
      <View style={{ flex: 1, padding: MAIN_PADDING }}>
        <FeesFull
          fundName={'Фонд "Время жизни"'}
          coefficient={'3.5'}
          fundDescription={'Помогаем детям с онкологи-ческими заболеваниями'}
          fundraising={{
            allMoney: 20000,
            currentMoney: 5000,
            deadline: 1,
          }}
        />
      </View>
    </ScrollView>
  );
};
