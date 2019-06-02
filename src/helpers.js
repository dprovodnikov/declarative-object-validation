export const hasError = (validationReport) => {
  return Object.values(validationReport).some(value => !!value);
};

export const getFirstError = (validationReport) => {
  return Object.values(validationReport).filter(value => !!value).shift();
};
