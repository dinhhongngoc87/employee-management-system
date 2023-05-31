import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { ErrorMessage, FieldProps } from 'formik';

import styles from './InputField.module.scss';
import ErrMessage from '../ErrorMessage/ErrMessage';
import { Eye, EyeSlash } from '../Icons';
interface Props extends FieldProps {
  type?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  isShowPassWord?: boolean;
}
const cx = className.bind(styles);
const InputField = (props: Props) => {
  const { field, form, type = 'text', label, placeholder, disabled = false } = props;
  const { name, onBlur, onChange, value } = field;
  const { errors, touched } = form;
  const showError = touched[name] && errors[name];
  const [isShowPassWord, setShowPassWord] = useState(false);

  const handleShowHidePassword = () => {
    setShowPassWord(!isShowPassWord);
  };

  const setTypeInput = (): string => {
    if (type === 'password' && isShowPassWord === true) {
      return 'text';
    } else if (type === 'password' && isShowPassWord === false) {
      return 'password';
    } else {
      return 'text';
    }
  };

  return (
    <>
      <span className={cx('input-field')}>
        <input
          id={name}
          name={name}
          type={setTypeInput()}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
        />
        {showError && <div className="error">{errors[name]}</div>}
        {type === 'password' ? (
          <span onClick={handleShowHidePassword} className={cx('eye-icon')}>
            {isShowPassWord ? (
              <Eye width="1.2rem" height="1.2rem" fill="#000" />
            ) : (
              <EyeSlash width="1.2rem" height="1.2rem" fill="#000" />
            )}
          </span>
        ) : null}
      </span>
    </>
  );
};

export default InputField;
