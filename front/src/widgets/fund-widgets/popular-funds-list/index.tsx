import { FlatList, View } from 'react-native';

import { styles } from './styles';

import { TitleMore } from '../../../shared/ui/title-more';
import { FundPreview } from '../../../entities/fund';

type PopularFundsListProps = {
  onPressAll: () => void;
  onPressFund: () => void;
};

const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * Список из 10 элементов для популярных фондов
 * @param onPressAll - callback для кнопки показать все
 * @param onPressFund - callback при выборе фонда
 */

export const PopularFundsList = ({ onPressAll, onPressFund }: PopularFundsListProps) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <TitleMore title="Популярные фонды" nameLink="Смотреть все" onPress={onPressAll} />
      </View>
      <View style={styles.container}>
        <FlatList
          horizontal
          data={testData}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <FundPreview
                onPress={onPressFund}
                coefficient={'4.9'}
                fundName={'Фонд «Время жизни»'}
                fundDescription={'Помогаем детям с онкологи-ческими заболеваниями'}
                fundraising={{
                  allMoney: 20000,
                  currentMoney: 1000,
                  deadline: 30,
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
