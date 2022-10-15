import { Dimensions, StyleSheet } from 'react-native';
import {
  COLOR_GREY,
  COLOR_GREY_LIGHT,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
} from '../../constants/style-variables';
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
  containerFocused: {
    height: '100%',
  },
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
  searchContainer: {},
  searchContainerTitle: {
    fontSize: 16,
    color: COLOR_GREY,
  },
  searchBox: {},
  searchBoxItem: {
    width: '100%',
    paddingVertical: 10,
  },
});
