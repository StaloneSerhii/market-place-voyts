import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAuthStatus } from './authPer/auth-selector';

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(getAuthStatus);
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};