export const hasError = (validationReport) => {
  return Object.values(validationReport).some(value => !!value);
};

export const getFirstError = (validationReport) => {
  return Object.values(validationReport).filter(value => !!value).shift();
};

export const reset = validationReport => Object.entries(validationReport)
  .map(entry => [entry[0], ''])
  .reduce((output, entry) => ({ ...output, [entry[0]]: entry[1] }), {});