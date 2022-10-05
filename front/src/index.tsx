import { Provider } from '@navigation';
import { ProvideAuth } from '@shared/hooks/use-auth';

export const App = () => {
  return (
    <ProvideAuth>
      <Provider />
    </ProvideAuth>
  );
};
