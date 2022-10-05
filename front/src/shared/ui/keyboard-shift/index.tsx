import { ReactNode } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import { KeyboardAvoidingView } from 'react-native';

type KeyboardShiftProps = {
  children: ReactNode;
};

/**
 * Компонент, позволяющий не закрывать textInput клавиатурой
 * @param children - children
 */

export const KeyboardShift = ({ children }: KeyboardShiftProps) => {
  const height = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height}
      behavior="padding"
      style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
      enabled
    >
      {children}
    </KeyboardAvoidingView>
  );
};
