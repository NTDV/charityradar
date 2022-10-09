import { View, Image } from 'react-native';

import { styles } from './styles';

import testPhoto from '../../../static/testImg.png';

type AvatarProps = {
  width: number;
  height: number;
};

export const Avatar = ({ width, height }: AvatarProps) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <Image source={testPhoto} style={{ width, height }} />
    </View>
  );
};
