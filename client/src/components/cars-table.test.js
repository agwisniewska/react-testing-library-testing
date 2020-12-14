import { fireEvent, waitForElementToBeRemoved, act, within, waitFor, render, getByText, queryByText, waitForElement } from '@testing-library/react';
import {renderWithRouter} from './utils/test.util';
import CarsTable from "./cars-table";
import { BrowserRouter, Route } from 'react-router-dom';
import * as api from "../api";

jest.mock('../api');


describe('cars table', () => {  
  test('should display cars table when there are cars', async () => {
    api.getCars = jest.fn(() => [{car_id: 1, model: 'astra'}]);

    const {getByText, queryByText, getByTestId, debug} = renderWithRouter(<CarsTable />);

    expect(getByText('Trwa ładowanie ...')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => queryByText('Trwa ładowanie ...'));
    expect(api.getCars).toHaveBeenCalledTimes(1);

    expect(getByTestId('car-1')).toBeInTheDocument();



  });

  test('should display message when there are no cars', async () => {
    api.getCars = jest.fn(() => null);

    const {getByText, queryByText, getByTestId, debug} = renderWithRouter(<CarsTable />);

    expect(getByText('Trwa ładowanie ...')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => queryByText('Trwa ładowanie ...'));
    //  Tp nie jest najlepsze zachowanie poniewa testuje konretną funkcje - nazwę 
    expect(api.getCars).toHaveBeenCalledTimes(1);

    expect(getByText('Zaden samochód nie jest dostępny.')).toBeInTheDocument();


  });


  test('should display cars table when there are cars', async () => {
    const car = {car_id: 1, model: 'astra'}
    const promise = Promise.resolve([car]);

    api.getCars = jest.fn(() => promise);

    api.rentCar = jest.fn();


    const {container, getByText: libGetByText, queryByText, getByTestId, debug} = render(<BrowserRouter>
      <CarsTable />
      <Route path="/rentals">Redirected to rentals</Route>
    </BrowserRouter>);

    expect(libGetByText('Trwa ładowanie ...')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => queryByText('Trwa ładowanie ...'));
    expect(api.getCars).toHaveBeenCalledTimes(1);

    const {getByRole, getByText} = within(getByTestId('car-1'));

    expect(getByText(car.car_id.toString())).toBeInTheDocument();

    fireEvent.click(getByRole('button'))

    //  Tp nie jest najlepsze zachowanie poniewa testuje konretną funkcje - nazwę 

    expect(api.rentCar).toHaveBeenCalledTimes(1);
    expect(api.rentCar).toHaveBeenCalledWith(car.car_id);


    await waitFor(() => promise)
    expect(container).toHaveTextContent(/Redirected to rentals/);

  });



});