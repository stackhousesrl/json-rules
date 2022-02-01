"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getKeys = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _get3 = _interopRequireDefault(require("lodash/get"));

var _operators = _interopRequireDefault(require("./operators"));

var _utils = require("./utils");

function rule(val, data, options) {
  var _ref = options || {},
      prefix = _ref.prefix;

  var path = val.path || Object.keys(val)[0];
  var valueBlock = val.path ? (0, _defineProperty2["default"])({}, path, val) : val;
  var pathWithPrefix = (0, _utils.getPath)(path, prefix);
  var valueForKey = (0, _get3["default"])(data, pathWithPrefix, undefined);

  var _get2 = (0, _get3["default"])(valueBlock, [path], {}),
      name = _get2.name;

  var _getDefaultRule = (0, _utils.getDefaultRule)(valueBlock[path]),
      op = _getDefaultRule.op,
      value = _getDefaultRule.value,
      opt = _getDefaultRule.opt;

  var valueRef = value && (Object.prototype.hasOwnProperty.call(value, 'ref') ? (0, _get3["default"])(data, (0, _utils.getPath)(value.ref, prefix), undefined) : value);
  var valueTransformed = valueRef && (Object.prototype.hasOwnProperty.call(value, 'transform') ? value.transform(valueRef) : valueRef);

  if (!_operators["default"][op]) {
    throw new Error('Error missing operator:' + op);
  }

  var valid = _operators["default"][op] && _operators["default"][op](valueForKey, valueTransformed, opt, data);

  return {
    valid: valid,
    name: pathWithPrefix + '___' + (name || op)
  };
}

function checkRule(block, data, results, options) {
  if (Object.prototype.hasOwnProperty.call(block, 'and')) {
    if (options && options.checkAll) {
      return block && block.and.map(function (item) {
        return checkRule(item, data, results, options);
      }).every(Boolean);
    }

    return block.and.every(function (item) {
      return checkRule(item, data, results, options);
    });
  }

  if (Object.prototype.hasOwnProperty.call(block, 'or')) {
    if (options && options.checkAll) {
      return block && block.or.map(function (item) {
        return checkRule(item, data, results, options);
      }).some(Boolean);
    }

    return block.or.some(function (item) {
      return checkRule(item, data, results, options);
    });
  }

  var res = rule(block, data, options);

  if (res && res.name) {
    results[res.name] = res.valid;
  }

  return res.valid;
}

var getKey = function getKey(block, keys, options) {
  if (Object.prototype.hasOwnProperty.call(block, 'and')) return block.and.map(function (item) {
    return getKey(item, keys, options);
  });
  if (Object.prototype.hasOwnProperty.call(block, 'or')) return block.or.map(function (item) {
    return getKey(item, keys, options);
  });

  var _ref3 = options || {},
      prefix = _ref3.prefix;

  var path = (0, _typeof2["default"])(block) === 'object' && block.path ? block.path : Object.keys(block)[0];
  var valueBlock = block.path ? (0, _defineProperty2["default"])({}, path, block) : block;
  var res = (0, _utils.getPath)(path, prefix);

  var _getDefaultRule2 = (0, _utils.getDefaultRule)(valueBlock[path]),
      value = _getDefaultRule2.value;

  if (value && Object.prototype.hasOwnProperty.call(value, 'ref')) {
    keys[(0, _utils.getPath)(value.ref, prefix)] = true;
  }

  return keys[res] = true;
};

var getKeys = function getKeys(rules, options) {
  if (!rules) return null;
  var keys = {};
  var conditions = Array.isArray(rules) ? {
    and: rules
  } : rules;
  getKey(conditions, keys, options);
  return Object.keys(keys);
};

exports.getKeys = getKeys;

var _default = function _default() {
  var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var formValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var apply = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var options = arguments.length > 3 ? arguments[3] : undefined;

  if (rules && (0, _typeof2["default"])(rules) !== 'object' && !Array.isArray(rules)) {
    console.warn('Rules accept only array or object', rules);
    return [false];
  }
  /*   
    if (rules && typeof rules === 'object' && isEmpty(rules)) {
      console.warn('Rules is empty', rules)
    } 
  */


  if (rules) {
    var results = {};
    var conditions = Array.isArray(rules) ? {
      and: rules
    } : rules;
    var valid = checkRule(conditions, formValue, results, options);
    var resultsValid = Object.keys(results).filter(function (e) {
      return results[e] === apply;
    });
    var resultsInvalid = Object.keys(results).filter(function (e) {
      return results[e] !== apply;
    });
    return [valid === apply, resultsValid, resultsInvalid];
  }

  return [apply];
};

exports["default"] = _default;