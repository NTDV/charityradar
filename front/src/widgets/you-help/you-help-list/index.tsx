import { FlatList, View } from 'react-native';

import { styles } from './styles';

import { TitleMore } from '../../../shared/ui/title-more';
import { FundPreview } from '../../../entities/fund';

type YouHelpListProps = {
  onPressFund: () => void;
};

const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const YouHelpList = ({ onPressFund }: YouHelpListProps) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <TitleMore title="Кому вы помогали" />
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
              />
            </View>
          )}
          initialNumToRender={3}
        />
      </View>
    </View>
  );
};
