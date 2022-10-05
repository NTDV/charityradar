import { SafeAreaView, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const Search = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <Text>Search</Text>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
