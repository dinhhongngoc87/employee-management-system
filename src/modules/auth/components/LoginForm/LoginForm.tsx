import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Input } from 'antd';
import * as Yup from 'yup';
import { ErrorMessage, FastField, Form, Formik, useFormik } from 'formik';
import className from 'classnames/bind';
import { notification } from 'antd';

import { ILoginParams, ILoginValidation } from '../../../../models/auth';
import { validateLogin, validLogin } from '../../utils';
import styles from './LoginForm.module.scss';
import InputField from '../../../common/components/InputField/InputField';
import SelectField from '../../../common/components/SelectField/SelectField';
import Button from '../../../common/components/Button/Button';
interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
  changeForm(): void;
}
const FACTORY_OPTIONS = [
  {
    name: 'SBM',
    value: 1,
  },
  {
    name: 'DMF',
    value: 2,
  },
];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const cx = className.bind(styles);
const LoginForm = (props: Props) => {
  const { onLogin, loading, errorMessage, changeForm } = props;
  const [isShowPassWord, setShowPassWord] = useState(false);
  const [validate, setValidate] = React.useState<ILoginValidation>();
  const [api, contextHolder] = notification.useNotification();

  // const openNotification = (message: string, type: NotificationType, description?: string) => {
  //   api[type]({
  //     message: `${message}`,
  //     description: description ? `${description}` : ``,
  //     onClick: () => {
  //       console.log('Notification Clicked!');
  //     },
  //   });
  // };
  const handleShowHidePassword = () => {
    setShowPassWord(!isShowPassWord);
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .max(30, 'Username must not exceeed 30 characters')
      .matches(/^[a-zA-Z0-9._]+$/i, 'Invalid username format'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(16, 'Password must not exceed 16 characters'),
    company_id: Yup.number().required('Factory is required'),
  });

  const onSubmit = async (values: ILoginParams) => {
    onLogin(values);
  };

  return (
    <>
      <h2>Sign In</h2>
      <Formik
        initialValues={{
          username: '',
          password: '',
          company_id: 1,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className={cx('form-group')}>
            <label htmlFor="username">Username</label>
            <FastField name="username" component={InputField} />
          </div>

          <div className={cx('form-group')}>
            <label htmlFor="username">Password</label>

            <FastField name="password" type="password" isShowPassWord={isShowPassWord} component={InputField} />
          </div>
          <div className={cx('form-group')}>
            <label htmlFor="factory">Factory</label>
            <FastField name="company_id" component={SelectField} options={FACTORY_OPTIONS} />
          </div>
          <Button type="submit" className={cx('sign-in')} name="Sign In"></Button>
          <a href="/">
            <button className={cx('forgot-password')} onClick={changeForm}>
              Forgot Your Password
            </button>
          </a>
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
