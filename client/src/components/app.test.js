import {renderWithRouter} from './utils/test.util';
import App from "./app";
import { useAuth } from "./auth";

jest.mock("./auth", () => ({
  useAuth: jest.fn(),
}));

jest.mock('./nav-bar', () => ({
  __esModule: true, // this property makes it work
  default: () => <div> Navbar </div>
}));


describe('routes redirections', () => {

  test('should redirect to login page if user is not authenticated', () => {
    useAuth.mockImplementation(() => ({isAuthenticated: false}));

    const {getByText } = renderWithRouter(<App />)
    expect(getByText('Wprowadź dane:')).toBeInTheDocument()
  });

  test('should redirect to cars component if user is authenticated', async () => {
    useAuth.mockImplementation(() => ({isAuthenticated: true}));

    const {getByText} = renderWithRouter(<App />, {route: '/cars'});

    expect(getByText('Trwa ładowanie ...')).toBeInTheDocument()

  });

  test('should display rentals component if user go to /rentals', () => {
    useAuth.mockImplementation(() => ({isAuthenticated: true}));

    const {getByText} = renderWithRouter(<App />, {route: '/rentals'});

    expect(getByText('Samochód')).toBeInTheDocument();
    expect(getByText('Kaucja')).toBeInTheDocument();
    expect(getByText('Status')).toBeInTheDocument();
    expect(getByText('Id')).toBeInTheDocument();
  });

  test('should display login component if user go to /login', () => {
    useAuth.mockImplementation(() => ({isAuthenticated: false, login: jest.fn(), error: null}));

    const {getByText} = renderWithRouter(<App />, {route: '/login'});
    expect(getByText('Wprowadź dane:')).toBeInTheDocument()
  });
})
