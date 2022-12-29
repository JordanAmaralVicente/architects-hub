import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { appConfig } from "../config";
import { User } from "../types/user";

interface LoginDTO {
  email: string;
  password: string;
}

interface AuthState {
  status: "idle" | "pending" | "resolved" | "rejected";
  user: User | null;
  token: string | null;
  error: unknown;
}

const initialState: AuthState = {
  status: "idle",
  user: null,
  token: null,
  error: null,
};

const AuthStateContext = createContext(initialState);
const AuthDispatchContext = createContext({});

function reducer(currentState: AuthState, newState: AuthState): AuthState {
  return { ...currentState, ...newState };
}

function useAuthState() {
  const context = useContext(AuthStateContext);
  if (!context) throw new Error("useAuthState must be used in AuthProvider");

  return context;
}

function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (!context) throw new Error("useAuthDispatch must be used in AuthProvider");

  return context;
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {props.children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export async function login(loginData: LoginDTO) {
  return axios.post<{ access_token: string; user: User }>(
    `${appConfig.api.url}/auth/login`,
    loginData
  );
}

async function doLogin(dispatch: any, user: LoginDTO) {
  try {
    dispatch({ status: "pending" });

    const result = await login(user);

    console.log(result.data.access_token);

    dispatch({
      status: "resolved",
      token: result.data.access_token,
      error: null,
    });
  } catch (error) {
    dispatch({ status: "rejected", error });
  }
}

function doLogout(dispatch: any) {
  dispatch(initialState);
}

export { AuthProvider, useAuthState, useAuthDispatch, doLogin, doLogout };
