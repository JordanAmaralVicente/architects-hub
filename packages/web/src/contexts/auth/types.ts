import { User } from "../../types/user";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
  token: string | null;
  error: unknown;
}

export interface AuthContextValue extends AuthState {
  login: (user: LoginDTO) => Promise<void>;
  logout: () => void;
}

export interface InitializeAction {
  type: "INITIALIZE";
  payload: {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
  };
}

export interface LoginAction {
  type: "LOGIN";
  payload: {
    user: User;
    token: string;
  };
}

export interface LogoutAction {
  type: "LOGOUT";
}

export type Action = InitializeAction | LoginAction | LogoutAction;
