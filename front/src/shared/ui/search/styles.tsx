import { StyleSheet } from 'react-native';
import { COLOR_GREY_LIGHT, COLOR_SECONDARY } from '@shared/constants/style-variables';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerFocused: {},
  icon: {
    position: 'absolute',
    left: 15,
    top: 7,
  },
  iconClear: {
    top: 1,
    right: 15,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLOR_GREY_LIGHT,
    borderRadius: 4,
  },
  textInput: {
    alignSelf: 'stretch',
    flex: 1,
    paddingLeft: 50,
    paddingRight: 15,
    paddingVertical: 12,
  },
  cancel: {
    marginLeft: 10,
  },
  cancelText: {
    color: COLOR_SECONDARY,
    fontSize: 16,
  },
});
