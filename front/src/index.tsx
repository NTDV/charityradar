import { Provider } from './navigation';
import { ProvideAuth } from './shared/hooks/use-auth';
// Лох?
export const App = () => {
  return (
    <ProvideAuth>
      <Provider />
    </ProvideAuth>
  );
};
