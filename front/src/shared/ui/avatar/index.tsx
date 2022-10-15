import { View, Image } from 'react-native';

import { styles } from './styles';
import { BASE_URL } from '../../api/general';

type AvatarProps = {
  width: number;
  height: number;
  uri: string;
};

export const Avatar = ({ width, height, uri }: AvatarProps) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <Image source={{ uri: `${BASE_URL}${uri}` }} style={{ width, height }} />
    </View>
  );
};
