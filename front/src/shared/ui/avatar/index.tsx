import { View, Image } from 'react-native';

import { styles } from './styles';

type AvatarProps = {
  width: number;
  height: number;
};

export const Avatar = ({ width, height }: AvatarProps) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <Image source={{ uri: '' }} style={{ width, height }} />
    </View>
  );
};
