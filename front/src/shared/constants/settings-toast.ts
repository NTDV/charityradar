import Toast from 'react-native-root-toast';

import { COLOR_PRIMARY, COLOR_WHITE } from './style-variables';

export const settingsToast = {
  duration: 1500,
  position: Toast.positions.TOP + 25,
  shadow: true,
  shadowColor: 'rgba(0, 0, 0, 0.2)',
  animation: true,
  hideOnPress: true,
  delay: 0,
  backgroundColor: COLOR_PRIMARY,
  textColor: COLOR_WHITE,
  opacity: 1,
};
