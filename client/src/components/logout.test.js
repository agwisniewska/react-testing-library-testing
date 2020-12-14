import { waitForElementToBeRemoved } from '@testing-library/react';
import Logout from './logout';
import {useAuth} from './auth';
import { renderWithRouter } from './utils/test.util';

const mockLogoutFn = jest.fn();

jest.mock("./auth", () => ({
  useAuth: jest.fn(),
}));

describe('logout', () => {
  test("should redirect to / and display logging out message", async () => {

    useAuth.mockImplementation(() => ({ logout: mockLogoutFn }));

    const { getByText, queryByText } = renderWithRouter(<Logout />);

    expect(mockLogoutFn).toHaveBeenCalledTimes(1);

    expect(getByText('Trwa wylogowywanie...')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => queryByText('Trwa wylogowywanie...'));

    expect(queryByText('Trwa wylogowywanie...')).not.toBeInTheDocument();
  });
})