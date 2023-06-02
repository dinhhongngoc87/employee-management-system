import React, { useCallback, useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './ForgotPassword.module.scss';
import images from '../../../../assets/images';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'typesafe-actions';
interface Props {
  changeForm?(): void;
}
const cx = className.bind(styles);
const ForgotPassword = (props: Props) => {
  const { changeForm } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('headerWithLogo')}>
          <img src={images.logo.default} alt="" />
          <h2>HR Management System</h2>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
