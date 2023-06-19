import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { User } from 'src/app/interfaces/user.model';
import {
  getUserSuccess,
  loginFailure,
  loginSuccess,
  logOut,
} from './auth.actions';

export interface State {
  token: string | null;
  user: User | null;
  errorMessage?: string;
  isLoaded: boolean;
}

export const initialState: State = {
  token: localStorage.getItem('Token'),
  user: null,
  isLoaded: false,
};

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { loginResponse }) => {
    localStorage.setItem('Token', loginResponse.responseMessage);
    return {
      ...state,
      token: loginResponse.responseMessage,
      isLoaded: true,
    };
  }),
  on(loginFailure, (state, { error }) => {
    return {
      ...state,
      token: null,
      user: null,
      errorMessage: error.responseMessage,
    };
  }),
  on(logOut, () => {
    console.log('Logout');
    return initialState;
  }),
  on(getUserSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      isLoaded: true,
    };
  })
);

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action);
}

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectToken = createSelector(
  selectAuthState,
  (state: State) => state.token
);

export const selectUser = createSelector(
  selectAuthState,
  (state: State) => state.user
);

export const loaded = createSelector(
  selectAuthState,
  (state: State) => state.isLoaded
);
