import { StyleSheet } from 'react-native';
import { COLOR_WHITE } from '../../../shared/constants/style-variables';

export const styles = StyleSheet.create({
  container: {},
  row: {
    marginBottom: 35,
  },
  rowAvatar: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    position: 'absolute',
    width: '100%',
    height: 180,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  photoText: {
    textAlign: 'center',
    width: '100%',
    top: 80,
    position: 'absolute',
    fontSize: 18,
    color: COLOR_WHITE,
    fontWeight: '500',
    letterSpacing: 1,
  },
});
