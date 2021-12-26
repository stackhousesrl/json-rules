import _get from 'lodash/get';
import operators from './operators';
import { getDefaultRule, getPath } from './utils';

function rule(val, data, options) {
  const { prefix } = options || {}
  const path = val.path || Object.keys(val)[0];
  const valueBlock = val.path ? { [path]: val } : val;
  const pathWithPrefix = getPath(path, prefix)
  const valueForKey = _get(data, pathWithPrefix, undefined);
  const { name } = _get(valueBlock, [path], {})
  const { op, value, opt } = getDefaultRule(valueBlock[path]);
  const valueRef = value && (Object.prototype.hasOwnProperty.call(value, 'ref')
    ? _get(data, getPath(value.ref, prefix), undefined)
    : value);
  const valueTransformed = valueRef && (Object.prototype.hasOwnProperty.call(value, 'transform') ? value.transform(valueRef) : valueRef);

  if (!operators[op]) {
    throw new Error('Error missing operator:' + op)
  }

  const valid = operators[op] && operators[op](valueForKey, valueTransformed, opt, data);
  return { valid, name: pathWithPrefix + '___' + (name || op) }
}

function checkRule(block, data, results, options) {
  if (Object.prototype.hasOwnProperty.call(block, 'and')) {
    if (options && options.checkAll) {
      return block.and.map((item) => checkRule(item, data, results, options)).every(Boolean);
    }
    return block.and.every((item) => checkRule(item, data, results, options));
  }

  if (Object.prototype.hasOwnProperty.call(block, 'or')) {
    if (options && options.checkAll) {
      return block.and.map((item) => checkRule(item, data, results, options)).some(Boolean);
    }
    return block.or.some((item) => checkRule(item, data, results, options));
  }

  const res = rule(block, data, options);

  if (res && res.name) {
    results[res.name] = res.valid
  }

  return res.valid
}

const getKey = (block, keys, options) => {
  if (Object.prototype.hasOwnProperty.call(block, 'and'))
    return block.and.map((item) => getKey(item, keys, options));

  if (Object.prototype.hasOwnProperty.call(block, 'or'))
    return block.or.map((item) => getKey(item, keys, options));

  const { prefix } = options || {}
  const path = typeof block === 'object' && block.path ? block.path : Object.keys(block)[0];
  const valueBlock = block.path ? { [path]: block } : block
  const res = getPath(path, prefix);
  const { value } = getDefaultRule(valueBlock[path]);

  if (value && Object.prototype.hasOwnProperty.call(value, 'ref')) {
    keys[getPath(value.ref, prefix)] = true
  }

  return keys[res] = true
}

export const getKeys = (rules, options) => {
  if (!rules) return null
  const keys = {}
  const conditions = Array.isArray(rules) ? { and: rules } : rules;
  getKey(conditions, keys, options)
  return Object.keys(keys)
}

export default (rules = null, formValue = {}, apply = true, options) => {
  if (rules && (typeof rules !== 'object' && !Array.isArray(rules))) {
    console.warn('Rules accept only array or object', rules)
    return [false]
  }

  /*   
    if (rules && typeof rules === 'object' && isEmpty(rules)) {
      console.warn('Rules is empty', rules)
    } 
  */

  if (rules) {
    const results = {}
    const conditions = Array.isArray(rules) ? { and: rules } : rules;
    const valid = checkRule(conditions, formValue, results, options);
    const resultsValid = Object.keys(results).filter(e => results[e] === apply)
    const resultsInvalid = Object.keys(results).filter(e => results[e] !== apply)
    return [valid === apply, resultsValid, resultsInvalid];
  }
  return [apply];
};
