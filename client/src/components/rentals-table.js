import * as React from 'react';
import * as api from '../api';

export default function RentalsTable() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    const rentals = await api.getRentals();
    setData(rentals);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Samochód</th>
          <th>Kaucja</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(rental => {
          return (
            <tr key={rental.rental_id}>
              <td>{rental.rental_id}</td>
              <td role="car_actions">
                {rental.car_id}{' '}
                <button
       
                  onClick={() => api.takeCar(rental.rental_id).then(fetch)}
                >
                  wypozycz samochód
                </button>
                <button
             
                  onClick={() => api.returnCar(rental.rental_id).then(fetch)}
                >
                  zwroc samochód
                </button>
              </td>
              <td role="deposit_actions">
                {rental.deposit}{' '}
                <button

                  onClick={() => api.payDeposit(rental.rental_id).then(fetch)}
                >
                  oplac samochód
                </button>
                <button
                
                  onClick={() =>
                    api.returnDeposit(rental.rental_id).then(fetch)
                  }
                >
                  odbierz samochód
                </button>
              </td>
              <td>{rental.state}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
