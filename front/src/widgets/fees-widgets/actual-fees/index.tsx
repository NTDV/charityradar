import { FlatList, View } from 'react-native';

import { styles } from './styles';

import { TitleMore } from '../../../shared/ui/title-more';
import { FeesPreview } from '../../../entities/fees/fees-preview';
import { useEffect, useState } from 'react';
import { Fees, getActualFees } from '../../../shared/api/fund/get-actual-fees';

type ActualFeesListProps = {
  onPressAll: () => void;
  onPressFees: () => void;
};

/**
 * Список из 10 элементов для актуальных сборов
 * @param onPressAll - callback для кнопки показать все
 * @param onPressFund - callback при выборе фонда
 */

export const ActualFees = ({ onPressFees, onPressAll }: ActualFeesListProps) => {
  const [fees, setFees] = useState<[] | Fees[]>([]);

  useEffect(() => {
    (async () => {
      const payload = await getActualFees();
      setFees(payload);
    })();
  }, []);

  return (
    <View>
      <View style={styles.titleContainer}>
        <TitleMore title="Актуальные сборы" nameLink="Смотреть все" onPress={onPressAll} />
      </View>
      <View style={styles.container}>
        <FlatList
          horizontal
          data={fees}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <FeesPreview
                onPress={onPressFees}
                fundName={item.name}
                coefficient={'3.5'}
                fundDescription={item.description}
                fundraising={{
                  allMoney: item.goal,
                  currentMoney: item.collected,
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
