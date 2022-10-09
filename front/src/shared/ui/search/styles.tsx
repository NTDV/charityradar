import { Dimensions, StyleSheet } from 'react-native';
import { COLOR_GREY_LIGHT, COLOR_SECONDARY } from '../../constants/style-variables';
import { MAIN_PADDING } from '../../constants/styles-global';

export const styles = StyleSheet.create({
  containerList: {
    display: 'flex',
    left: -MAIN_PADDING,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    padding: MAIN_PADDING,
  },
  container: {
    height: 40,
    maxHeight: 40,
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
