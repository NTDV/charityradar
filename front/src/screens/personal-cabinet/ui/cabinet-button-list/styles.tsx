import { StyleSheet } from 'react-native';

import { COLOR_GREY, COLOR_WHITE } from '../../../../shared/constants/style-variables';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: COLOR_WHITE,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: COLOR_GREY,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  itemName: {
    fontSize: 16,
  },
});
