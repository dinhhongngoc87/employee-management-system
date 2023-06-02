import { FastField, Formik, Form } from 'formik';
import React from 'react';
import className from 'classnames/bind';
import styles from './FogotPasswordForm.module.scss';
import * as Yup from 'yup';
import InputField from '../../../common/components/InputField/InputField';
import Button from '../../../common/components/Button/Button';
import { IValidationEmail } from '../../../../models/auth';

interface Props {
  sendOTP(values: IValidationEmail): void;
  changeForm?(): void | any;
}
const cx = className.bind(styles);
function ForgotPasswordForm(props: Props) {
  const { sendOTP, changeForm } = props;
  const validationForm = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email'),
  });
  const onsubmit = async (values: IValidationEmail) => {
    sendOTP(values);
  };

  return (
    <>
      <h2>Forgot password</h2>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validationForm}
        onSubmit={onsubmit}
      >
        <Form>
          <div className={cx('form-group')}>
            <label htmlFor="email">Your work email</label>
            <FastField name="email" component={InputField} />
          </div>
          <Button type="submit" className={cx('forgot-password-btn')} name=" Confirm & Send OTP"></Button>
          <a href="/">
            <button className={cx('back-to-signin')} onClick={changeForm}>
              Back To Sign In
            </button>
          </a>
        </Form>
      </Formik>
    </>
  );
}

export default ForgotPasswordForm;
