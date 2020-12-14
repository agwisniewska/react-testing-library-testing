import {renderWithRouter} from './utils/test.util';
import RentalsTable from "./rentals-table";
import * as api from "../api";
import { fireEvent, getByText, waitFor } from '@testing-library/react';


jest.mock('../api');


let mockedItems;
let promise;
beforeEach(() => {
  mockedItems = [{rental_id: '1', car_id: '2', state: 'dostępny', deposit: '2000'}];
  promise = Promise.resolve(mockedItems);
  api.getRentals = jest.fn(() => promise);
})

afterEach(() => {
  jest.resetAllMocks();
})

describe.only('rentals table', () => {
 test('should render rentals table', async () => {
  const {getByText} = renderWithRouter(<RentalsTable />);
  await waitFor(() => promise);

  mockedItems.forEach(item => {
    expect(getByText(item.car_id)).toBeInTheDocument();
    expect(getByText(item.rental_id)).toBeInTheDocument();
    expect(getByText(item.state)).toBeInTheDocument();
    expect(getByText(item.deposit)).toBeInTheDocument()
   })
  })

  test('should call takeCar if user clicks `wypozycz samochód` button', async () => {
    const {getByRole} = renderWithRouter(<RentalsTable />);
    await waitFor(() => promise);

    const mockTakeCar = jest.fn(() => Promise.resolve(null));
    api.takeCar = mockTakeCar;

    const button = getByRole('button', {name: 'wypozycz samochód'})
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockTakeCar).toHaveBeenCalledTimes(1);
    expect(mockTakeCar).toHaveBeenCalledWith("1");

    await waitFor(() => promise);


  })

  test('should call returnCar if user clicks `zwróc samochód` button', async() => {
    const {getByRole} = renderWithRouter(<RentalsTable />);
    await waitFor(() => promise);

    const mockReturnCar = jest.fn(() => Promise.resolve(null));
    api.returnCar = mockReturnCar;

    const button = getByRole('button', {name: 'zwroc samochód'})
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockReturnCar).toHaveBeenCalledTimes(1);
    expect(mockReturnCar).toHaveBeenCalledWith("1");
    await waitFor(() => promise);

  })

  test('should call payDeposit if user click `oplać samochod` button', async () => {
    const {getByRole} = renderWithRouter(<RentalsTable />);
    await waitFor(() => promise);

    const mockPayDeposit = jest.fn(() => Promise.resolve(null));
    api.payDeposit = mockPayDeposit;

    const button = getByRole('button', {name: 'oplac samochód'})
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockPayDeposit).toHaveBeenCalledTimes(1);
    expect(mockPayDeposit).toHaveBeenCalledWith("1");

    await waitFor(() => promise);

  })

  test('should call payDeposit if user click `odbierz samochód` button', async () => {
    const {getByRole} = renderWithRouter(<RentalsTable />);
    await waitFor(() => promise);


    const mockReturnDeposit = jest.fn(() => Promise.resolve(null));
    api.returnDeposit = mockReturnDeposit;

    const button = getByRole('button', {name: 'odbierz samochód'})
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockReturnDeposit).toHaveBeenCalledTimes(1);
    expect(mockReturnDeposit).toHaveBeenCalledWith("1");

    await waitFor(() => promise);

  })

})