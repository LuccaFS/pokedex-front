import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store"
import { User } from "src/app/interfaces/user.model";
import { getUserSuccess, loginFailure, loginSuccess, logOut } from "./auth.actions";

export interface State{
  token: string | null,
  user: User | null
  errorMessage?: string;
}

export const initialState: State = {
  token: null,
  user: null
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
      user: null,
      errorMessage: error.responseMessage
    }
  }),
  on(logOut, () => {
    console.log("Logout")
    return initialState;
  }),
  on(getUserSuccess, (state, {user}) => {
    return {
      ...state,
      user: user
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
  (state: State) => state.user
);

export const selectName = createSelector(
  selectAuthState,
  (state: State) => state.user?.dsName
);

export const selectRank = createSelector(
  selectAuthState,
  (state: State) => state.user?.dsRank
);

export const selectId = createSelector(
  selectAuthState,
  (state: State) => state.user?.id
);

