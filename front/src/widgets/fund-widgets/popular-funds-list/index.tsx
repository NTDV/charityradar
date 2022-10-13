import { FlatList, View } from 'react-native';

import { styles } from './styles';

import { TitleMore } from '../../../shared/ui/title-more';
import { FundPreview } from '../../../entities/fund';
import { SuccessResponseGetAllFunds } from '../../../shared/api/fund/get-all-funds';

type PopularFundsListProps = {
  onPressAll: () => void;
  onPressFund: () => void;
  fundsList: SuccessResponseGetAllFunds[];
};

/**
 * Список из 10 элементов для популярных фондов
 * @param onPressAll - callback для кнопки показать все
 * @param onPressFund - callback при выборе фонда
 * @param fundsList - список фондов
 */

export const PopularFundsList = ({ onPressAll, onPressFund, fundsList }: PopularFundsListProps) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <TitleMore
          title="Популярные фонды"
          nameLink={fundsList.length > 10 ? 'Смотреть все' : ''}
          onPress={onPressAll}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          horizontal
          data={fundsList}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <FundPreview
                onPress={() => onPressFund(item.id)}
                coefficient={item.rating}
                fundName={item.name}
                fundDescription={item.description}
                image={item.image}
                fees={item.fees}
              />
            </View>
          )}
          initialNumToRender={3}
        />
      </View>
    </View>
  );
};
