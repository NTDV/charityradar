import { FlatList, View } from 'react-native';
import { styles } from '../../fees-widgets/urgent-fees/styles';
import { TitleMore } from '../../../shared/ui/title-more';
import { NewsPreview } from '../../../entities/news';

const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const FilterNews = ({ openFund }: { openFund: () => void }) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <TitleMore title="Новостная лента" />
      </View>
      <FlatList
        data={testData}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <NewsPreview
              openFund={openFund}
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
  );
};
