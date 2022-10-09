import { ScrollView, View, Text, Image, FlatList } from 'react-native';

import { styles } from './styles';

import testPhoto from '../../static/testImg.png';
import { CustomButton } from '../../shared/ui/custom-button';
import { TitleMore } from '../../shared/ui/title-more';
import { FeesPreviewInsideFund } from '../../entities/fees/fees-preview-inside-fund';

export const FundScreen = () => {
  return (
    <ScrollView style={styles.containerScroll}>
      <View style={styles.container}>
        <Text style={styles.name}>Фонд «Время жизни»</Text>
        <View style={styles.containerImg}>
          <Image source={testPhoto} style={styles.img} />
        </View>
        <View style={styles.coefficientRow}>
          <Text style={styles.coefficientTitle}>Коэффициент доверия</Text>
          <Text style={styles.coefficient}>4.5</Text>
        </View>
        <View style={styles.reporting}>
          <Text style={styles.reportingTitle}>Отчетность организации:</Text>
          <Text style={styles.reportingText}>Тут будет какой-то умный текст про отчетность</Text>
          <CustomButton
            name="Посмотреть историю платежей"
            onPress={() => {}}
            primary={true}
            rect={true}
          />
        </View>
        <View style={styles.description}>
          <View style={styles.descriptionTitle}>
            <TitleMore title="Описание" />
          </View>
          <Text style={styles.descriptionText}>
            Программа фонда «Время помогать» призвана поддержать детей с онкологическими
            заболеваниями. Порой требуется провести срочную процедуру, сдать анализы, приобрести
            лекарства, улучшить бытовые условия или купить билеты к месту лечения. Фонд оказывает
            адресную поддержку семьям, имеющим финансовые трудности для того, чтобы процесс лечения
            протекал эффективно. В рамках программы фонд предоставляет также бесплатное жилье семьям
            с детьми на время перерыва в лечении и оказывает психологическую поддержку.
          </Text>
        </View>
        <View style={styles.fees}>
          <View style={styles.feesTitle}>
            <TitleMore title="Текущие сборы:" />
          </View>
          <View style={styles.containerFees}>
            <FlatList
              data={[1]}
              renderItem={({ item }) => (
                <View style={styles.itemFees}>
                  <FeesPreviewInsideFund
                    onPress={() => {}}
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
      </View>
    </ScrollView>
  );
};
