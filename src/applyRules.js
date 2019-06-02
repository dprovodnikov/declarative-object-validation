import validate from './validate';
import validateAll from './validateAll';

const applyRules = rules => (fieldName, object, options = {}) => {
  if (!fieldName) {
    throw Error('Missing validation key. What do you want to validate?');
  }

  if (fieldName === 'all') {
    return validateAll(rules, options.omit, field => ({
      [field]: validate(rules[field], object[field], object),
    }));
  }

  return validate(rules[fieldName], object[fieldName], object);
};

export default applyRules;
