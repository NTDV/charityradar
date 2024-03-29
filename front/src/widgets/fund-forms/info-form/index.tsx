import { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, View, Text, Image } from 'react-native';
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
import { useAuth } from '../../../shared/hooks/use-auth';
import { editFund } from '../../../shared/api/fund-admin/edit-fund';

export const InfoForm = () => {
  const { user, editFond } = useAuth();
  const [formDataImg, setFormDataImg] = useState(null);
  const [photo, setPhoto] = useState<null | object>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchemaFund),
  });

  const onSubmit = async (value) => {
    if (formDataImg !== null) {
      const data = {
        name: value.name,
        description: value.description,
      };

      let pathPhoto = null;
      const payload = await uploadImg(formDataImg);

      if (payload !== null && payload.path) {
        pathPhoto = payload.path.substring(16);
        data['image'] = pathPhoto;
        editFond(data);
      }

      await editFund({
        token: user?.token,
        data,
      });
    }
  };

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
    formData.append('type', 0);
    setFormDataImg(formData);
  };

  useEffect(() => {
    (async () => {
      await launchImage();
    })();
  }, [photo]);

  useEffect(() => {
    if (user?.fund !== undefined) {
      setValue('name', user.fund.name);
      setValue('description', user.fund.description);
    }
  }, []);

  if (user?.fund === undefined) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={choosePhoto} activeOpacity={0.8}>
        <View style={[styles.row, styles.rowAvatar]}>
          {!!user.fund.image ? (
            <Avatar
              height={180}
              width={Dimensions.get('window').width - MAIN_PADDING * 2}
              uri={user.fund.image}
            />
          ) : (
            <View
              style={{
                height: 180,
                width: Dimensions.get('window').width - MAIN_PADDING * 2,
              }}
            />
          )}
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
