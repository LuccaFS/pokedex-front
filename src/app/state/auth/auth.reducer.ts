import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store"
import { getUserNameSuccess, getUserRoleSuccess, loginFailure, loginSuccess, logOut } from "./auth.actions";

export interface State{
  token: string | null,
  userName: string | null
  userRank: string | null
  errorMessage?: string;
}

export const initialState: State = {
  token: null,
  userName: null,
  userRank: null
}

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, {loginResponse}) => {
    return {
      ...state,
    token: loginResponse.responseMessage,
    }
  }),
  on(loginFailure, (state, {error}) => {
    return {
      ...state,
      token: null,
      userName: null,
      errorMessage: error.responseMessage
    }
  }),
  on(logOut, () => {
    return initialState;
  }),
  on(getUserNameSuccess, (state, {user}) => {
    return {
      ...state,
      userName: user
    }
  }),
  on(getUserRoleSuccess, (state, {user}) => {
    return {
      ...state,
      userRank: user
    }
  })
);

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action);
}

export const selectAuthState =  createFeatureSelector<State>('auth');

export const selectToken = createSelector(
  selectAuthState,
  (state: State) => state.token
);

export const selectUser = createSelector(
  selectAuthState,
  (state: State) => state.userName
);

export const selectRank = createSelector(
  selectAuthState,
  (state: State) => state.userRank
);

