import { Provider } from './navigation';
import { ProvideAuth } from './shared/hooks/use-auth';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider as ProviderMobx } from 'mobx-react';
import { bankCardStore } from './stores/bank-card-store';

const stores = {
  bankCardStore,
};

export const App = () => {
  return (
    <RootSiblingParent>
      <ProvideAuth>
        <ProviderMobx {...stores}>
          <Provider />
        </ProviderMobx>
      </ProvideAuth>
    </RootSiblingParent>
  );
};
