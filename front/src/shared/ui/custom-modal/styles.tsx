import { Dimensions, StyleSheet } from 'react-native';
import { COLOR_GREY, COLOR_WHITE } from '@shared/constants/style-variables';

export const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    marginTop: 37,
    marginHorizontal: 30,
    width: Dimensions.get('window').width - 60,
    maxHeight: Dimensions.get('window').height - 37 - 60 - 80, // 37 - marginTop, 60 - paddingHorizontal * 2
    backgroundColor: COLOR_WHITE,
    borderRadius: 7,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    borderColor: COLOR_GREY,
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomColor: COLOR_GREY,
    borderBottomWidth: 1,
  },
  headerName: {
    fontSize: 20,
  },
  content: {
    paddingHorizontal: 10,
    alignSelf: 'stretch',
  },
});
