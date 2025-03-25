import { Navigate, Outlet } from 'react-router-dom';
import { routes } from './Router';
import { useAuth } from '../hooks/useAuth';
import { Menu } from '../components/menu';

const PrivateRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to={routes.signIn.path} />;
  }

  return (
    <div className="flex">
      <Menu />
      <div className="w-[100%]">
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateRoute;
