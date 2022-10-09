import { FlatList, View } from 'react-native';

import { styles } from './styles';

import { TitleMore } from '../../../shared/ui/title-more';
import { FeesPreview } from '../../../entities/fees/fees-preview';

type ActualFeesListProps = {
  onPressAll: () => void;
  onPressFees: () => void;
};

const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * Список из 10 элементов для актуальных сборов
 * @param onPressAll - callback для кнопки показать все
 * @param onPressFund - callback при выборе фонда
 */

export const UrgentFees = ({ onPressFees, onPressAll }: ActualFeesListProps) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <TitleMore title="Актуальные сборы" nameLink="Смотреть все" onPress={onPressAll} />
      </View>
      <View style={styles.container}>
        <FlatList
          horizontal
          data={testData}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <FeesPreview
                onPress={onPressFees}
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
          )}
          initialNumToRender={3}
        />
      </View>
    </View>
  );
};
