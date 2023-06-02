import React, { useCallback, useEffect, useState } from 'react';
import className from 'classnames/bind';
import { notification } from 'antd';
import styles from './ChangePasswordPage.module.scss';
import images from '../../../../assets/images';
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm';
import { IChangePassword } from '../../../../models/auth';

const cx = className.bind(styles);
const ChangePasswordPage = () => {
  const onConfirm = useCallback(() => {
    async (values: IChangePassword) => {};
  }, []);
  return (
    <>
      <div className={cx('container')}>
        <div className={cx('headerWithLogo')}>
          <img src={images.logo.default} alt="" />
          <h2>HR Management System</h2>
        </div>
        <ChangePasswordForm onConfirm={onConfirm} />
      </div>
    </>
  );
};

export default ChangePasswordPage;
