"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forceNumber = exports.getPath = exports.forceArray = exports.isEmpty = exports.getDefaultRule = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _trimStart2 = _interopRequireDefault(require("lodash/trimStart"));

var _size2 = _interopRequireDefault(require("lodash/size"));

var isNumber = function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
};

var isDate = function isDate(v) {
  return v instanceof Date;
};

var isDefined = function isDefined(v) {
  return v !== null && v !== undefined;
};

var isObject = function isObject(v) {
  return v === Object(v);
};

var isFunction = function isFunction(v) {
  return typeof v === 'function';
};

var isString = function isString(v) {
  return typeof v === 'string';
};

var isBool = function isBool(v) {
  return typeof v === 'boolean';
};

var EMPTY_STRING_REGEXP = /^\s*$/;

var getDefaultStringValue = function getDefaultStringValue(value) {
  var op = {
    op: 'eq',
    value: value
  };

  switch (value) {
    case '$required':
      op = {
        op: 'ex',
        value: true
      };
      break;

    case '$exists':
      op = {
        op: 'ex',
        value: true
      };
      break;

    case '$notexists':
      op = {
        op: 'ex',
        value: false
      };
      break;

    case '!!':
      op = {
        op: 'ex',
        value: true
      };
      break;

    case '!!!':
      op = {
        op: 'ex',
        value: false
      };
      break;

    default:
      op = {
        op: 'eq',
        value: value
      };
      break;
  }

  return op;
};

var getTypeOf = function getTypeOf(value) {
  return isNumber(value) ? 'number' : Array.isArray(value) ? 'array' : (0, _typeof2["default"])(value);
};

var getDefaultRule = function getDefaultRule(value) {
  var op = false;

  switch (getTypeOf(value)) {
    case 'number':
      op = {
        op: 'eq',
        value: value
      };
      break;

    case 'string':
      op = getDefaultStringValue(value);
      break;

    case 'boolean':
      op = {
        op: 'ex',
        value: value
      };
      break;

    case 'array':
      op = {
        op: 'in',
        value: value
      };
      break;

    case 'function':
      op = {
        op: 'func',
        value: value
      };
      break;

    case 'object':
      op = Object.assign({}, value, {
        op: value.op || Object.keys(value)[0],
        value: value.value || value[Object.keys(value)[0]]
      });
      break;

    default:
      op = {
        op: 'eq',
        value: value
      };
      break;
  }

  return op;
};

exports.getDefaultRule = getDefaultRule;

var isEmpty = function isEmpty(value) {
  var attr; // Null and undefined are empty

  if (!isDefined(value)) {
    return true;
  } // functions are non empty


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
  } // For arrays we use the length property


  if (Array.isArray(value)) {
    return value.length === 0;
  } // Dates have no attributes but aren't empty


  if (isDate(value)) {
    return false;
  } // If we find at least one property we consider it non empty


  if (isObject(value)) {
    for (attr in value) {
      return false;
    }

    return true;
  }

  return false;
};

exports.isEmpty = isEmpty;

var forceArray = function forceArray(a) {
  return Array.isArray(a) ? a : [a];
};

exports.forceArray = forceArray;

var getPath = function getPath(path, prefix) {
  if (path.indexOf('^') === 0) {
    return (0, _trimStart2["default"])(path, '^');
  }

  if (path.indexOf('#') === 0) {
    var _split = (prefix || '').split('.'),
        _split2 = (0, _slicedToArray2["default"])(_split, 1),
        reducer = _split2[0];

    return "".concat(reducer, ".").concat((0, _trimStart2["default"])(path, '#'));
  }

  return prefix ? "".concat(prefix, ".").concat(path) : path;
};

exports.getPath = getPath;

var forceNumber = function forceNumber(el) {
  return Array.isArray(el) || typeof el === 'string' ? (0, _size2["default"])(el) : parseFloat(el);
};

exports.forceNumber = forceNumber;