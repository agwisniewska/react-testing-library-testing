const {checkSignIn} = require('./auth-middleware');
const createError = require('http-errors');

// jest.mock('http-errors', () => ({
//     ...jest.requireActual('http-errors'),
//     createError: jest.fn()
//   }));

test('should ', () => {
  const req = {session: {user: {}}}
  const res = jest.fn();
  const next = jest.fn();
  checkSignIn(req, res, next);

  expect(next).toHaveBeenCalledTimes(1);
  expect(next).toHaveBeenCalledWith();
});

test('another', () => {
  const req = null;
  const res = jest.fn();
  const error = jest.fn();

  const next = jest.fn();
  
  checkSignIn(req, res, next);

  expect(next).toHaveBeenCalledTimes(1);
  expect(next).toHaveBeenCalledWith(createError(401));
})