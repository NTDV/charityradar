import { Provider } from './navigation';
import { ProvideAuth } from './shared/hooks/use-auth';
import { RootSiblingParent } from 'react-native-root-siblings';

export const App = () => {
  return (
    <RootSiblingParent>
      <ProvideAuth>
        <Provider />
      </ProvideAuth>
    </RootSiblingParent>
  );
};
