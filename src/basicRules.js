const EMAIL_REG_EXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const URL_REG_EXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export const emailFormat = message => (email) => {
  if (!EMAIL_REG_EXP.test(email)) {
    return message;
  }

  return '';
};

export const urlFormat = message => (value) => {
  if (!URL_REG_EXP.test(value)) {
    return message;
  }

  return '';
};

export const notEmpty = message => (value = '') => {
  if (!value.trim()) {
    return message;
  }

  return '';
};

export const matches = (comparisonField, message) => (value, fields) => {
  if (value !== fields[comparisonField]) {
    return message;
  }

  return '';
};

export const longerThan = (length, message) => (value) => {
  if (!value || value.length < length) {
    return message;
  }

  return '';
};

export const hasUpperLetter = message => (value) => {
  if (value.toLowerCase() === value) {
    return message;
  }

  return '';
};

export const notShorterThan = (length, message) => (value) => {
  if (!value || value.length < length) {
    return message;
  }

  return '';
};