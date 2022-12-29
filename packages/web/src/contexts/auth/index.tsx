import { AxiosError } from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { doLogin } from "./api";
import { reducer } from "./reducer";
import { AuthContextValue, AuthState, LoginDTO } from "./types";

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  token: null,
  error: null,
};

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const useAuth = (): AuthContextValue => useContext(AuthContext);

export function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
            token: null,
          },
        });
      } catch (error) {}
    };

    initialize();
  }, []);

  const login = async (loginDTO: LoginDTO): Promise<void> => {
    try {
      const serverResponse = await doLogin(loginDTO);

      dispatch({
        type: "LOGIN",
        payload: {
          user: serverResponse.data.user,
          token: serverResponse.data.access_token,
        },
      });
    } catch (error: any) {
      const parsedError = error as AxiosError;
      if (parsedError.response) {
        if (parsedError.response.status === 401) {
          throw new Error("Credenciais inválidas");
        } else {
          throw new Error(
            "Algum problema aconteceu com o servidor. Tente mais tarde"
          );
        }
      } else if (parsedError.request) {
        throw new Error("Não foi possível se conectar ao servidor");
      }
    }
  };

  const logout = async (): Promise<void> => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
