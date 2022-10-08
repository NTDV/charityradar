// Добавление пробелов между разрядами в цене
export const numberWithSpaces = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
