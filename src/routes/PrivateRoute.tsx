import { Navigate, Outlet } from "react-router-dom";
import { routes } from "./Router";
import { useAuth } from "../hooks/useAuth";
import { HeaderMenu } from "../components/header-menu";

const PrivateRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to={routes.signIn.path} />;
  }

  return (
    <div className="w-[100%]">
      <HeaderMenu />
      <Outlet />
    </div>
  );
};

export default PrivateRoute;
