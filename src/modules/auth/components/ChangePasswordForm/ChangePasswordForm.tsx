import React, { useState } from 'react';
import * as Yup from 'yup';
import { FastField, Form, Formik } from 'formik';
import className from 'classnames/bind';
import Button from '../../../common/components/Button/Button';

import { IChangePassword } from '../../../../models/auth';
import styles from './ChangePasswordForm.module.scss';
import InputField from '../../../common/components/InputField/InputField';
interface Props {
  onConfirm(values: IChangePassword): void;
}

const cx = className.bind(styles);
const ChangePasswordForm = (props: Props) => {
  const { onConfirm } = props;
  const [isShowPassWord, setShowPassWord] = useState(false);
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('Please enter password')
      .min(8, 'Password must be at least 8 characters')
      .max(16, 'Password must not exceed 16 characters'),
    confirmPassword: Yup.string()
      .required('Please confirm password')
      .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
  });

  const onConfirmClick = async (values: IChangePassword) => {
    // onConfirm(values);
  };

  return (
    <>
      <h2>Change Password</h2>
      <Formik
        initialValues={{
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onConfirmClick}
      >
        <Form>
          <div className={cx('form-group')}>
            <label htmlFor="newPassword">New Password</label>
            <FastField name="newPassword" component={InputField} />
          </div>
          <div className={cx('form-group')}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <FastField name="confirmPassword" type="password" isShowPassWord={isShowPassWord} component={InputField} />
          </div>
          <Button className={cx('confirm-btn')} type="submit" name="Confirm" />
        </Form>
      </Formik>
    </>
  );
};

export default ChangePasswordForm;
