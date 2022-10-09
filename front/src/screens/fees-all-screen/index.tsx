import { FlatList, View } from 'react-native';

import { styles } from './styles';

import { FeesPreview } from '../../entities/fees/fees-preview';
import { TitleMore } from '../../shared/ui/title-more';
import { FeesAllScreenProps } from '../../navigation';

const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const FeesAllScreen = ({ navigation }: FeesAllScreenProps) => {
  const openFees = () => navigation.push('FeesFullScreen');

  return (
    <View style={[styles.section, { paddingHorizontal: 10 }]}>
      <FlatList
        data={testData}
        ListHeaderComponent={
          <>
            <View style={styles.section}>
              <View style={styles.containerTitle}>
                <TitleMore title="Срочные сборы пожертвований" />
              </View>
              <FlatList
                horizontal
                data={testData}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <FeesPreview
                      onPress={openFees}
                      fundName={'Фонд "Время жизни"'}
                      coefficient={'3.5'}
                      fundDescription={'Помогаем детям с онкологи-ческими заболеваниями'}
                      fundraising={{
                        allMoney: 20000,
                        currentMoney: 5000,
                        deadline: 1,
                      }}
                      isLarge={true}
                    />
                  </View>
                )}
                initialNumToRender={3}
              />
            </View>
            <View style={styles.containerTitle}>
              <TitleMore title="Актуальные сборы" />
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={[styles.item, styles.itemVertical]}>
            <FeesPreview
              onPress={openFees}
              fundName={'Фонд "Время жизни"'}
              coefficient={'3.5'}
              fundDescription={'Помогаем детям с онкологи-ческими заболеваниями'}
              fundraising={{
                allMoney: 20000,
                currentMoney: 5000,
                deadline: 1,
              }}
              isLarge={true}
            />
          </View>
        )}
        initialNumToRender={3}
      />
    </View>
  );
};
