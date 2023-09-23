import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthStatus } from './authPer/auth-selector';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(getAuthStatus);
  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};