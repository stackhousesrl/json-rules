import _trimStart from 'lodash/trimStart'
import _size from 'lodash/size';

const isNumber = function (value) {
  return typeof value === 'number' && !isNaN(value);
};

const isDate = function (v) {
  return v instanceof Date;
};

const isDefined = function (v) {
  return v !== null && v !== undefined;
};

const isObject = function (v) {
  return v === Object(v);
};

const isFunction = function (v) {
  return typeof v === 'function';
};

const isString = function (v) {
  return typeof v === 'string';
};

const isBool = function (v) {
  return typeof v === 'boolean';
};

const EMPTY_STRING_REGEXP = /^\s*$/;

const getDefaultStringValue = (value) => {
  let op = { op: 'eq', value }
  switch (value) {
    case '$required':
      op = { op: 'ex', value: true };
      break;
    case '$exists':
      op = { op: 'ex', value: true };
      break;
    case '$notexists':
      op = { op: 'ex', value: false };
      break;
    case '!!':
      op = { op: 'ex', value: true };
      break;
    case '!!!':
      op = { op: 'ex', value: false };
      break;
    default:
      op = { op: 'eq', value };
      break;
  }
  return op
}

const getTypeOf = (value) => isNumber(value) ? 'number' : Array.isArray(value) ? 'array' : typeof value;

export const getDefaultRule = (value) => {
  let op = false;
  switch (getTypeOf(value)) {
    case 'number':
      op = { op: 'eq', value };
      break;
    case 'string':
      op = getDefaultStringValue(value);
      break;
    case 'boolean':
      op = { op: 'ex', value };
      break;
    case 'array':
      op = { op: 'in', value };
      break;
    case 'function':
      op = { op: 'func', value };
      break;
    case 'object':
      op = Object.assign(
        {},
        value,
        {
          op: value.op || Object.keys(value)[0],
          value: value.value || value[Object.keys(value)[0]]
        });
      break;
    default:
      op = { op: 'eq', value };
      break;
  }
  return op;
};

export const isEmpty = function (value) {
  var attr;

  // Null and undefined are empty
  if (!isDefined(value)) {
    return true;
  }

  // functions are non empty
  if (isFunction(value)) {
    return false;
  }

  /*   if (isBool(value)) {
      return false;
    }
   */
  // Whitespace only strings are empty
  if (isString(value)) {
    return EMPTY_STRING_REGEXP.test(value);
  }

  // For arrays we use the length property
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  // Dates have no attributes but aren't empty
  if (isDate(value)) {
    return false;
  }

  // If we find at least one property we consider it non empty
  if (isObject(value)) {
    for (attr in value) {
      return false;
    }
    return true;
  }

  return false;
};

export const forceArray = (a) => Array.isArray(a) ? a : [a];

export const getPath = (path, prefix) => {

  if (path.indexOf('^') === 0) {
    return _trimStart(path, '^')
  }

  if (path.indexOf('#') === 0) {
    const [reducer] = (prefix || '').split('.')
    return `${reducer}.${_trimStart(path, '#')}`
  }

  return prefix ? `${prefix}.${path}` : path;
}

export const forceNumber = el => {
  return Array.isArray(el) || typeof el === 'string'
    ? _size(el)
    : parseFloat(el)
}