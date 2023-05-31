import Cookies from 'js-cookie';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { AuthToken, IUser } from '../../../models/user';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';

export interface AuthState {
  auth?: AuthToken;
  user?: IUser | null;
}

export const setAuthorization = createCustomAction('auth/setAuthorization', (data: AuthToken) => ({
  data,
}));

export const setUserInfo = createCustomAction('auth/setUserInfo', (data: IUser) => ({
  data,
}));

export const logout = createCustomAction('auth/logout');

const actions = { setAuthorization, setUserInfo, logout };

type Action = ActionType<typeof actions>;

export default function reducer(state: AuthState = {}, action: Action) {
  switch (action.type) {
    case getType(setAuthorization):
      return { ...state, auth: action.data };
    case getType(setUserInfo):
      return { ...state, user: action.data };
    case getType(logout):
      Cookies.remove(ACCESS_TOKEN_KEY);
      return { auth: '', user: null };
    default:
      return state;
  }
}
