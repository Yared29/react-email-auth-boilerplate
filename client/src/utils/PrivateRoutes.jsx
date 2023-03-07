import { Outlet, Navigate } from 'react-router-dom';
import { isEmpty } from './isEmpty';

const PrivateRoutes = () => {
  let user = localStorage.getItem('user');
  return !isEmpty(user) ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
