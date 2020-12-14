import {fireEvent, render} from '@testing-library/react';
import UserProfileName from "./user-profile-name";

test('props name should be visible in component if props passed', () => {

  const props = { user: {
    name: 'Agata',
    isVip: true
  }}
  const { getByText } = render(<UserProfileName {...props}/>);
  const element = getByText(props.user.name)
  
  expect(element).toHaveTextContent(props.user.name);
});


test('is user is vip there is a rocket icon ', () => {
  const props = { user: {
    name: 'Agata',
    isVip: true
  }}
  const { debug, getByTestId } = render(<UserProfileName {...props} />);
  const icon = getByTestId('profile-icon');

  expect(icon).toHaveTextContent('🚀')

  fireEvent.click(icon);

  expect(icon).toHaveTextContent('🛸');
});

