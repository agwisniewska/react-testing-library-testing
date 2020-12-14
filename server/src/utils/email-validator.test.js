const {isEmailAllowed} = require('./email-validator');

const cases = [['asdasd@as.com', false], ['adam@warsaw.js', true], ['441@warsaw.js', false]];

describe('email validator', () => {
  test.each(cases)(
    "given %p returns %p",
    (arg, out) => {
      const result = isEmailAllowed(arg);
      expect(result).toBe(out);
    }
  )
})

