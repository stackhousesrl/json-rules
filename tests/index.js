/* eslint-disable */
const chai = require('chai');
const jrules = require('../src').default;
const getKeys = require('../src').getKeys
const expect = chai.expect;

describe('Operators', function () {

  describe('ex', function () {

    it('Error op', function () {
      try {
        const isValid = jrules({ a: { aa: true } }, { a: 'bbb' })
      } catch (error) {
        expect(error).to.be.exist;
      }
    });

    it('valid with bool', function () {
      const [isValid] = jrules({ a: true }, { a: 'bbb' })
      expect(isValid).to.be.true;
    });

    it('valid with bool [true]', function () {
      const [isValid] = jrules({ a: true }, { b: 'bbb' })
      expect(isValid).to.be.false;
    });

    it('not valid with bool [false]', function () {
      const [isValid] = jrules({ a: false }, { a: 'bbb' })
      expect(isValid).to.be.false;
    });




    it('valid with bool', function () {
      const [isValid] = jrules({ a: true }, { a: true })
      expect(isValid).to.be.true;
    });

    it('valid with bool 2', function () {
      const [isValid] = jrules({ a: { ex: true } }, { a: false })
      expect(isValid).to.be.true;
    });

    it('valid with !!', function () {
      const [isValid] = jrules({ a: '!!' }, { a: 'b' })
      expect(isValid).to.be.true;
    });

    it('not valid with !!', function () {
      const [isValid] = jrules({ a: '!!' }, { b: 'b' })
      expect(isValid).to.be.false;
    });

    it('valid with !!!', function () {
      const [isValid] = jrules({ a: '!!!' }, { b: 'b' })
      expect(isValid).to.be.true;
    });

    it('not valid with !!!', function () {
      const [isValid] = jrules({ a: '!!!' }, { a: 'b' })
      expect(isValid).to.be.false;
    });

    it('valid with op', function () {
      const [isValid] = jrules({ a: { ex: true } }, { a: 'b' })
      expect(isValid).to.be.true;
    });

    it('valid date with op', function () {
      const [isValid] = jrules({ a: { ex: true } }, { a: new Date() })
      expect(isValid).to.be.true;
    });

    it('empty object with op', function () {
      const [isValid] = jrules({ a: { ex: true } }, { a: {} })
      expect(isValid).to.be.false;
    });

    it('empty array with op', function () {
      const [isValid] = jrules({ a: { ex: true } }, { a: [] })
      expect(isValid).to.be.false;
    });

    it('valid with op', function () {
      const [isValid] = jrules({ a: { ex: false } }, { a: undefined })
      expect(isValid).to.be.true;
    });

    it('valid with op exf', function () {
      const [isValid] = jrules({ a: { nu: true } }, {})
      expect(isValid).to.be.true;
    });

    it('valid with op exf', function () {
      const [isValid] = jrules({ a: { nu: true } }, { a: false })
      expect(isValid).to.be.true;
    });

    it('valid with op exf', function () {
      const [isValid] = jrules({ a: { nu: false } }, { a: 'gino' })
      expect(isValid).to.be.true;
    });

    it('valid with op', function () {
      const [isValid] = jrules({ a: { ex: false } }, { a: false })
      expect(isValid).to.be.false;
    });

    it('valid not exsist with op', function () {
      const [isValid] = jrules({ a: { ex: false } }, { b: 'b' })
      expect(isValid).to.be.true;
    });


    it('not valid with op', function () {
      const [isValid] = jrules({ a: { ex: true } }, { b: 'b' })
      expect(isValid).to.be.false;
    });

    it('not valid with op ____notExistsFieldValue', function () {
      const [isValid] = jrules({
        "____notExistsFieldValue": {
          "nex": true,
        }
      }, { b: 'b' })
      expect(isValid).to.be.true;
    });

    it('not valid with op ____notExistsFieldValue!', function () {
      const [isValid] = jrules({
        "____notExistsFieldValue": {
          "ex": false,
        }
      }, { b: 'b' })
      expect(isValid).to.be.true;
    });

  });

  describe('eq', function () {
    it('valid', function () {
      const [isValid] = jrules({ a: 'b' }, { a: 'b', b: 'v' })
      expect(isValid).to.be.true;
    });
    it('valid with op', function () {
      const [isValid] = jrules({ a: { eq: 'b' } }, { a: 'b' })
      expect(isValid).to.be.true;
    });

    it('valid AND with op', function () {
      const [isValid] = jrules([
        { andrea: 'b' },
        { carla: 'c' }
      ],
        { andrea: 'b', carla: 'c' })
      expect(isValid).to.be.true;
    });

    it('valid AND with op', function () {
      const [isValid] = jrules({
        or: [
          { andrea: 'b' },
          { carla: 'c' }
        ]
      },
        { andrea: 'b', carla: 'cc' })
      expect(isValid).to.be.true;
    });

    it('!valid AND with op', function () {
      const [isValid] = jrules({
        or: [
          { andrea: 'b' },
          { carla: 'c' }
        ]
      },
        { andrea: 'bc', carla: 'cc' })
      expect(isValid).to.be.false;
    });

    it('valid AND with op', function () {
      const [isValid] = jrules({
        and: [
          { andrea: 'b' },
          { or: [{ carla: 'cc' }, { carla: 'zz' }] }
        ]
      },
        { andrea: 'b', carla: 'zz' })
      expect(isValid).to.be.true;
    });

    it('valid AND with op', function () {
      const [isValid] = jrules({
        or: [
          { andrea: 'bbbbbb' },
          { and: [{ carla: 'cc' }, { jess: 'zz' }] }
        ]
      },
        { andrea: 'b', carla: 'cc', jess: 'zz' })
      expect(isValid).to.be.true;
    });

    it('valid not equal  with op', function () {
      const [isValid] = jrules({ a: { neq: 'b' } }, { a: 'c' })
      expect(isValid).to.be.true;
    });

    it('valid not equal  with op', function () {
      const [isValid] = jrules({ a: { neq: 'b' } }, { a: 'b' })
      expect(isValid).to.be.false;
    });

    it('not valid', function () {
      const [isValid] = jrules({ a: 'c' }, { a: 'b' })
      expect(isValid).to.be.false;
    });

    it('valid number', function () {
      const [isValid] = jrules({ a: { eqn: '1' } }, { a: 1 })
      expect(isValid).to.be.true;
    });

  });

  describe('eqb', function () {
    it('valid', function () {
      const [isValid] = jrules({ a: true }, { a: true })
      expect(isValid).to.be.true;
    });
    it('valid', function () {
      const [isValid] = jrules({ a: { eq: true } }, { a: true })
      expect(isValid).to.be.true;
    });

    it('not valid', function () {
      const [isValid] = jrules({ a: { eq: true } }, { a: false })
      expect(isValid).to.be.false;
    });

    it('not valid', function () {
      const [isValid] = jrules({ a: { eq: true } }, { a: 'b' })
      expect(isValid).to.be.false;
    });
  });


  describe('in', function () {

    it('valid', function () {
      const [isValid] = jrules({ a: [1] }, { a: [1, 2, 3] })
      expect(isValid).to.be.true;
    });

    it('valid', function () {
      const [isValid] = jrules({ a: ['a'] }, { a: 'a' })
      expect(isValid).to.be.true;
    });

    it('valid', function () {
      const [isValid] = jrules({ a: { in: 'a' } }, { a: 'a' })
      expect(isValid).to.be.true;
    });

    it('not valid', function () {
      const [isValid] = jrules({ a: { nin: 'b' } }, { a: 'a' })
      expect(isValid).to.be.true;
    });

    it('not valid', function () {
      const [isValid] = jrules({ a: { in: 'b' } }, { a: 'a' })
      expect(isValid).to.be.false;
    });

    it('valid', function () {
      const [isValid] = jrules({ a: [1, 2] }, { a: [1, 2, 3] })
      expect(isValid).to.be.true;
    });

    it('valid', function () {
      const [isValid] = jrules({ a: [1, 2] }, { a: 1 })
      expect(isValid).to.be.true;
    });

    it('valid', function () {
      const [isValid] = jrules({ a: { in: 1 } }, { a: 1 })
      expect(isValid).to.be.true;
    });

    it('valid not in', function () {
      const [isValid] = jrules({ a: { nin: [5] } }, { a: [1, 2, 3] })
      expect(isValid).to.be.true;
    });

    it('valid not in', function () {
      const [isValid] = jrules({ a: { nin: [1] } }, { a: [1, 2, 3] })
      expect(isValid).to.be.false;
    });

    it('valid not in', function () {
      const [isValid] = jrules({ a: { nin: [1, 2] } }, { a: [1, 2, 3] })
      expect(isValid).to.be.false;
    });

    it('not valid', function () {
      const [isValid] = jrules({ a: { in: 4 } }, { a: [1, 2, 3] })
      expect(isValid).to.be.false;
    });

    it('not valid', function () {
      const [isValid] = jrules({ a: { in: [4, 5] } }, { a: [1, 2, 3] })
      expect(isValid).to.be.false;
    });

    it('not valid', function () {
      const [isValid] = jrules({ a: { in: 1 } }, { a: 2 })
      expect(isValid).to.be.false;
    });

  });

  describe('all', function () {

    it('valid', function () {
      const [isValid] = jrules({ a: { all: [1, 2] } }, { a: [1, 2] })
      expect(isValid).to.be.true;
    });

    it('not valid', function () {
      const [isValid] = jrules({ a: { all: [1, 2, 3] } }, { a: [1, 2] })
      expect(isValid).to.be.false;
    });

    it('not valid', function () {
      const [isValid] = jrules({ a: { all: [1, 2, 3] } }, { a: [] })
      expect(isValid).to.be.false;
    });

    it('not valid', function () {
      const [isValid] = jrules({ a: { nall: [1, 2, 3] } }, { a: [1, 2] })
      expect(isValid).to.be.true;
    });

    it('not valid', function () {
      const [isValid] = jrules({ a: { nall: [1, 2, 3] } }, { a: [] })
      expect(isValid).to.be.true;
    });


    it('valid', function () {
      const [isValid] = jrules({
        and: [
          { a: { all: [1, 2] } },
          { b: { all: [3, 4] } },
        ]
      },
        {
          a: [1, 2],
          b: [3, 4]
        })
      expect(isValid).to.be.true;
    });

  });

  describe('lt', function () {

    it('valid', function () {
      const [isValid] = jrules({ a: { gt: 1 } }, { a: 4 })
      expect(isValid).to.be.true;
    });

    it('valid string number', function () {
      const [isValid] = jrules({ a: { gte: 1 } }, { a: '4' })
      expect(isValid).to.be.true;
    });

    it('valid', function () {
      const [isValid] = jrules({ a: { gt: 1 } }, { a: [1, 2] })
      expect(isValid).to.be.true;
    });

    it('valid', function () {
      const [isValid] = jrules({ a: { gt: 1 } }, { a: 'ab' })
      expect(isValid).to.be.true;
    });

    it('valid', function () {
      const [isValid] = jrules({ "a.b": { gte: "3" } }, { a: { b: ['ab', 'asd', '123'] } })
      expect(isValid).to.be.true;
    });


    it('valid', function () {
      const [isValid] = jrules({ a: { lt: 3 } }, { a: 'ab' })
      expect(isValid).to.be.true;
    });

    it('valid', function () {
      const [isValid] = jrules({ a: { lt: 3 } }, { a: [1, 2] })
      expect(isValid).to.be.true;
    });

    it('not valid', function () {
      const [isValid] = jrules({ a: { lt: 3 } }, { a: [1, 2, 3, 4] })
      expect(isValid).to.be.false;
    });

    it('valid', function () {
      const [isValid] = jrules({ a: { gte: 0 } }, { a: [] })
      expect(isValid).to.be.true;
    });

  });

  describe('mi', function () {

    it('valid', function () {
      const [isValid] = jrules({ a: { min: 1 } }, { a: ['a'] })
      expect(isValid).to.be.true;
    });

  });


  describe('test', function () {

    it('path field', function () {
      const [isValid] = jrules([
        {
          op: 'ex',
          path: 'b.c',
          value: true
        }],
        { b: { c: 'bb' } })
      expect(isValid).to.be.true;
    })

    it('prefix field', function () {
      const [isValid] = jrules([
        {
          op: 'ex',
          path: 'b.c',
          value: true
        }],
        { AAAA: { b: { c: 'bb' } } }, true, { prefix: 'AAAA' })
      expect(isValid).to.be.true;
    })

    it('skip prefix for only field', function () {
      const [isValid] = jrules([
        {
          op: 'ex',
          path: 'b.c',
          value: true
        },
        { '^BBBB.name': 'gino' }
      ],
        {
          AAAA: {
            b: { c: 'bb' }
          },
          BBBB: {
            name: 'gino'
          }
        }, true, { prefix: 'AAAA' })
      expect(isValid).to.be.true;
    })

    it('get keys', function () {
      const keys = getKeys([
        {
          op: 'ex',
          path: 'b.c',
          value: 'bb'
        },
        { '^BBBB.name': 'gino' }
      ], { prefix: 'AAAA' })

      expect(keys).to.eql(['AAAA.b.c', 'BBBB.name']);
    })

    /*   it('test find', function () {
        const [active] = jrules([
          {
            and: [
              { "role": { in: ['BenchManager'] } },
              {
                "status": { in: ["APPROVED"] },
              }
            ]
          },
          {
            "status": { nin: ["INACTIVE", "CLOSED"] },
          },
          { "guid": { "ex": true } },
          {
            or: [
              { "partnumber": true },
              { "a2mac1": true }
            ]
          }
        ],
          {
            role: "BenchManager2",
            status: "APPROVED",
            xstatus: "REJECTED",
            guid: "1111",
            partnumber: "1111",
          },
          true)
        expect(active).to.be.true;
      })
   */
    it('test fer', function () {
      const [error] = jrules([
        {
          and: [
            { guid: true }
          ]
        },
        /* {
          "guid": [{ "ex": true }]
        }, */
      ],
        {
          status: "APPROVED",
          guid: "xxx",
        },
      )
      expect(error).to.be.true;
    })

    it('test cerri', function () {
      const [fieldDisabled] = jrules({
        "actions": ["dismiss", "create-dismiss"],
      },
        {
          actions: 'dismiss'
        },
        true
      )
      expect(fieldDisabled).to.be.true;
    })

    it('test giornaliera dates', function () {
      const [found] = jrules({
        "and": [
          {
            or: [
              {
                "id": { "ex": false },
              }, {
                "action": "dismiss"
              }
            ]
          },
          {
            "disabled": { "eq": false },
          }
        ]
      },
        {
          id: 1,
          action: "dismiss",
          disabled: false
        },
        true
      )
      expect(found).to.be.true;
    })

    it('test ref', function () {
      const [found] = jrules({
        "or": [
          /* {
            "search": { ex: true },
          }, */
          {
            "name": { "con": 'and' },
          }
        ]
      },
        {
          search: 'and',
          name: "andrea",
        },
        true
      )
      expect(found).to.be.true;
    })

    it('test time range', function () {

      const rulesByType = {
        time: {
          and: [
            { hours: { gte: { ref: 'from' } } },
            { hours: { lte: { ref: 'to' } } }
          ]
        }
      }

      const [found] = jrules(
        rulesByType.time,
        {
          hours: 13,
          from: '12',
          to: "20",
        }
      )
      expect(found).to.be.true;
    })

    it('test cond', function () {

      const rulesByType = [
        {
          hours: { eq: 13, name: 'AAAA' },
        },
        {
          or: [
            { from: { eq: '12', name: 'BBBB' } },
          ]
        },
      ]

      const [found, results] = jrules(
        rulesByType,
        {
          hours: 13,
          from: '12',
          to: "20",
        }
      )
      expect(found).to.be.true;
    })

    it('test #', function () {

      const rulesByType = [
        {
          '#dati.hours': { eq: 13, name: 'AAAA' },
        },
      ]

      const [found, results] = jrules(
        rulesByType,
        {
          app: {
            dati: {
              hours: 13,
            }
          }
        },
        true,
        {
          prefix: 'app.dati'
        }
      )
      expect(found).to.be.true;
    })

    it('test func', function () {

      const rulesByType = [
        {
          '#dati.hours': {
            func: (value, b) => {
              return value === 13
            }
          },
        },
      ]

      const [found, results] = jrules(
        rulesByType,
        {
          app: {
            dati: {
              hours: 13,
            }
          }
        },
        true,
        {
          prefix: 'app.dati'
        }
      )
      expect(found).to.be.true;
    })

    it('valid with bool ex [true]', function () {
      const [isValid] = jrules({ a: { ex: true } }, { a: true })
      expect(isValid).to.be.true;
    });

    /*     it('not valid with bool ex [false]', function () {
          const [isValid] = jrules({ a: { eq: true } }, { a: false })
          expect(isValid).to.be.true;
        }); */

    it('test flow', function () {
      const [isValid] = jrules([
        {
          '^hasError': { eq: false }
        },
        {
          or: [
            {
              [`^app.nextDisable`]: { ex: false }
            },
            {
              [`^app.nextDisable`]: { eq: false }
            }
          ]
        }
      ],
        {
          app: {
            nextDisable: false
          },
          hasError: false
        })

      expect(isValid).to.be.true;
    });

  })
});