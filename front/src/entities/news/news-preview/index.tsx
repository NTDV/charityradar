import { View, Text, Image, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import testPhoto from '../../../static/testImg.png';

import { Avatar } from '../../../shared/ui/avatar';

type FundPreviewProps = {
  openFund: () => void;
  coefficient: string;
  fundName: string;
  fundDescription: string;
  isLarge?: boolean;
  fundraising: {
    allMoney: number;
    currentMoney: number;
    deadline: number;
  };
};

/**
 * Компонент, отображающий превью фонда
 * @param openFund - Клик на плашку
 * @param coefficient - Коэффициент доверия
 * @param fundName - Название фонда
 */

export const NewsPreview = ({ openFund, coefficient, fundName }: FundPreviewProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={openFund} activeOpacity={0.8}>
        <View style={styles.headerLeftColumn}>
          <Avatar />
          <View style={styles.headerFund}>
            <Text style={styles.headerFundName}>{fundName}</Text>
            <Text style={styles.headerFundDescription}>Тут будет какая-то информация</Text>
          </View>
        </View>
        <View style={styles.headerRightColumn}>
          <Text style={styles.coefficient}>{coefficient}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.containerImg}>
        <Image source={testPhoto} style={styles.img} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Название новости</Text>
        <Text style={styles.date}>30.10.2022</Text>
      </View>
      <Text style={styles.newsText}>
        Программа направлена на финансовую поддержку приютов для бездомных животных — покупку кормов
        и лекарств, ремонт вольеров, оплату ветеринарных услуг, пиар животных. Помощь получат и
        владельцы животных, которые не могут обеспечить достойную
      </Text>
    </View>
  );
};
