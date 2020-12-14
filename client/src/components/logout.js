import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from './auth';

export default function Logout() {
  const { logout } = useAuth();
  const [isLogoutSuccess, setLogoutStatus] = React.useState(false);
  React.useEffect(() => {
    async function onLogout() {
      try {
        await logout();
        setLogoutStatus(true);
      } catch(err) {
        console.log(err);
      }
     
    }

    onLogout();
  }, [logout]);

  if (isLogoutSuccess) {
    return <Redirect to="/" />;
  }
  return <div>Trwa wylogowywanie...</div>;
}
