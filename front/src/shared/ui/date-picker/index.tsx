import { useState } from 'react';
import { Button, Pressable, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { CustomTextInput, CustomTextInputProps } from '@shared/ui/custom-text-input';

interface DatePicker extends CustomTextInputProps {}

export const DatePicker = ({ name, isRequired, placeholder }: DatePicker) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  return (
    <View>
      <Pressable onPress={showDatePicker}>
        <View pointerEvents="none">
          <CustomTextInput
            name={name}
            isRequired={isRequired}
            placeholder={placeholder}
            editable={false}
            onFocus={showDatePicker}
          />
        </View>
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
