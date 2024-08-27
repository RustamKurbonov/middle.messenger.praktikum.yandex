export const getFieldValue = (field: string): string => {
  const name = document.querySelector(field);
  const value = (name as HTMLInputElement)?.value;

  return value;
};
