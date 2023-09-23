import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthStatus } from './authPer/auth-selector';

export const AdmRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(getAuthStatus);
  const isSuperStatus = useSelector(state=>state.persistedReducerAdd.auth.user.status);
  return isLoggedIn && isSuperStatus === 'superuser' ? Component : <Navigate to={redirectTo} />;
};