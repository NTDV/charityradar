import { View, Text, Image, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import { NewsWithFundType } from '../../../screens/news';
import { IconNullPhoto } from '../../../shared/icons/icon-null-photo';

interface NewsPreviewProps extends NewsWithFundType {
  openFund: (id: number | string) => void;
}

/**
 * Preview новости
 */

export const NewsPreview = ({
  id,
  date,
  fundId,
  name,
  image,
  rating,
  description,
  fundName,
  openFund,
}: NewsPreviewProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => openFund(fundId)} activeOpacity={0.7}>
        <Text style={styles.headerFundName}>{fundName}</Text>
        <Text style={styles.coefficient}>{rating}</Text>
      </TouchableOpacity>
      <View style={styles.containerImg}>
        {!image ? (
          <View style={styles.img}>
            <IconNullPhoto />
          </View>
        ) : (
          <Image source={image} style={styles.img} />
        )}
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.newsText}>{description}</Text>
    </View>
  );
};
