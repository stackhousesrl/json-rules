"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _size2 = _interopRequireDefault(require("lodash/size"));

var _intersection2 = _interopRequireDefault(require("lodash/intersection"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _utils = require("./utils");

var operators = {
  // equal boolean value
  //eqb: (a, b) => a === b,
  // TODO _isEmpty lodash bug with Date js
  ex: function ex(a, b) {
    return !(0, _utils.isEmpty)(a) === b;
  },
  nex: function nex(a, b) {
    return !(0, _utils.isEmpty)(a) === !b;
  },
  // is equal boolean (object not exist or false)
  nu: function nu(a, b) {
    return (!a || (0, _utils.isEmpty)(a)) === b;
  },
  nnu: function nnu(a, b) {
    return (!a || (0, _utils.isEmpty)(a)) === !b;
  },
  // equals:
  eq: function eq(a, b) {
    return a === b;
  },
  // not equals:
  neq: function neq(a, b) {
    return a !== b;
  },
  // weak equals:
  weq: function weq(a, b) {
    return a == b;
  },
  // not weak equals:
  nweq: function nweq(a, b) {
    return a != b;
  },
  // greater:
  gt: function gt(a, b) {
    return (0, _utils.forceNumber)(a) > parseFloat(b);
  },
  // greater / equal:
  gte: function gte(a, b) {
    return (0, _utils.forceNumber)(a) >= parseFloat(b);
  },
  // lower:
  lt: function lt(a, b) {
    return (0, _utils.forceNumber)(a) < parseFloat(b);
  },
  // lower / equal:
  lte: function lte(a, b) {
    return (0, _utils.forceNumber)(a) <= parseFloat(b);
  },
  // min / max lenght:
  mi: function mi(a, b) {
    return (0, _size2["default"])(a) > b;
  },
  ma: function ma(a, b) {
    return (0, _size2["default"])(a) < b;
  },
  min: function min(a, b) {
    return (0, _size2["default"])(a) >= b;
  },
  max: function max(a, b) {
    return (0, _size2["default"])(a) <= b;
  },
  len: function len(a, b) {
    return (0, _size2["default"])(a) === (0, _size2["default"])(b);
  },
  // in:
  "in": function _in(a, b) {
    return (0, _utils.forceArray)(b).some(function (c) {
      return (0, _intersection2["default"])((0, _utils.forceArray)(a), (0, _utils.forceArray)(c)).length;
    });
  },
  nin: function nin(a, b) {
    return !(0, _utils.forceArray)(b).some(function (c) {
      return (0, _intersection2["default"])((0, _utils.forceArray)(a), (0, _utils.forceArray)(c)).length;
    });
  },
  all: function all(a, b) {
    return (0, _utils.forceArray)(b).every(function (c) {
      return (0, _intersection2["default"])((0, _utils.forceArray)(a), (0, _utils.forceArray)(c)).length;
    });
  },
  nall: function nall(a, b) {
    return !(0, _utils.forceArray)(b).every(function (c) {
      return (0, _intersection2["default"])((0, _utils.forceArray)(a), (0, _utils.forceArray)(c)).length;
    });
  },
  // found in array
  find: function find(a, b) {
    return !!(0, _find2["default"])(a, b);
  },
  // contains
  con: function con(a, b) {
    return (0, _utils.forceArray)(b).some(function (c) {
      return typeof a === 'string' && a.indexOf(c) !== -1;
    });
  },
  coni: function coni(a, b) {
    return (0, _utils.forceArray)(b.toLowerCase()).some(function (c) {
      return typeof a === 'string' && a.toLowerCase().indexOf(c) !== -1;
    });
  },
  // not contains
  ncon: function ncon(a, b) {
    return (0, _utils.forceArray)(b).every(function (c) {
      return typeof a === 'string' && a.indexOf(c) === -1;
    });
  },
  re: function re(a, b, opt) {
    return (0, _utils.forceArray)(b).some(function (c) {
      return c instanceof RegExp ? c.test(a) : new RegExp(c, opt).test(a);
    });
  },
  nre: function nre(a, b, opt) {
    return !(0, _utils.forceArray)(b).some(function (c) {
      return c instanceof RegExp ? c.test(a) : new RegExp(c, opt).test(a);
    });
  },
  func: function func(a, b, opt, data) {
    return (0, _isFunction2["default"])(b) && b(a, data);
  },
  // typeof
  tof: function tof(a, b) {
    return (0, _typeof2["default"])(a) === b;
  }
};
var _default = operators;
exports["default"] = _default;