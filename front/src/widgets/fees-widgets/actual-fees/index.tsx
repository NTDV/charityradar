import { FlatList, View } from 'react-native';

import { styles } from './styles';

import { TitleMore } from '../../../shared/ui/title-more';
import { FeesPreview } from '../../../entities/fees/fees-preview';
import { Fees } from '../../../shared/api/fund/get-actual-fees';
import { intervalToDuration } from 'date-fns';

type ActualFeesListProps = {
  onPressAll: () => void;
  onPressFees: () => void;
  feesList: Fees[];
};

/**
 * Список из 10 элементов для актуальных сборов
 * @param onPressAll - callback для кнопки показать все
 * @param onPressFund - callback при выборе фонда
 */

export const ActualFees = ({ onPressFees, onPressAll, feesList }: ActualFeesListProps) => {
  const getDeadline = (startDate: Date, endDate: Date) => {
    return intervalToDuration({ start: new Date(startDate), end: new Date(endDate) }).days;
  };

  return (
    <View>
      <View style={styles.titleContainer}>
        <TitleMore
          title="Актуальные сборы"
          nameLink={feesList.length >= 5 ? 'Смотреть все' : ''}
          onPress={onPressAll}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          horizontal
          data={feesList}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <FeesPreview
                onPress={() => onPressFees(item)}
                fundName={item.name}
                fundDescription={item.description}
                image={item.image}
                fundraising={{
                  allMoney: item.goal,
                  currentMoney: item.collected,
                  deadline: getDeadline(item.startDate, item.endDate) ?? null,
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
