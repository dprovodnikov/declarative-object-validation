const mergeObjects = (a, b) => ({ ...a, ...b });

const validateAll = (rulesByField, fieldsToOmit = [], validate) => {
  return Object.keys(rulesByField)
    .filter(field => !fieldsToOmit.includes(field))
    .map(validate)
    .reduce(mergeObjects, {});
};

export default validateAll;
