import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/private/Home";
import PrivateRoute from "./PrivateRoute";
import { SignIn } from "../pages/public/SignIn";

type RouteNode = {
  path: string;
  params?: string[];
  routes?: Record<string, RouteNode>;
};

const createRoutes = <T extends Record<string, RouteNode>>(r: T) => r;

export const routes = createRoutes({
  home: { path: "/" },
  signIn: { path: "/login" },
});

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to={routes.signIn.path} />} />
        <Route path={routes.signIn.path} element={<SignIn />} />
        <Route element={<PrivateRoute />}>
          <Route path="*" element={<Navigate to={routes.signIn.path} />} />
          <Route path={routes.home.path} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
