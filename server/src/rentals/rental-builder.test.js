const Rental = require('./rental');
const RentalBuilder = require('./rental-builder');

test('should return rental ', () => {
  const rental = new RentalBuilder()
    .rentBy(1)
    .selectCar(1)
    .depositAmount(5000)
    .inState(Rental.RESERVED)
    .build();

  expect(rental).toMatchSnapshot();
});

test('should return rental ', () => {

  //  wzorce projektowe builder -> zweryfikować bo fajne rozwiązanie
  const rental = new RentalBuilder().rentBy(1);


  //  obsluga kazdego mozliwego stanu


  //  rental.depositAmount();


  expect(rental).toMatchInlineSnapshot(`
    RentalBuilder {
      "client_id": 1,
      "rental_id": 1,
    }
  `);
});
