import _size from 'lodash/size';
import _intersection from 'lodash/intersection'
import _find from 'lodash/find'
import _isFunction from 'lodash/isFunction'
import { isEmpty, forceArray, forceNumber } from './utils'


// a: user input, b: rule value
const operators = {
  // equal boolean value
  //eqb: (a, b) => a === b,
  // TODO _isEmpty lodash bug with Date js
  ex: (a, b) => {
    return !isEmpty(a) === b
  },
  nex: (a, b) => {
    return !isEmpty(a) === !b
  },
  // is equal boolean (object not exist or false)
  nu: (a, b) => {
    return (!a || isEmpty(a)) === b
  },
  nnu: (a, b) => {
    return (!a || isEmpty(a)) === !b
  },
  // equals:
  eq: (a, b) => a === b,
  // not equals:
  neq: (a, b) => a !== b,
  // weak equals:
  weq: (a, b) => a == b,
  // not weak equals:
  nweq: (a, b) => a != b,
  // greater:
  gt: (a, b) => forceNumber(a) > parseFloat(b),
  // greater / equal:
  gte: (a, b) => forceNumber(a) >= parseFloat(b),
  // lower:
  lt: (a, b) => forceNumber(a) < parseFloat(b),
  // lower / equal:
  lte: (a, b) => forceNumber(a) <= parseFloat(b),
  // min / max lenght:
  mi: (a, b) => _size(a) > b,
  ma: (a, b) => _size(a) < b,
  min: (a, b) => _size(a) >= b,
  max: (a, b) => _size(a) <= b,
  len: (a, b) => _size(a) === _size(b),
  // in:
  in: (a, b) => forceArray(b).some((c) => _intersection(forceArray(a), forceArray(c)).length),
  nin: (a, b) => !forceArray(b).some((c) => _intersection(forceArray(a), forceArray(c)).length),
  all: (a, b) => forceArray(b).every((c) => _intersection(forceArray(a), forceArray(c)).length),
  nall: (a, b) => !forceArray(b).every((c) => _intersection(forceArray(a), forceArray(c)).length),
  // found in array
  find: (a, b) => !!_find(a, b),
  // contains
  con: (a, b) => forceArray(b).some((c) => typeof a === 'string' && a.indexOf(c) !== -1),
  coni: (a, b) => forceArray(b.toLowerCase()).some((c) => typeof a === 'string' && a.toLowerCase().indexOf(c) !== -1),
  // not contains
  ncon: (a, b) => forceArray(b).every((c) => typeof a === 'string' && a.indexOf(c) === -1),
  re: (a, b, opt) => forceArray(b).some((c) => (c instanceof RegExp ? c.test(a) : new RegExp(c, opt).test(a))),
  nre: (a, b, opt) => !forceArray(b).some((c) => (c instanceof RegExp ? c.test(a) : new RegExp(c, opt).test(a))),
  func: (a, b, opt, data) => (_isFunction(b) && b(a, data)),
  // typeof
  tof: (a, b) => typeof a === b
};

export default operators;