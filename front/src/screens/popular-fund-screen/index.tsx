import { FlatList, View } from 'react-native';
import { styles } from '../../widgets/fund-widgets/popular-funds-list/styles';
import { FundPreview } from '../../entities/fund';
import { COLOR_WHITE } from '../../shared/constants/style-variables';
import { AppNavigationProps, PopularFundScreenProps } from '../../navigation';

const testData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * Страница со списком всех фондов
 */

export const PopularFundScreen = ({ navigation }: PopularFundScreenProps) => {
  const openFund = () => navigation.push('FundScreen');

  return (
    <View style={{ flex: 1, backgroundColor: COLOR_WHITE, paddingVertical: 15 }}>
      <FlatList
        data={testData}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <FundPreview
              onPress={openFund}
              coefficient={'4.9'}
              fundName={'Фонд «Время жизни»'}
              fundDescription={'Помогаем детям с онкологи-ческими заболеваниями'}
              fundraising={{
                allMoney: 20000,
                currentMoney: 1000,
                deadline: 30,
              }}
              isLarge={true}
            />
          </View>
        )}
        initialNumToRender={3}
        keyExtractor={(item) => item}
      />
    </View>
  );
};
