import { AxiosInstance } from "axios";

export class SecurityService {
  constructor(private api: AxiosInstance) {}

  public signIn(username: string, password: string) {
    return this.api.post<{ access_token: string; refresh_token: string }>(
      "/security/login",
      { username, password, provider: "db", refresh: true }
    );
  }

  public validateToken(refresh_token: string) {
    return this.api.post<{ access_token: string }>("/security/refresh", {
      refresh_token: refresh_token,
    });
  }

  public getToken(): string | null {
    return localStorage.getItem("authToken");
  }

  public setToken(token: string): void {
    localStorage.setItem("authToken", token);
  }

  public clearToken(): void {
    localStorage.removeItem("authToken");
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem("refreshToken", token);
  }

  public clearRefreshToken(): void {
    localStorage.removeItem("refreshToken");
  }
}
