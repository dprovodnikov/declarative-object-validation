import { hasError, applyRules } from '..';

describe('hasError validation util function', () => {
  test('detects error in validation object properly', () => {
    const validation = {
      validField: '',
      invalidField: 'error',
    };

    expect(hasError(validation)).toBe(true);
  });
});

describe('applyRules  validation util function', () => {
  test('is a function', () => {
    expect(applyRules).toBeInstanceOf(Function);
  });

  test('returns a function', () => {
    expect(applyRules({})).toBeInstanceOf(Function);
  });

  test('returned function uses applied rule properly', () => {
    const rule = () => 'Error message';

    const rules = {
      field: [rule],
    };

    expect(applyRules(rules)('field', { field: 'value' })).toBe('Error message');
  });

  test('throws an error if the fieldName arg is not a string', () => {
    const rule = () => 'Error message';

    const rules = {
      field: [rule],
    };

    const validate = applyRules(rules);

    expect(() => validate(null, { field: 'value' })).toThrowError();
  });
});
