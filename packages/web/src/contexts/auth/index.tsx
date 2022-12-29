import { AxiosError } from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { axiosApi } from "../../utils/axios";
import { doLogin, verifyToken } from "./api";
import { reducer } from "./reducer";
import { AuthContextValue, AuthState, LoginDTO } from "./types";

const initialAuthState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  token: null,
  error: null,
};

const AuthContext = createContext<AuthContextValue>({
  ...initialAuthState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const useAuth = (): AuthContextValue => useContext(AuthContext);

const setSession = (apiAccessToken: string) => {
  if (apiAccessToken) {
    localStorage.setItem("apiAccessToken", apiAccessToken);

    axiosApi.defaults.headers.common.authorization = `Bearer ${apiAccessToken}`;
  } else {
    localStorage.removeItem("apiAccessToken");
    delete axiosApi.defaults.headers.common.authorization;
  }
};

export function AuthProvider(props: any) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        const apiAccessToken = window.localStorage.getItem("apiAccessToken");
        const apiAuthData = await verifyToken(apiAccessToken);

        if (apiAccessToken && apiAuthData) {
          setSession(apiAccessToken);

          const { user } = apiAuthData;

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
              token: apiAccessToken,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
              token: null,
            },
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
            token: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (loginDTO: LoginDTO): Promise<void> => {
    try {
      const serverResponse = await doLogin(loginDTO);
      setSession(serverResponse.access_token);

      dispatch({
        type: "LOGIN",
        payload: {
          user: serverResponse.user,
          token: serverResponse.access_token,
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
    setSession(null);
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
      {children}
    </AuthContext.Provider>
  );
}
