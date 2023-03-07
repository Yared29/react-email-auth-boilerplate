import { Outlet, Navigate } from 'react-router-dom';
import { isEmpty } from './isEmpty';

const PublicRoutes = () => {
  let user = localStorage.getItem('user');

  return isEmpty(user) ? <Outlet /> : <Navigate to='/chat' />;
};

export default PublicRoutes;
