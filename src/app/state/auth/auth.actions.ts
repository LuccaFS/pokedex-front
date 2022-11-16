import { createAction, props } from '@ngrx/store';
import { ResponseModel } from 'src/app/interfaces/response.model';
import { Login } from 'src/app/interfaces/user.model';
import { NewUser } from './../../interfaces/user.model';


//LOGIN
export const loginRequest = createAction(
  '[ResponseModel] Login Request',
  props<{ login: Login }>()
);

export const loginSuccess = createAction(
  '[ResponseModel] Login Success',
  props<{ loginResponse: ResponseModel }>()
);

export const loginFailure = createAction(
  '[ResponseModel] Login Failure',
  props<{ error: ResponseModel }>()
);

export const logOut = createAction(
  '[void] Logout User'
)


//REGISTER NEW USER
export const register = createAction(
  '[NewUser] Create User',
  props<{ newUser: NewUser }>()
)

export const registerSuccess = createAction(
  '[ResponseModel] Register Success',
  props<{ registerResponse: ResponseModel }>()
);

export const registerFailure = createAction(
  '[ResponseModel] Register Failure',
  props<{ error: ResponseModel }>()
);


//GET USER
export const getUserName = createAction(
  '[string] Get User Name'
);

export const getUserNameSuccess = createAction(
  '[string] Get User Name Success',
  props<{user: string}>()
);

export const getUserRole = createAction(
  '[string] Get User Role'
);

export const getUserRoleSuccess = createAction(
  '[string] Get User Role Success',
  props<{user: string}>()
);


