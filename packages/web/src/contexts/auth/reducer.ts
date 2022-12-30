import { Action, AuthState, InitializeAction, LoginAction } from "./types";

// TODO: type action funtion
const handlers: Record<string, any> = {
  INITIALIZE: (state: AuthState, action: InitializeAction): AuthState => {
    const { isAuthenticated, user, token } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      token,
    };
  },

  LOGIN: (state: AuthState, action: LoginAction): AuthState => {
    const { user, token } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      token,
    };
  },

  LOGOUT: (state: AuthState): AuthState => ({
    ...state,
    isAuthenticated: false,
    user: null,
    token: null,
  }),
};

export const reducer = (state: AuthState, action: Action): AuthState =>
  handlers[action.type] ? handlers[action.type](state, action) : state;
