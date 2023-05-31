import React, { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import className from 'classnames/bind';
import { notification } from 'antd';
import axios from 'axios';
import { Action } from 'redux';
import Cookies from 'js-cookie';
import { ThunkDispatch } from 'redux-thunk';
import { replace } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import { ILoginParams } from '../../../models/auth';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setAuthorization, setUserInfo } from '../redux/authReducer';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { getErrorMessageResponse } from '../../../utils';
import images from '../../../assets/images';
import styles from './LoginPage.module.scss';
import apiClient from '../../../configs/axios';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const cx = className.bind(styles);
const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const openNotification = (message: string, type: NotificationType, description?: string) => {
    api[type]({
      message: `${message}`,
      description: description ? `${description}` : ``,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };
  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      setLoading(true);
      await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', {
          username: values.username,
          password: values.password,
          company_id: values.company_id,
        }),
      )
        .then((response) => {
          if (response.status === RESPONSE_STATUS_SUCCESS) {
            dispatch(setAuthorization(response.data.data.token));
            Cookies.set(ACCESS_TOKEN_KEY, response.data.data.token, { expires: 7 });
            dispatch(replace(ROUTES.home));
          }
        })
        .catch((error) => {
          openNotification(`${error.response.data.message}`, 'error');
        });

      setLoading(false);
    },
    [dispatch],
  );
  const testAPI = () => {
    const config = {
      headers: { Authorization: '2908|5TS5ldzglvpNXCqWmRoX4KxL156upSbE6a1gcJ6i' },
      cache: 'no-store',
    };
    axios.get('https://api-training.hrm.div4.pgtest.co/api', config);
  };

  useEffect(() => {
    return () => {
      // Cancel the fetch request when the component unmounts
    };
  });
  return (
    <>
      {contextHolder}
      <div className={cx('container')}>
        <div className={cx('headerWithLogo')}>
          <img src={images.logo.default} alt="" />
          <h2>HR Management System</h2>
        </div>
        <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
      </div>
    </>
  );
};

export default LoginPage;
