import { StyleSheet } from 'react-native';
import { COLOR_BLACK, COLOR_GREY_SECONDARY, COLOR_PRIMARY } from '../../constants/style-variables';

export const styles = StyleSheet.create({
  container: {},
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progress: {
    height: 4,
    flex: 1,
    backgroundColor: COLOR_GREY_SECONDARY,
    borderRadius: 5,
  },
  progressCurrent: {
    height: 4,
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 5,
  },
  percent: {
    marginLeft: 10,
    color: COLOR_BLACK,
    opacity: 0.6,
  },
  currentMoney: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deadline: {
    textAlign: 'right',
  },
});
