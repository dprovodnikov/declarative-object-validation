# Declarative object validation

[![Build Status](https://travis-ci.org/dprovodnikov/declarative-object-validation.svg?branch=master)](https://travis-ci.org/dprovodnikov/declarative-object-validation)

## Install

```bash
$ npm install @dprovodnikov/validation
```

## Usage example

Here's a typical login form data structure:
```javascript
const form = {
  login: '',
  password: '',
  repeatPassword: '',
};
```

### Rules declaration
Let's say we have a set of constraints to apply to the fields of this form:

* Login cannot be empty
* Password should contain at least one uppercase letter
* Password should be at least 7 chars long
* Password should match repeatPassword

These are common rules pretty much every login form uses. Now we need to declare these rules.

```javascript
import { notEmpty, hasUpperLetter, longerThen, matches } from '@dprovodnikov/validation';

const rules = {
  login: [notEmpty('Login cannot be empty')],
  password: [
    hasUpperLetter('Password should contain at least one uppercase letter'),
    longerThen(7, 'Password should be at least 7 chars long'),
  ],
  repeatPassword: [
    matches('password', 'Password should match repeatPassword'),
  ],
};
```

The library provides a couple of basic rules that are fairly common:

| Rule | Description |
|:----:|:-----------:|
| notEmpty | Makes sure the given value is not empty |
| hasUpperLetter | Makes sure the given value contains an uppercase letter |
| longerThen | Makes sure the given value has a length of more than specified |
| matches | Makes sure the given value matches the specified field of the form |
| emailFormat | Makes sure the given value matches the regexp that is integrated in the library |
| notShorterThan | Makes sure the given value has length of at least equal the specified value |

If you need any other rule you can easily implement one using simple api. Here's what a rule looks like:

```javascript
const rule = message => (value, form) => {
  // You need to return a string.
  // This string represents the validation error message.
  // If the output is empty - the value satisfies the rule and therefore is considered valid.
  let output = '';

  // here you have access to the value this rule was assigned to.
  // the entire form object is also accessible from here for more complex and flexible validation logic

  return output;
};
```

Here's the implementation of the `matches` rule that is provided by the library:

```javascript
export const matches = (comparisonField, message) => (value, fields) => {
  if (value !== fields[comparisonField]) {
    return message;
  }

  return '';
};
```

As simple as that.

### Rules application

In order to create a validator you need to apply the rules you declared earlier.

```javascript
import { applyRules } from '@dprovodnikov/validation';

const rules = {
  field: [notEmpty('Field should not be empty')],
};

const validate = applyRules(rules);

const form = {
  field: '',
};

validate('all', form); // { field: 'Field should not be empty' }
validate('field', form); // 'Field should not be empty'
```

The output of the validator is a structure where keys are field names and values are error messages.
If a field has multiple rules applied to it and more than one of them fail - the output will contain the first one that failed.

There is a tool to easily check if the report contains any error messages:

```javascript
import { hasError } from '@dprovodnikov/validation';

const report = validate(form);

if (hasError(report)) {
  ...
}
```

There's also a method to extract the first error in the output;

```javascript
import { hasError, getFirstError } from '@dprovodnikov/validation';

const report = validate(form);

if (hasError(report)) {
  const errorMessage = getFirstError(report);
  ...
}
```

The list of methods:

| Method | Input | Output | Description |
|:------:|:-----:|:------:|:-----------:|
| applyRules | rules | validator function | Takes in rules and returns a validator |
| hasError | validation report | boolean | Takes in a validation report and returns wheather it contains an error on not |
| getFirstError | validation report | string | Takes in a validation report and returns the first error |


## Build

Make sure tests pass
```bash
$ npm run test
```

Install dependencies
```bash
$ npm install
```

Build from sources
```bash
$ npm run build
```

The output will appear in the `dist` folder in the project's root.

## License
MIT