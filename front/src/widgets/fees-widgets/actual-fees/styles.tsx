import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 10,
  },
  item: {
    zIndex: 999,
    padding: 5,
    marginRight: 10,
  },
  container: {
    width: Dimensions.get('window').width,
  },
});
