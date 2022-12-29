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
    const serverResponse = await doLogin(loginDTO);

    dispatch({
      type: "LOGIN",
      payload: {
        user: serverResponse.data.user,
        token: serverResponse.data.access_token,
      },
    });
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
