import React, { useCallback, useContext, useState } from "react";
import { ApiService } from "../service/api/api";
import { routes } from "../routes/Router";

interface IAuthProviderProps {
  children: React.ReactNode;
}

interface ILoginProps {
  username: string;
  password: string;
}

interface IAuthContextProps {
  login: (payload: ILoginProps) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
}

const AuthContext = React.createContext<IAuthContextProps | null>(null);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const { security } = new ApiService();
  const [token, setToken] = useState(security.getToken())

  const logout = useCallback(async () => {
    window.location.href = routes.signIn.path;
    security.clearToken();
  }, [security]);

  const login = useCallback(
    async ({ username, password }: ILoginProps) => {
      const { data } = await security.signIn(username, password);
      security.setToken(data.access_token);
      setToken(data.access_token)
    },
    [security]
  );

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return ctx;
};
