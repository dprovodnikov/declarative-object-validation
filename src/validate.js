const validate = (rules = [], value, values) => {
  const results = rules
    .map(applyRule => applyRule(value, values))
    .filter(result => !!result);

  return results.length ? results[0] : '';
};

export default validate;
