import React from 'react';
import './App.css';
import { Routes } from './Routes';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from './utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { fetchThunk } from './modules/common/redux/thunk';
import { API_PATHS } from './configs/api';
import { RESPONSE_STATUS_SUCCESS } from './utils/httpResponseCode';
import { setUserInfo } from './modules/auth/redux/authReducer';
import { IUser } from './models/user';

function App() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { user } = useSelector((state: AppState) => ({
    user: state.profile.user,
  }));

  const getProfile = React.useCallback(async () => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
    if (accessToken && !user) {
      await dispatch(fetchThunk(API_PATHS.userProfile)).then((response) => {
        console.log('APP: ', response);
        if (response.status === RESPONSE_STATUS_SUCCESS) {
          const userInfo: IUser = {
            id: response.data.data.id,
            email: response.data.data.email,
            token: accessToken,
            createdAt: response.data.data.created_at,
            updatedAt: response.data.data.updated_at,
          };
          dispatch(setUserInfo(userInfo));
        }
      });
    }
  }, [dispatch, user]);

  React.useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
