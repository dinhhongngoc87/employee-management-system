import React from 'react';
import className from 'classnames/bind';
import styles from './Button.module.scss';
interface Props {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?(): void | any;
  name: string;
}
const cx = className.bind(styles);
function Button(props: Props) {
  const { className, type, onClick, name } = props;

  return (
    <>
      <button type={type} className={cx(className, 'custom-btn')} onClick={onClick}>
        {name}
      </button>
    </>
  );
}

export default Button;
