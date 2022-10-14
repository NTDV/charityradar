import { Text, TextStyle } from 'react-native';
import { useEffect, useState } from 'react';
import {
  COLOR_ERROR,
  COLOR_GOLD,
  COLOR_PRIMARY,
  COLOR_SUCCESS,
} from '../../constants/style-variables';

type RatingProps = {
  rating: number;
  styles?: TextStyle;
};

export const Rating = ({ rating, styles }: RatingProps) => {
  const [ratingParse, setRatingParse] = useState(null);
  const [color, setColor] = useState(COLOR_PRIMARY);

  useEffect(() => {
    let color;

    if (rating >= 4.5) {
      color = COLOR_SUCCESS;
    } else if (rating > 4 && rating < 4.5) {
      color = COLOR_PRIMARY;
    } else if (rating > 3.5 && rating < 4) {
      color = COLOR_GOLD;
    } else {
      color = COLOR_ERROR;
    }

    setColor(color);
    setRatingParse(parseFloat(rating.toString()).toFixed(1));
  }, [rating]);

  if (ratingParse === null) return null;
  return <Text style={[styles, { color }]}>{ratingParse}</Text>;
};
