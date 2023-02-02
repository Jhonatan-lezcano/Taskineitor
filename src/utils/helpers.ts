export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDate = (date: Date) => {
  const MM = date.getMinutes();
  const SS = date.getSeconds();

  return `${MM.toString().padStart(2, '0')}:${SS.toString().padStart(2, '0')}`;
};
