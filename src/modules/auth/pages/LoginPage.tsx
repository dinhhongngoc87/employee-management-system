import React, { useCallback, useEffect, useState, useRef } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import className from 'classnames/bind';
import { message, notification } from 'antd';
import { Action } from 'redux';
import Cookies from 'js-cookie';
import { ThunkDispatch } from 'redux-thunk';
import { replace } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import emailjs from '@emailjs/browser';

import { ILoginParams, IValidationEmail } from '../../../models/auth';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setAuthorization } from '../redux/authReducer';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import images from '../../../assets/images';
import styles from './LoginPage.module.scss';
import apiClient from '../../../configs/axios';
import ForgotPasswordForm from '../components/FogotPasswordForm/FogotPasswordForm';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const cx = className.bind(styles);
const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoginForm, setForm] = useState(true);

  const openNotification = (message: string, type: NotificationType, description?: string) => {
    api[type]({
      message: `${message}`,
      description: description ? `${description}` : ``,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };
  const changeForm = () => {
    setForm(!isLoginForm);
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

  const sendEmail = async (receiver: string, company_id: number, token: string) => {
    console.log(receiver, company_id, token);

    const form = document.createElement('form');
    const receiverInput = document.createElement('input');
    receiverInput.setAttribute('type', 'hidden');
    receiverInput.setAttribute('name', 'receiver');
    receiverInput.setAttribute('value', receiver);

    // form.append('sender', 'ngoc.dinhthihong@powergatesoftware.co');
    form.appendChild(receiverInput);
    // form.append('subject', 'Reset Password Notification');
    // form.append(
    //   'content',
    //   `Hello click the following link to change your password:
    // http://web-training.hrm.div4.pgtest.co/reset-password?token=${token}&email=${receiver}&company_id=${company_id}
    // `,
    // );

    emailjs
      .sendForm('service_vzvnni5', 'template_gzdscsk', form, '3JqcOZ-YD3pBuxMeh')
      .then((response) => {
        console.log(`Email sent to ${receiver}:`, response);
      })
      .catch((error) => {
        console.error(`Error sending email to ${receiver}:`, error);
      });
  };

  const sendOTP = useCallback(async (values: IValidationEmail) => {
    apiClient
      .post('/forgot-password', values)
      .then(async (response) => {
        console.log(response);
        if (response.status === RESPONSE_STATUS_SUCCESS) {
          const token = uuidv4();
          await sendEmail(values.email, 1, token);
        }
      })
      .catch((error) => {
        console.log(error.response);
        openNotification(`${error.response.data.message}`, 'error');
      });
  }, []);

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
        {isLoginForm ? (
          <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} changeForm={changeForm} />
        ) : (
          <ForgotPasswordForm sendOTP={sendOTP} changeForm={changeForm} />
        )}
      </div>
    </>
  );
};

export default LoginPage;
