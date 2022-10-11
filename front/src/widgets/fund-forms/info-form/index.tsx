import { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Controller, useForm } from 'react-hook-form';

import { styles } from './styles';

import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemaFund } from '../lib/validation-schema';
import { CustomTextInput } from '../../../shared/ui/custom-text-input';
import { CustomButton } from '../../../shared/ui/custom-button';
import { Avatar } from '../../../shared/ui/avatar';
import { MAIN_PADDING } from '../../../shared/constants/styles-global';
import { uploadImg } from '../../../shared/api/fund-admin/upload-img';

export const InfoForm = () => {
  const [photo, setPhoto] = useState<null | object>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemaFund),
  });

  const onSubmit = () => {};

  const choosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      // @ts-ignore
      setPhoto(result.uri);
    }
  };

  const launchImage = async () => {
    if (photo === null) return;

    let filename = photo.split('/').pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append('image', { uri: photo, name: filename, type });

    await uploadImg(formData);
    // return await fetch(YOUR_SERVER_URL, {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // });
  };

  useEffect(() => {
    (async () => {
      await launchImage();
    })();
  }, [photo]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={choosePhoto} activeOpacity={0.8}>
        <View style={[styles.row, styles.rowAvatar]}>
          <Avatar height={180} width={Dimensions.get('window').width - MAIN_PADDING * 2} />
          <View style={styles.photo} />
        </View>
        <Text style={styles.photoText}>Выберите фотографию</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <Controller
          control={control}
          name="name"
          render={({ field: { ref, onChange, onBlur, value } }) => (
            <CustomTextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isRequired={true}
              name="Название фонда"
              placeholder="Введите название фонда"
              errorMessage={errors?.['name']?.message}
            />
          )}
        />
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          name="description"
          render={({ field: { ref, onChange, onBlur, value } }) => (
            <CustomTextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isRequired={true}
              name="Описание фонда"
              placeholder="Введите описание фонда"
              errorMessage={errors?.['description']?.message}
              multiline={true}
            />
          )}
        />
      </View>
      <CustomButton name="Оправить форму" onPress={handleSubmit(onSubmit)} primary={true} />
    </View>
  );
};
