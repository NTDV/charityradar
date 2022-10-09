import { forwardRef, Ref, useState } from 'react';
import { format } from 'date-fns';
import { Pressable, TextInput, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { CustomTextInput, CustomTextInputProps } from '../custom-text-input';

interface DatePicker extends CustomTextInputProps {}

export const DatePicker = forwardRef(
  (
    { name, isRequired, placeholder, onChangeText, value, errorMessage }: DatePicker,
    ref: Ref<TextInput>,
  ) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
      const formatDate = format(date, 'dd.MM.yyyy');
      onChangeText(formatDate);
      hideDatePicker();
    };

    return (
      <View>
        <Pressable onPress={showDatePicker}>
          <View pointerEvents="none">
            <CustomTextInput
              ref={ref}
              name={name}
              isRequired={isRequired}
              placeholder={placeholder}
              editable={false}
              onFocus={showDatePicker}
              value={value}
              errorMessage={errorMessage}
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
  },
);
