import { SafeAreaView, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const News = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <Text>News</Text>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
