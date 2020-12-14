import { fireEvent, getByLabelText, render } from '@testing-library/react'
import { useAuth } from "./auth";
import LoginForm from "./login-form";
import { Router } from 'react-router-dom'

import { createMemoryHistory } from 'history'

jest.mock("./auth", () => ({
  useAuth: jest.fn(),
}));

describe('login form', () => {
  let mockedLoginFunction = jest.fn();
  let history;

  beforeEach(() => {
    useAuth.mockImplementation(() => ({isAuthenticated: false, login: mockedLoginFunction, error: null}));

  })

  test('should have email field ', () => {
    const {getByLabelText} = render(<LoginForm/>)

    expect(getByLabelText('Email')).toBeInTheDocument();
  });

  test('should have password field', () => {
    const {getByLabelText} = render(<LoginForm/>)

    expect(getByLabelText('Hasło')).toBeInTheDocument();
  })

  test('should have submit button', () => {
    const {getByRole} = render(<LoginForm/>)

    expect(getByRole('button', {name: /zaloguj/i})).toBeInTheDocument();
  })

  test('should  call login function on submit form', () => {
    const {getByRole} = render(<LoginForm/>)
    const button = getByRole('button', {name: /zaloguj/i});

    fireEvent.click(button);

    expect(mockedLoginFunction).toHaveBeenCalledTimes(1);
  });

  test('should display error message if error occurs', () => {
    useAuth.mockImplementation(() => ({isAuthenticated: false, login: mockedLoginFunction, error: true}));
    const {getByText, debug} = render(<LoginForm/>)


    expect(getByText('Nieprawidłowy login lub hasło')).toBeInTheDocument();
  });

  test('should redirects to cars component if isAuthenticated flag is true ', () => {

    history = createMemoryHistory();

    useAuth.mockImplementation(() => ({ isAuthenticated: true }));

    const {debug} = render(
      <Router history={history}>
        <LoginForm />
      </Router>
    )
    expect(history.location.pathname).toEqual('/')
  });
})