const Rental  = require('./rental');

test('should change state to deposit path ', () => {

  const rental = new Rental(111, 231, 121, 1000);

  rental.payDeposit();

  expect(rental.getState()).toBe(Rental.DEPOSIT_PAID);
  
});